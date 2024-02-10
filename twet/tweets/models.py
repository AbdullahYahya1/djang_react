from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class TweetLike(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    tweet= models.ForeignKey('Tweet',on_delete=models.CASCADE)
    timeestamp = models.DateTimeField(auto_now_add=True)

class Tweet(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    content = models.CharField(max_length=255 ,  blank=True , null=True)
    imge = models.FileField( upload_to='images/' , blank=True , null=True)
    likes = models.ManyToManyField(User ,related_name='likes',  blank=True , through=TweetLike)
    date = models.DateField(auto_now_add=True)
    parent = models.ForeignKey('self' , null=True , blank=True , on_delete=models.SET_NULL)   
    
    @property
    def is_retweet(self):
        return True if self.parent != None else False
    class Meta:
        ordering =[ '-id']
    
    def __str__(self):
        return self.content if self.content else 'no content' 
    