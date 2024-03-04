
from rest_framework import serializers
from .models import Tweet, TweetLike
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

# User Registration Serializer
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# Tweet Action Serializer
class TweetActionSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=['like', 'unlike', 'retweet'])
    content = serializers.CharField(allow_blank=True, required=False)
    
    def validate_action(self, value:str):
        value = value.lower()
        if value not in ['like', 'unlike', 'retweet']:
            raise serializers.ValidationError("Action must be either 'like', 'unlike', or 'retweet'.")
        return value

# Tweet Serializer Parent
class TweetserializerPArent(serializers.ModelSerializer):
    class Meta:
        model = Tweet    
        fields= ['id', 'content', 'date', 'parent', 'is_retweet']

# Tweet Serializer
class Tweetserializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    parent = TweetserializerPArent(read_only=True)
    like_status = serializers.SerializerMethodField()

    class Meta:
        model = Tweet    
        fields= ['id', 'content', 'likes_count', 'date', 'parent', 'is_retweet', 'like_status']
    
    def get_likes_count(self, obj):
        return obj.likes.count() 
    def get_like_status(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return obj.likes.filter(id=user.id).exists()
        return False

class createTweetSerializer(serializers.ModelSerializer):
    content = serializers.CharField(max_length=255)
    class Meta:
        model = Tweet    
        fields= ['content']
