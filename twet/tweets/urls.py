from django.urls import path 
from .views import *
urlpatterns = [
    path('home', home),
    path('<int:pk>', QuestionDetailView.as_view()),
    path('', tweetCreateView.as_view()),
    path('create', tweetCreateView.as_view() , name='create'),
    path('like/<int:pk>', LikeTweetView.as_view() , name='like'),
    
]
