from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import SimpleRouter
from .views.auth import RegisterView, ProfileView, LogoutView
from .views.posts import PostViewSet
from .views.categories import CategoryViewSet
from .views.comments import CommentViewSet

# Create router for viewsets
router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'categories', CategoryViewSet, basename='category')

# Nested router for comments under posts
comments_router = SimpleRouter()
comments_router.register(r'comments', CommentViewSet, basename='post-comment')

urlpatterns = [
    # Authentication endpoints
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
    
    # Nested comments under posts
    path('posts/<slug:post_slug>/', include(comments_router.urls)),
    
    # Include router URLs
    path('', include(router.urls)),
]
