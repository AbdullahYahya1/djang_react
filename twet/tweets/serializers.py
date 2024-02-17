from rest_framework import serializers


from .models import Tweet , TweetLike


class TweetActionSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=['like', 'unlike', 'retweet'])
    content = serializers.CharField(allow_blank=True , required=False)
    
    def validate_action(self, value:str):
        value=value.lower()
        if value not in ['like', 'unlike','retweet']:
            raise serializers.ValidationError("Action must be either 'like' or 'unlike'.")
        return value


class TweetserializerPArent(serializers.ModelSerializer):
    class Meta:
        model = Tweet    
        fields= ['id','content' ,'date','parent', 'is_retweet']



class Tweetserializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    parent = TweetserializerPArent(read_only=True)
    # content = serializers.SerializerMethodField()
    class Meta:
        model = Tweet    
        fields= ['id','content' , 'likes_count' , 'date','parent', 'is_retweet']
    def get_likes_count(self, obj):
        return obj.likes.count() 
    # def get_content(self, obj):
    #     content = obj.content
    #     if obj.is_retweet:
    #         content = obj.parent.content
    #     return content
    

class createTweetSerializer(serializers.ModelSerializer):
    content = serializers.CharField(max_length=255)
    class Meta:
        model = Tweet    
        fields= ['content' ]
        
        




from rest_framework import serializers
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






from rest_framework import serializers
from django.contrib.auth.models import User

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