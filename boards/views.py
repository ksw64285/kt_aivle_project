from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import blog
from .serializers import BlogSerializer
from rest_framework import viewsets, status
from .permissions import BlogPermission
from rest_framework.renderers import TemplateHTMLRenderer
from django.http import HttpResponse
from django.core.files.base import ContentFile
from rest_framework.decorators import action
from django.urls import reverse
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import routers
from django.core.paginator import Paginator
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination

#class BlogPagination(PageNumberPagination):
#    page_size = 10  # 한 페이지에 보여줄 개수 설정
#    page_size_query_param = 'per_page'  # 페이지당 개수를 지정하는 쿼리 매개변수
    
class BlogViewSet(viewsets.ModelViewSet):
    serializer_class = BlogSerializer
    permission_classes = [BlogPermission, IsAuthenticated]
    
    #pagination_class = BlogPagination  # 페이지네이션 클래스 지정
    
    def get_queryset(self):
        print(self.request)
        
        if self.request.user.is_superuser:
            return blog.objects.all()
        else:
            return blog.objects.filter(user=self.request.user)
        
  
    def list(self, request, *args, **kwargs):
        # queryset = self.filter_queryset(self.get_queryset())
        queryset = self.get_queryset().order_by('-id')
        #paginator = self.pagination_class()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
        # 페이지에 대한 데이터 가져오기
        page = paginator.paginate_queryset(queryset, request)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response = paginator.get_paginated_response(serializer.data)
            total_pages = paginator.page.paginator.num_pages
            response.data['total_pages'] = paginator.page.paginator.num_pages
            print("total_pages: ", total_pages)
            return response
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = BlogSerializer(instance)
        print(instance.file)
        return Response({'data': serializer.data})
    

    def is_super(self, request):
        is_admin = request.user.is_superuser
        print(request.user.is_superuser)
        return Response({'is_admin': is_admin})
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        #serializer.save(user=self.request.user)
        """users = {"email": 'yth@55.03',
            "username": '홍길동',
            "updated_at": '2023-06-27 08:20:45.143583',
            "gender": 1,
            "date_of_birth": '2023-06-08',
            "belong": '영업',
            "grade": '사원',
            "password": 'pass1211',}"""
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=True, methods=['GET'])
    def edit(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'data': serializer.data})
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    @action(detail=True, methods=['POST'])
    def add_comment(self, request, pk=None):
        blog_instance = self.get_object()
        comment = request.data.get('comment')
        if comment:
            blog_instance.add_comment(comment)
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['GET'])
    def download_file(self, request, pk=None):
        blog = self.get_object()
        file_path = blog.file.path  # 파일 경로 가져오기
        with open(file_path, 'rb') as file:
            response = HttpResponse(file.read(), content_type='application/octet-stream')
            response['Content-Disposition'] = f'attachment; filename="{blog.file.name}"'
            return response