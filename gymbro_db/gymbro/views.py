from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAdminUser

from .models import users, workout_exercises, workouts, exercises, workout_history
from .serializers import RegisterSerializer, LoginSerializer, UserDTOSerializer, WorkoutExerciseSerializer, WorkoutSerializer
from .serializers import ExerciseSerializer, WorkoutHistorySerializer

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


class WorkoutExerciseAddView(APIView):
    def post(self, request):
        serializer = WorkoutExerciseSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class WorkoutExerciseDeleteView(APIView):
    def delete(self, request, pk):
        try:
            exercise_to_delete = workout_exercises.objects.get(pk=pk)
            exercise_to_delete.delete()

            return Response({"message": "Workout exercise deleted"}, status=status.HTTP_204_NO_CONTENT)
        
        except workout_exercises.DoesNotExist:
            return Response({"error": "Workout exercise not found"}, status=status.HTTP_404_NOT_FOUND)


class WorkoutAddView(APIView):
    def post(self, request):
        serializer = WorkoutSerializer(data=request.data)

        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class WorkoutDeleteView(APIView):
    def delete(self, request, pk):
        try:
            workout_to_delete = workouts.objects.get(pk=pk)
            workout_to_delete.delete()
            return Response({"message": "Workout deleted"}, status=status.HTTP_204_NO_CONTENT)
            
        except workouts.DoesNotExist:
            return Response({"error": "Workout not found"}, status=status.HTTP_404_NOT_FOUND)


class ExerciseAddView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = ExerciseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ExerciseDeleteView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):
        try:
            exercise = exercises.objects.get(pk=pk)
            exercise.delete()
            return Response({"message": "exercise deleted"}, status=status.HTTP_204_NO_CONTENT)
        except exercises.DoesNotExist:
            return Response({"error": "exercise not found"}, status=status.HTTP_404_NOT_FOUND)


class WorkoutHistoryCreateView(APIView):
    def post(self, request):
        serializer = WorkoutHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WorkoutHistoryDeleteView(APIView):
    def delete(self, request, pk):
        try:
            history_to_delete = workout_history.objects.get(pk=pk)
            history_to_delete.delete()
            return Response({"message": "Historia treningu usunięta."}, status=status.HTTP_204_NO_CONTENT)
        except workout_history.DoesNotExist:
            return Response({"error": "Nie znaleziono takiego wpisu."}, status=status.HTTP_404_NOT_FOUND)
