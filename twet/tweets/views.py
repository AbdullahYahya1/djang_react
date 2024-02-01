from django.shortcuts import render , HttpResponse
# Create your views here.
def home(request ,*args, **kwargs):
    print (args , kwargs)
    return HttpResponse("hi") 
def tweet_detaol_view(request ,pk,*args, **kwargs):
    return HttpResponse(pk) 
    