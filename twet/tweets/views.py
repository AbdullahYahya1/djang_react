from django.shortcuts import redirect, render , HttpResponse , Http404
from django.http import HttpResponseRedirect, JsonResponse
from .models import Tweet, TweetLike
from .serializers import TweetActionSerializer, Tweetserializer
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


class tweetCreateView(generics.ListCreateAPIView):
    permission_classes = [IsOwnerOrReadOnly, IsAuthenticated]
    queryset = Tweet.objects.all()
    serializer_class = Tweetserializer
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


















class LikeTweetView(generics.UpdateAPIView):
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
