from django.urls import path, include
from .views import BlogViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'blog', BlogViewSet, basename='blog')


urlpatterns =[
    path('', include(router.urls)),
    path('<int:pk>/', BlogViewSet.as_view({'get': 'retrieve'}), name='blog-detail'),
    path('create/', BlogViewSet.as_view({'get': 'create', 'post': 'create'}), name='blog-create'),
    path('delete/<int:pk>/', BlogViewSet.as_view({'delete': 'destroy'}), name='blog-delete'),
    path('<int:pk>/edit/', BlogViewSet.as_view({'get': 'edit'}), name='blog-edit'),
    path('<int:pk>/update/', BlogViewSet.as_view({'post': 'update'}), name='blog-update'),
    path('<int:pk>/add-comment/', BlogViewSet.as_view({'post': 'add_comment'}), name='add-comment'),
    path('is_admin/', BlogViewSet.as_view({'get': 'is_super'}), name='is_admin'),
    path('<int:pk>/download-file/', BlogViewSet.as_view({'get': 'download_file'}, name='download'))
]