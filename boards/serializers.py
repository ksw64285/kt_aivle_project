from .models import blog
from rest_framework import serializers

class BlogSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.email')
    file = serializers.ImageField(required=False, allow_empty_file=True)
    class Meta:
        model = blog
        fields = ['id', 'title', 'created_at', 'user', 'file', 'body', 'answer', 'answered_at', 'type']