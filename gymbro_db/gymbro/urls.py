from django.urls import path
from .views import RegisterView, LoginView, WorkoutExerciseAddView, WorkoutExerciseDeleteView
from .views import WorkoutAddView, WorkoutDeleteView, ExerciseAddView, ExerciseDeleteView
from .views import WorkoutHistoryAddView, WorkoutHistoryDeleteView, ExerciseHistoryDetailView
from .views import PostListCreateView, PostDetailView, CommentListCreateView, CommentDetailView
from .views import PostRateView, CommentRateView, WorkoutExerciseListView, UserWorkoutsListView
from .views import ExerciseListView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('workout-exercises/', WorkoutExerciseAddView.as_view(), name='add-workout-exercise'),
    path('workout-exercises/<int:pk>/', WorkoutExerciseDeleteView.as_view(), name='delete-workout-exercise'),
    path('workouts/<int:workout_id>/exercises/', WorkoutExerciseListView.as_view(), name='workout-exercises-list'),
    path('workouts/', WorkoutAddView.as_view(), name='add-workout'),
    path('workouts/<int:pk>/', WorkoutDeleteView.as_view(), name='delete-workout'),
    path('users/<int:user_id>/workouts/', UserWorkoutsListView.as_view(), name='user-workouts-list'),
    path('exercises/', ExerciseAddView.as_view(), name='add-exercise'),
    path('exercises/<int:pk>/', ExerciseDeleteView.as_view(), name='delete-exercise'),
    path('exercises/', ExerciseListView.as_view(), name='exercises-list'),
    path('workout-history/', WorkoutHistoryAddView.as_view(), name='add-workout-history'),
    path('workout-history/<int:pk>/', WorkoutHistoryDeleteView.as_view(), name='delete-workout-history'),
    path('exercise-history/<int:pk>/', ExerciseHistoryDetailView.as_view(), name='detail-exercise-history'),
    path('posts/', PostListCreateView.as_view(), name='posts-list-create'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='posts-detail'),
    path('comments/', CommentListCreateView.as_view(), name='comments-list-create'),
    path('comments/<int:pk>/', CommentDetailView.as_view(), name='comments-detail'),
    path('posts/<int:pk>/rate/', PostRateView.as_view(), name='post-rate'),
    path('comments/<int:pk>/rate/', CommentRateView.as_view(), name='comment-rate'),
]
