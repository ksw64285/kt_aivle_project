from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer    
from allauth.account.adapter import get_adapter
from rest_framework import serializers
##연습용 Serializer
from rest_framework.serializers import ModelSerializer
from .models import Note
from datetime import datetime

class CustomRegisterSerializer(RegisterSerializer):
    name = serializers.CharField(max_length=10)
    gender = serializers.IntegerField()
    date_of_birth = serializers.DateField()
    belong = serializers.CharField(max_length=10)
    grade = serializers.CharField(max_length=20)
    
    class Meta:
        model = get_user_model()
        fields = [
            "email",
            "name",
            "gender",
            "date_of_birth",
            "belong",
            "grade",
            "password",
        ]

    def get_cleaned_data(self):
        return {
            "email": self.validated_data.get("email", ""),
            "name": self.validated_data.get("name", ""),
            "gender": self.validated_data.get("gender", ""),
            "date_of_birth": self.validated_data.get("date_of_birth", ""),
            "belong": self.validated_data.get("belong", ""),
            "grade": self.validated_data.get("grade", ""),
            "password1": self.validated_data.get("password1", ""),
            "password2": self.validated_data.get("password2", ""),
        }
    
    def save(self, request):
        tmp_data = request.data.copy()
        tmp_data['date_of_birth'] = datetime.strptime(request.data['date_of_birth'], '%Y-%m-%d')
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.name = self.cleaned_data.get("name")
        user.gender = self.cleaned_data.get("gender")
        user.date_of_birth = self.cleaned_data.get("date_of_birth")
        user.belong = self.cleaned_data.get("belong")
        user.grade = self.cleaned_data.get("grade")
        user.save()
        adapter.save_user(request, user, self)
        return user
    
##연습용 Serializer
class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'