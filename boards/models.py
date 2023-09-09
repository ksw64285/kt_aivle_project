from django.db import models
from django.conf import settings
from userapp.models import User
from django.utils import timezone
from django.core.validators import FileExtensionValidator
import os
    
class blog(models.Model):
    # 1. 게시글의 id 값
    id = models.AutoField(primary_key=True, null=False, blank=False) 
    # 2. 제목
    title = models.CharField(max_length=100)
    # 3. 작성일
    created_at = models.DateTimeField(auto_now_add=True)
    # 4. 작성자
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    # 5. 파일
    file = models.ImageField(null=True, blank=True, upload_to='%Y/%m/%d', validators=[FileExtensionValidator(allowed_extensions=['png', 'jpg', 'jpeg', 'gif'])])
    # 6. 본문
    body = models.TextField()
    # 7. 댓글
    answer = models.TextField(null=True, blank=True)
    # 8. 댓글 작성일
    answered_at = models.DateTimeField(null=True, blank=True)
    # 9. 게시글 유형
    type = models.CharField(max_length=50, null=True, blank=True)
    
    def __str__(self):
        return self.title
    # 문의글이 삭제되면 해당 문의글에 있는 이미지파일 또한 삭제된다.
    def delete(self, *args, **kargs):
        if self.file:
            os.remove(os.path.join(settings.MEDIA_ROOT, self.file.path))
        super(blog, self).delete(*args, **kargs)
    #댓글 달기
    def add_comment(self, comment):
        self.answer = comment
        self.answered_at = timezone.now()
        self.save()
    