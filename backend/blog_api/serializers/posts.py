from rest_framework import serializers
from ..models import Post, Category
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model in posts.
    """
    display_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_author', 'display_name')
    
    def get_display_name(self, obj):
        """Return formatted name or username"""
        if obj.first_name and obj.last_name:
            return f"{obj.first_name} {obj.last_name}"
        elif obj.first_name:
            return obj.first_name
        else:
            # Convert username to title case (sarah_chen -> Sarah Chen)
            return obj.username.replace('_', ' ').title()



class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model.
    """
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'created_at')
        read_only_fields = ('id', 'slug', 'created_at')


class PostListSerializer(serializers.ModelSerializer):
    """
    Serializer for listing posts (minimal data).
    """
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'excerpt', 'author', 'category', 'image', 'status', 'created_at', 'updated_at')
        read_only_fields = ('id', 'slug', 'created_at', 'updated_at')


class PostDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for post detail (full data).
    """
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    comments_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'content', 'excerpt', 'author', 'category', 'image', 'status', 'created_at', 'updated_at', 'comments_count')
        read_only_fields = ('id', 'slug', 'author', 'created_at', 'updated_at', 'comments_count')
    
    def get_comments_count(self, obj):
        return obj.comments.count()


class PostCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating/updating posts.
    """
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )
    
    class Meta:
        model = Post
        fields = ('title', 'content', 'excerpt', 'category_id', 'image', 'status')
    
    def validate_title(self, value):
        # Check for duplicate titles (excluding current instance on update)
        instance = self.instance
        if instance:
            if Post.objects.exclude(pk=instance.pk).filter(title=value).exists():
                raise serializers.ValidationError("A post with this title already exists.")
        else:
            if Post.objects.filter(title=value).exists():
                raise serializers.ValidationError("A post with this title already exists.")
        return value
