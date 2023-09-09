#from django.db import models
from djongo import models
from userapp.models import User

# Create your models here.
class PersonaSession(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    age = models.CharField(max_length=100)
    sex = models.CharField(max_length=100)
    job = models.CharField(max_length=100)
    grade = models.CharField(max_length=100)
    situation = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta: 
        managed = False 
        app_label = "chat" 
        db_table = 'personasession'

class ChatMessage(models.Model):
    _id = models.ObjectIdField(primary_key=True, null=False, blank=False)
    persona = models.ForeignKey(PersonaSession, on_delete=models.CASCADE, db_column='personaid')
    question = models.TextField()
    answer = models.TextField()
    my_datetime_field = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta: 
        managed = False 
        app_label = "chat" 
        db_table = 'messagedb'

