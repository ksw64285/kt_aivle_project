from rest_framework import serializers

class ContextSerializer(serializers.Serializer):
    age = serializers.CharField(max_length=10,required=False, allow_blank=True)
    sex = serializers.CharField(max_length=10, required=False, allow_blank=True)
    job = serializers.CharField(max_length=100, required=False, allow_blank=True)
    grade = serializers.CharField(max_length=10, required=False, allow_blank=True)
    situation = serializers.CharField(max_length=100, required=False, allow_blank=True)
    subject = serializers.CharField(max_length=100, required=False, allow_blank=True)
    persona_id = serializers.CharField(max_length=50,required=False, allow_blank=True,allow_null=True)
    personalist = serializers.ListField(child=serializers.DictField(required=False))
    chatlist = serializers.ListField(child=serializers.DictField(required=False))
    
class ChatSerializer(serializers.Serializer):
    answer = serializers.CharField(max_length=2000, required=False, allow_blank=True)
    prediction = serializers.CharField(max_length=50, required=False, allow_blank=True)
    
class PersonaSerializer(serializers.Serializer):
    redirect_url = serializers.CharField(max_length=2000, required=False, allow_blank=True)
    
class getGuideSerializer(serializers.Serializer):
    context = serializers.CharField(max_length=300, required=False, allow_blank=True)
    
class postGuideSerializer(serializers.Serializer):
    response = serializers.CharField(max_length=2000, required=False, allow_blank=True)