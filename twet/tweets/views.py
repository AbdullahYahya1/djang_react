from django.shortcuts import redirect, render , HttpResponse , Http404
from django.http import HttpResponseRedirect, JsonResponse
from .models import Tweet, TweetLike
from .serializers import TweetActionSerializer, Tweetserializer , createTweetSerializer
from rest_framework import generics 
from rest_framework.response import Response
import json
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse, Http404
from .forms import TweetForm
from .permissions import IsOwnerOrReadOnly
from rest_framework import status 
# Create your views here.
def home(request ,*args, **kwargs):
    form = TweetForm()
    return render(request , 'pages/home.html', context={'form':form} , status=200) 


class tweetCreateView(generics.CreateAPIView):
    permission_classes = [IsOwnerOrReadOnly, IsAuthenticated]
    queryset = Tweet.objects.all()
    serializer_class = Tweetserializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
        
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 10  # Set the number of objects per page
    page_size_query_param = 'page_size'
    max_page_size = 1000


class tweetList(generics.ListAPIView):
    # permission_classes = [IsOwnerOrReadOnly, IsAuthenticated]
    queryset = Tweet.objects.all()
    serializer_class = Tweetserializer
    pagination_class = CustomPagination
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class QuestionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = Tweetserializer
    lookup_url_kwarg = 'pk'
    permission_classes = [IsOwnerOrReadOnly, IsAuthenticated]
    queryset = Tweet.objects.all()
    def perform_update(self, serializer):
        serializer.save()

# def tweet_like_view(request,pk , *args , **kwargs):
    # tweet = Tweet.objects.get(pk=pk) 
    

def tweet_detail_view(request, pk, *args, **kwargs):
    try:
        tweet = Tweet.objects.get(pk=pk)
        data = {
            "id": tweet.id,
            "content": tweet.content,
            "image": tweet.imge.url if tweet.imge else None,
            "date": tweet.date
        }
        return JsonResponse(data)
    except Tweet.DoesNotExist:
        raise Http404


















class actionTweetView(generics.UpdateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetActionSerializer
    permission_classes = [IsAuthenticated]
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        action = serializer.validated_data.get('action')
        
        user = request.user
        if action == 'like':
            instance.likes.add(user)
            return Response({'message': 'Tweet liked'}, status=status.HTTP_201_CREATED)
        elif action == 'unlike':
            instance.likes.remove(user)
            return Response({'message': 'Tweet unliked'}, status=status.HTTP_200_OK)
        elif action == 'retweet':
            content = serializer.validated_data.get('content')
            new_tweet = Tweet.objects.create(user=user, parent=instance, content=content)
            tweet_serializer = Tweetserializer(new_tweet)  # Use appropriate serializer
            return Response({'message': 'Tweet has been retweeted', 'tweet': tweet_serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
  
             
             
             
             
             
             
             
             
             
             
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import UserSerializer

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                return Response({'token': token.key})
        return Response(serializer.errors, status=400)
 
 

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from django.contrib.auth import authenticate

class UserLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        if username is None or password is None:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user_id': user.pk, 'username': user.username})














from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer

class UserRegistrationAPIView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Optionally generate JWT token here
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
