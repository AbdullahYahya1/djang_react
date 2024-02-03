from django.contrib import admin
from .models import * 
# Register your models here.
class TweetLikeClass(admin.TabularInline):
    model = TweetLike
class TweetAdmin(admin.ModelAdmin):
    inlines = [TweetLikeClass]
    list_display = ["__str__", 'user']
    search_fields = ['user__username', 'user__email' , 'content']
    class Meta:
        model = Tweet

admin.site.register(Tweet , TweetAdmin )
admin.site.register(TweetLike)