from rest_framework import serializers
from ..models import Comment
from .auth import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for Comment model.
    """
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = ('id', 'content', 'author', 'post', 'created_at')
        read_only_fields = ('id', 'author', 'post', 'created_at')


class CommentCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating comments.
    """
    class Meta:
        model = Comment
        fields = ('content',)
