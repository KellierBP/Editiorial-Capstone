from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.db import models
from ..models import Post
from ..serializers.posts import PostListSerializer, PostDetailSerializer, PostCreateUpdateSerializer
from ..permissions import IsAuthor, IsOwnerOrReadOnly


class PostViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Post model.
    Provides CRUD operations, filtering, and search.
    """
    queryset = Post.objects.select_related('author', 'category').all()
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthor, IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'category__slug', 'author__username']
    search_fields = ['title', 'content', 'excerpt']
    ordering_fields = ['created_at', 'updated_at', 'title']
    ordering = ['-created_at']
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PostListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return PostCreateUpdateSerializer
        return PostDetailSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Non-authenticated users and non-authors only see published posts
        if not self.request.user.is_authenticated or not self.request.user.is_author:
            queryset = queryset.filter(status='published')
        # Authors see their own posts (all statuses) + published posts from others
        elif self.request.user.is_author:
            queryset = queryset.filter(
                models.Q(author=self.request.user) | models.Q(status='published')
            )
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    @action(detail=False, methods=['get'], url_path='category/(?P<category_slug>[^/.]+)')
    def by_category(self, request, category_slug=None):
        """
        Get posts by category slug.
        GET /api/v1/posts/category/{slug}/
        """
        posts = self.get_queryset().filter(category__slug=category_slug, status='published')
        page = self.paginate_queryset(posts)
        if page is not None:
            serializer = PostListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = PostListSerializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='author/(?P<username>[^/.]+)')
    def by_author(self, request, username=None):
        """
        Get posts by author username.
        GET /api/v1/posts/author/{username}/
        """
        posts = self.get_queryset().filter(author__username=username, status='published')
        page = self.paginate_queryset(posts)
        if page is not None:
            serializer = PostListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = PostListSerializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='my-posts')
    def my_posts(self, request):
        """
        Get current user's own posts (all statuses).
        GET /api/v1/posts/my-posts/
        """
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)
        
        posts = Post.objects.filter(author=request.user).select_related('author', 'category').order_by('-created_at')
        page = self.paginate_queryset(posts)
        if page is not None:
            serializer = PostListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = PostListSerializer(posts, many=True)
        return Response(serializer.data)
