from rest_framework import permissions
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
class BlogPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ['GET', 'PUT']:
            # 게시글 자세히 보기와 수정은 작성자 또는 수퍼유저만 허용
            if obj.user == request.user or request.user.is_superuser:
                return True
            else:
                return Response("NO PERMISSION", status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'DELETE':
            # 게시글 삭제는 작성자만 허용
            return obj.user == request.user
        return Response("NO PERMISSION", status=status.HTTP_403_FORBIDDEN)
