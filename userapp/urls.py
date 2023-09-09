from django.urls import include, path
from . import views

appname='userapp'
urlpatterns = [
    path('', include('dj_rest_auth.urls'), name='dj_rest_auth'),
    path('registration/', include('dj_rest_auth.registration.urls'), name='registration'),
    path('notes/', views.getNotes)
]