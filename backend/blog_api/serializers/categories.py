from rest_framework import serializers
from ..models import Category


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model.
    """
    posts_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'created_at', 'posts_count')
        read_only_fields = ('id', 'slug', 'created_at')
    
    def get_posts_count(self, obj):
        return obj.posts.filter(status='published').count()
