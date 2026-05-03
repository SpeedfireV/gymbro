from django.urls import path
from .views import RegisterView, LoginView, WorkoutExerciseAddView, WorkoutExerciseDeleteView
from .views import WorkoutAddView, WorkoutDeleteView


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('workout-exercises/', WorkoutExerciseAddView.as_view(), name='add-workout-exercise'),
    path('workout-exercises/<int:pk>/', WorkoutExerciseDeleteView.as_view(), name='delete-workout-exercise'),
    path('workouts/', WorkoutAddView.as_view(), name='add-workout'),
    path('workouts/<int:pk>/', WorkoutDeleteView.as_view(), name='delete-workout'),
]
