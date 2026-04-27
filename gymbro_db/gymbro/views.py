from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import users
from .serializers import RegisterSerializer, LoginSerializer, UserDTOSerializer


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = users.objects.create(
                username=serializer.validated_data['nickname'],
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password']
            )

            tokens = get_tokens_for_user(user)
            user_dto = UserDTOSerializer(user)

            return Response({
                "message": "Registration finished successfully",
                "user": user_dto.data,
                "tokens": tokens
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data
            tokens = get_tokens_for_user(user)
            user_dto = UserDTOSerializer(user)

            return Response({
                "message": "Logged in successfully",
                "user": user_dto.data,
                "tokens": tokens
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
