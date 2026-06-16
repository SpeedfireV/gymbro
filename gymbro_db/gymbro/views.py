from datetime import datetime, timedelta, time
from django.utils import timezone as django_timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.db import transaction

from .models import users, workout_exercises, workouts, calendar_events, exercises, workout_history, exercises_history
from .models import posts, comments, ratings, comments_ratings
from .serializers import RegisterSerializer, LoginSerializer, UserDTOSerializer, WorkoutExerciseSerializer, WorkoutSerializer
from .serializers import ExerciseSerializer, WorkoutHistorySerializer, ExerciseHistorySerializer, PostSerializer
from .serializers import CommentSerializer, CalendarEventSerializer

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


class WorkoutListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        workouts_qs = workouts.objects.filter(user=request.user)
        day = request.query_params.get('day')

        if day:
            try:
                day_date = datetime.date.fromisoformat(day)
            except ValueError:
                return Response({"error": "Invalid day format. Expected YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

            workouts_qs = workouts_qs.filter(created_at__date=day_date)

        serializer = WorkoutSerializer(workouts_qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = WorkoutSerializer(data=request.data)

        if serializer.is_valid():
            try:
                db_user = users.objects.get(id=request.user.id)
            except users.DoesNotExist:
                return Response(
                    {"error": "Nie znaleziono profilu użytkownika w tabeli 'users'."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            serializer.save(user=db_user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WorkoutExerciseListView(APIView):
    def get(self,request, workout_id):
        exercises_for_workout = workout_exercises.objects.filter(workout_id=workout_id).order_by('index')
        serializer = WorkoutExerciseSerializer(exercises_for_workout, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WorkoutDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            workout = workouts.objects.get(pk=pk, user=request.user)
        except workouts.DoesNotExist:
            return Response({"error": "Workout not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = WorkoutSerializer(workout)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        try:
            workout = workouts.objects.get(pk=pk, user=request.user)
        except workouts.DoesNotExist:
            return Response({"error": "Workout not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = WorkoutSerializer(workout, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            current_user_id = request.user.id if hasattr(request.user, 'id') else request.user
            workout = workouts.objects.get(pk=pk, user_id=request.user.id)
            workout.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except workouts.DoesNotExist:
            return Response({"error": "Workout not found"}, status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request, pk):
        try:
            workout = workouts.objects.get(pk=pk, user_id=request.user.id if hasattr(request.user, 'id') else request.user)
            
            workout.name = request.data.get('name', workout.name)
            workout.description = request.data.get('description', workout.description)
            workout.save()

            workout.workout_exercises_set.all().delete()

            serializer = WorkoutSerializer(workout)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except workouts.DoesNotExist:
            return Response({"error": "Workout not found"}, status=status.HTTP_404_NOT_FOUND)


class CalendarEventListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_user_id = request.user.id if hasattr(request.user, 'id') else request.user
        
        target_date_str = request.query_params.get('date')

        if not target_date_str:
            return Response({"error": "Parameter 'date' (YYYY-MM-DD) is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            clean_date_str = target_date_str[:10]
            target_date = datetime.strptime(clean_date_str, '%Y-%m-%d').date()
        except ValueError:
            return Response({"error": "Invalid date format. Use YYYY-MM-DD or ISO string"}, status=status.HTTP_400_BAD_REQUEST)

        single_events = calendar_events.objects.filter(
            user_id=current_user_id,
            repeat='none',
            utc_time__date=target_date
        )

        recurring_events = calendar_events.objects.filter(
            user_id=current_user_id,
            utc_time__date__lte=target_date
        ).exclude(repeat='none')

        final_events_data = []

        single_events_serialized = CalendarEventSerializer(single_events, many=True).data
        final_events_data.extend(single_events_serialized)

        for event in recurring_events:
            event_start_date = event.utc_time.date()
            interval = event.repeat_interval or 1

            if interval <= 0:
                interval = 1

            days_difference = (target_date - event_start_date).days

            if days_difference % interval == 0:
                event_data = CalendarEventSerializer(event).data
                
                event_data['id'] = f"{event.id}-{target_date.strftime('%Y%m%d')}"
                event_data['utc_time'] = datetime.combine(target_date, datetime.min.time()).isoformat()
                
                final_events_data.append(event_data)

        final_events_data.sort(key=lambda x: x.get('time_begin') or '')

        return Response(final_events_data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CalendarEventSerializer(data=request.data)
        if serializer.is_valid():
            try:
                current_user_id = request.user.id if hasattr(request.user, 'id') else request.user
                
                user_profile = users.objects.get(id=current_user_id)

                serializer.save(user=user_profile)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            except users.DoesNotExist:
                return Response(
                    {"detail": "USER PROFILE NOT FOUND"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CalendarEventDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            current_user_id = request.user.id if hasattr(request.user, 'id') else request.user
            event = calendar_events.objects.get(pk=pk, user=current_user_id)
        except calendar_events.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CalendarEventSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        try:
            current_user_id = request.user.id if hasattr(request.user, 'id') else request.user
            event = calendar_events.objects.get(pk=pk, user_id=current_user_id)
        except calendar_events.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = CalendarEventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            current_user_id = request.user.id if hasattr(request.user, 'id') else request.user
            event = calendar_events.objects.get(pk=pk, user_id=current_user_id)
            event.delete()
            return Response({"message": "Event deleted"}, status=status.HTTP_204_NO_CONTENT)
        except calendar_events.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
        

class CalendarEventOverviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_user_id = request.user.id if hasattr(request.user, 'id') else request.user
        
        now_datetime = django_timezone.now()
        today_date = now_datetime.date()

        user_events = calendar_events.objects.filter(user_id=current_user_id)
        
        final_overview_data = []

        for event in user_events:
            event_data = CalendarEventSerializer(event).data
            
            event_start_date = event.utc_time.date()
            
            if event.repeat == 'none':
                if event.utc_time < now_datetime:
                    event_data['next_occurrence'] = "never"
                else:
                    event_data['next_occurrence'] = event.utc_time.isoformat()

            else:
                interval = event.repeat_interval or 1
                if interval <= 0:
                    interval = 1

                if event.utc_time >= now_datetime:
                    event_data['next_occurrence'] = event.utc_time.isoformat()
                else:
                    days_diff = (today_date - event_start_date).days
                    modulo_rem = days_diff % interval
                    
                    if modulo_rem == 0:
                        event_today_time = datetime.combine(today_date, event.time_begin or datetime.min.time())
                        event_today_time = django_timezone.make_aware(event_today_time, django_timezone.get_current_timezone())
                        
                        if event_today_time >= now_datetime:
                            next_date = today_date
                        else:
                            next_date = today_date + timedelta(days=interval)
                    else:
                        days_to_next = interval - modulo_rem
                        next_date = today_date + timedelta(days=days_to_next)
                    
                    next_occurrence_datetime = datetime.combine(next_date, event.time_begin or datetime.min.time())
                    event_data['next_occurrence'] = next_occurrence_datetime.isoformat()

            final_overview_data.append(event_data)

        final_overview_data.sort(
            key=lambda x: (x['next_occurrence'] == "never", x['next_occurrence'])
        )

        return Response(final_overview_data, status=status.HTTP_200_OK)

class UserWorkoutsListView(APIView):
    def get(self, request, user_id):
        user_workouts = workouts.objects.filter(user_id=user_id).order_by('-created_at')
        serializer = WorkoutSerializer(user_workouts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ExerciseDeleteView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):
        try:
            exercise = exercises.objects.get(pk=pk)
            exercise.delete()
            return Response({"message": "exercise deleted"}, status=status.HTTP_204_NO_CONTENT)
        except exercises.DoesNotExist:
            return Response({"error": "exercise not found"}, status=status.HTTP_404_NOT_FOUND)


class ExerciseListCreateView(APIView):
    def get(self, request):
        all_exercises = exercises.objects.all()
        serializer = ExerciseSerializer(all_exercises, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        if not request.user or not request.user.is_staff:
            return Response(
                {"detail": "You do not have permission to perform this action."}, 
                status=status.HTTP_403_FORBIDDEN
            )
            
        serializer = ExerciseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    