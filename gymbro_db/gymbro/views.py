from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAdminUser
from django.db import transaction

from .models import users, workout_exercises, workouts, exercises, workout_history, exercises_history
from .models import posts, comments, ratings, comments_ratings
from .serializers import RegisterSerializer, LoginSerializer, UserDTOSerializer, WorkoutExerciseSerializer, WorkoutSerializer
from .serializers import ExerciseSerializer, WorkoutHistorySerializer, ExerciseHistorySerializer, PostSerializer
from .serializers import CommentSerializer

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


class ExerciseListCreateView(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUser()]
        return []

    def get(self, request):
        search_term = request.query_params.get('search') or request.query_params.get('name')
        exercises_qs = exercises.objects.all()
        if search_term:
            exercises_qs = exercises_qs.filter(name__icontains=search_term)

        serializer = ExerciseSerializer(exercises_qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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


class WorkoutHistoryAddView(APIView):
    @transaction.atomic
    def post(self, request):
        data = request.data.copy()
        exercises_data = data.pop('exercises', [])
        history_serializer = WorkoutHistorySerializer(data=data)

        if history_serializer.is_valid():
            history_obj = history_serializer.save()
        
            for ex_data in exercises_data:
                ex_data['workout_history'] = history_obj.id
                ex_data['user'] = history_obj.user.id
                ex_serializer = ExerciseHistorySerializer(data=ex_data)

                if ex_serializer.is_valid():
                    ex_serializer.save()
                else:
                    transaction.set_rollback(True)
                    return Response({
                        "error": "Validation error in exercise", 
                        "details": ex_serializer.errors
                    }, status=status.HTTP_400_BAD_REQUEST)
                    
            return Response({"message": "Workout and exercises added successfully"}, status=status.HTTP_201_CREATED)
            
        return Response(history_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WorkoutHistoryDeleteView(APIView):
    def delete(self, request, pk):
        try:
            history_to_delete = workout_history.objects.get(pk=pk)
            history_to_delete.delete()
            return Response({"message": "Workout history deleted"}, status=status.HTTP_204_NO_CONTENT)
        except workout_history.DoesNotExist:
            return Response({"error": "Workout history not found"}, status=status.HTTP_404_NOT_FOUND)


class ExerciseHistoryDetailView(APIView):
    def patch(self, request, pk):
        try:
            exercise = exercises_history.objects.get(pk=pk)
            serializer = ExerciseHistorySerializer(exercise, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except exercises_history.DoesNotExist:
            return Response({"error": "Exercise not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            exercise = exercises_history.objects.get(pk=pk)
            exercise.delete()
            return Response({"message": "Exercise deleted"}, status=status.HTTP_204_NO_CONTENT)
        except exercises_history.DoesNotExist:
            return Response({"error": "Exercise not found"}, status=status.HTTP_404_NOT_FOUND)


class PostListCreateView(APIView):
    def get(self, request):
        all_posts = posts.objects.all().order_by('-id')
        serializer = PostSerializer(all_posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(like_count=0, dislike_count=0)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetailView(APIView):
    def delete(self, request, pk):
        try:
            post_to_delete = posts.objects.get(pk=pk)
            post_to_delete.delete()
            return Response({"message": "Post deleted"}, status=status.HTTP_204_NO_CONTENT)
        except posts.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)


class CommentListCreateView(APIView):
    def get(self, request):
        all_comments = comments.objects.all().order_by('-id')
        serializer = CommentSerializer(all_comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(like_count=0, dislike_count=0)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentDetailView(APIView):
    def delete(self, request, pk):
        try:
            comment_to_delete = comments.objects.get(pk=pk)
            comment_to_delete.delete()
            return Response({"message": "Comment deleted"}, status=status.HTTP_204_NO_CONTENT)
        except comments.DoesNotExist:
            return Response({"error": "Comment not found"}, status=status.HTTP_404_NOT_FOUND)

# switching Like / Dislike for posts
class PostRateView(APIView):
    @transaction.atomic
    def post(self, request, pk):
        user_id = request.data.get('user')
        is_like = request.data.get('is_like')

        if user_id is None or is_like is None:
            return Response({"error": "No user or is_like data"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            post = posts.objects.get(pk=pk)
        except posts.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        rating_obj = ratings.objects.filter(post=post, user_id=user_id).first()

        if rating_obj:
            if rating_obj.is_like == is_like:
                rating_obj.delete()
                if is_like:
                    post.like_count -= 1
                else:
                    post.dislike_count -= 1
                message = "Rating revoked"
            else:
                rating_obj.is_like = is_like
                rating_obj.save()
                if is_like:
                    post.like_count += 1
                    post.dislike_count -= 1
                else:
                    post.like_count -= 1
                    post.dislike_count += 1
                message = "Rating changed"
        else:
            ratings.objects.create(post=post, user_id=user_id, is_like=is_like)
            if is_like:
                post.like_count += 1
            else:
                post.dislike_count += 1
            message = "Rating added"
        
        post.save()
        return Response({
            "message": message,
            "like_count": post.like_count,
            "dislike_count": post.dislike_count
        }, status=status.HTTP_200_OK)


class CommentRateView(APIView):
    @transaction.atomic
    def post(self, request, pk):
        user_id = request.data.get('user')
        is_like = request.data.get('is_like')

        if user_id is None or is_like is None:
            return Response({"error": "No user or is_like data"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            comment = comments.objects.get(pk=pk)
        except comments.DoesNotExist:
            return Response({"error": "Comment not found"}, status=status.HTTP_404_NOT_FOUND)

        rating_obj = comments_ratings.objects.filter(comment=comment, user_id=user_id).first()

        if rating_obj:
            if rating_obj.is_like == is_like:
                rating_obj.delete()
                if is_like:
                    comment.like_count -= 1
                else:
                    comment.dislike_count -= 1
                message = "Comment rating revoked"
            else:
                rating_obj.is_like = is_like
                rating_obj.save()
                if is_like:
                    comment.like_count += 1
                    comment.dislike_count -= 1
                else:
                    comment.like_count -= 1
                    comment.dislike_count += 1
                message = "Comment rating changed"
        else:
            comments_ratings.objects.create(comment=comment, user_id=user_id, is_like=is_like)
            if is_like:
                comment.like_count += 1
            else:
                comment.dislike_count += 1
            message = "Comment rating added"

        comment.save()

        return Response({
            "message": message,
            "like_count": comment.like_count,
            "dislike_count": comment.dislike_count
        }, status=status.HTTP_200_OK)
    