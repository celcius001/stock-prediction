from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer


# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        AllowAny
    ]  # Allow any user (authenticated or not) to access this view


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = {"status": "Request was permitted"}
        return Response(response)
