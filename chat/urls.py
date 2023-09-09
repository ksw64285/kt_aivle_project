from django.urls import path
from .views import ChatView, GuideView, PersonaView


urlpatterns = [
    path('', ChatView.as_view(), name='chat'),
    path('guide', GuideView.as_view(), name='guide'),
    path('persona', PersonaView.as_view(), name='persona'),
]

