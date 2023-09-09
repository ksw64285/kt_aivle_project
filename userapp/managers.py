from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
from datetime import date

class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    #일반 유저 생성
    def create_user(self, email, password, gender, date_of_birth, name, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        if not gender:
            raise ValueError(_('The gender must be set'))
        if not date_of_birth:
            raise ValueError(_('The date_of_birth must be set'))
        
        #email 형태를 동일하게 만들기 위한 함수
        user = self.model(
            email=self.normalize_email(email),
            name=name,
            gender=gender,
            date_of_birth=date_of_birth,
            **extra_fields)
        
        user.set_password(password)
        user.save()
        return user
    
    #관리자 유저 생성
    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('gender', 2)
        default_date = date(2000,1,1)
        extra_fields.setdefault('date_of_birth', default_date)
        extra_fields.setdefault('name', '')
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        
        return self.create_user( email, password, **extra_fields)
        
         
