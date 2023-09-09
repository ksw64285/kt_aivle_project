from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager

GENDER_CHOICES = (
    (0, 'Female'),
    (1, 'Male'),
    (2, 'Not to disclose')
)

class User(AbstractUser):
    
    
    email = models.EmailField(_('email address'), unique=True)
    name = models.CharField( max_length=30, unique=False)
    updated_at = models.DateTimeField(auto_now=True)
    gender = models.SmallIntegerField(null=True, blank=True, choices = GENDER_CHOICES)
    date_of_birth = models.DateField(null=True, blank=True, max_length=8)
    belong = models.CharField(null=True, blank=True, max_length=10)
    grade = models.CharField(null=True, blank=True, max_length=20)
    
    ##user model에서 각 row를 식별해줄 key를 설정
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    
    #파이썬에서 어떤값(또는 객체)을 문자열로 변환하는데 사용하는 str()
    #내장 함수가 아닌 파이썬 내장 클래스
    def __str__(self):
        return self.email
    
    
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.TextField()