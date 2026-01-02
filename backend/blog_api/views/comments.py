from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models import Comment, Post
from ..serializers.comments import CommentSerializer, CommentCreateSerializer
from ..permissions import IsOwnerOrReadOnly


class CommentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Comment model.
    Nested under posts: /api/v1/posts/{post_slug}/comments/
    """
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        post_slug = self.kwargs.get('post_slug')
        if post_slug:
            return Comment.objects.filter(post__slug=post_slug).select_related('author', 'post')
        return Comment.objects.select_related('author', 'post').all()
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CommentCreateSerializer
        return CommentSerializer
    
    def create(self, request, *args, **kwargs):
        post_slug = self.kwargs.get('post_slug')
        post = get_object_or_404(Post, slug=post_slug, status='published')
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        comment = serializer.save(author=request.user, post=post)
        
        # Return full comment data
        response_serializer = CommentSerializer(comment)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
