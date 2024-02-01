from django.db import models

# Create your models here.
class Tweet(models.Model):
    content = models.CharField(max_length=255 ,  blank=True , null=True)
    imge = models.FileField( upload_to='images/' , blank=True , null=True)
    date = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.content if self.content else 'no content' 
    