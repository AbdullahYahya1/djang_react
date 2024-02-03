from rest_framework import serializers


from .models import Tweet , TweetLike


class TweetActionSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=['like', 'unlike'])
    def validate_action(self, value:str):
        value=value.lower()
        if value not in ['like', 'unlike']:
            raise serializers.ValidationError("Action must be either 'like' or 'unlike'.")
        return value

class Tweetserializer(serializers.ModelSerializer):
    content =serializers.CharField(max_length=255)
    class Meta:
        model = Tweet    
        fields= ['content' , 'likes']