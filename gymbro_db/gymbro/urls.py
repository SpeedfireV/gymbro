from django.urls import path
from .views import RegisterView, LoginView, WorkoutExerciseAddView, WorkoutExerciseDeleteView
from .views import WorkoutAddView, WorkoutDeleteView, ExerciseAddView, ExerciseDeleteView
from .views import WorkoutHistoryAddView, WorkoutHistoryDeleteView, ExerciseHistoryDetailView


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('workout-exercises/', WorkoutExerciseAddView.as_view(), name='add-workout-exercise'),
    path('workout-exercises/<int:pk>/', WorkoutExerciseDeleteView.as_view(), name='delete-workout-exercise'),
    path('workouts/', WorkoutAddView.as_view(), name='add-workout'),
    path('workouts/<int:pk>/', WorkoutDeleteView.as_view(), name='delete-workout'),
    path('exercises/', ExerciseAddView.as_view(), name='add-exercise'),
    path('exercises/<int:pk>/', ExerciseDeleteView.as_view(), name='delete-exercise'),
    path('workout-history/', WorkoutHistoryAddView.as_view(), name='add-workout-history'),
    path('workout-history/<int:pk>/', WorkoutHistoryDeleteView.as_view(), name='delete-workout-history'),
    path('exercise-history/<int:pk>/', ExerciseHistoryDetailView.as_view(), name='detail-exercise-history'),
]
