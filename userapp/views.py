from django.shortcuts import render
from rest_framework.response import Response
from dj_rest_auth.views import LoginView
# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
#연습용 view
from .serializers import NoteSerializer
from .models import Note

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)