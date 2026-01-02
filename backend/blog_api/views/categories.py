from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from ..models import Category
from ..serializers.categories import CategorySerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Category model (read-only).
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    pagination_class = None  # Disable pagination for categories
