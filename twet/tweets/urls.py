from django.urls import path 
from .views import *
urlpatterns = [
    path('home/', home),
    path('<int:pk>/', QuestionDetailView.as_view()),
    path('', tweetList.as_view()),
    path('create/', tweetCreateView.as_view() , name='create'),
    path('action/<int:pk>/', actionTweetView.as_view() , name='like'),
    path('myauth', UserCreateView.as_view() , name='auth'),
]
