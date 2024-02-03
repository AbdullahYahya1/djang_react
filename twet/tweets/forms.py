from django import forms

from .models import Tweet

class TweetForm(forms.ModelForm):
    content =forms.CharField(max_length=255)
    class Meta:
        model = Tweet    
        fields= ['content']