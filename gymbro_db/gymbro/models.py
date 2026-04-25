from django.db import models

# TO DO - dostosować enumy do potrzeb naszych tabel


class EventTypes(models.TextChoices):
    WORKOUT = 'workout'
    REST = 'rest'


class ExerciseTypes(models.TextChoices):
    STRENGTH = 'strength'
    CARDIO = 'cardio'


class MuscleGroups(models.TextChoices):
    ARMS = 'arms'
    LEGS = 'legs'


class DifficultyLevels(models.TextChoices):
    BEGINNER = 'beginner'
    ADVANCED = 'advanced'


class users(models.Model):
    username = models.TextField(unique=True)
    email = models.TextField(unique=True)
    password = models.TextField()
    first_name = models.TextField()
    last_name = models.TextField()
    created_at = models.DateTimeField()


class calendar_events(models.Model):
    user = models.ForeignKey('users', on_delete=models.CASCADE)
    utc_time = models.DateTimeField()
    event_type = models.CharField(max_length=50, choices=EventTypes.choices)
    title = models.TextField()
    description = models.TextField()


class exercises(models.Model):
    name = models.TextField()
    type = models.CharField(max_length=50, choices=ExerciseTypes.choices)
    muscle = models.CharField(max_length=50, choices=MuscleGroups.choices)
    difficulty = models.CharField(max_length=50, choices=DifficultyLevels.choices)
    instructions = models.TextField()
    safety_info = models.TextField()


class exercises_history(models.Model):
    user = models.ForeignKey('users', on_delete=models.CASCADE)
    workout_history = models.ForeignKey('workout_history', on_delete=models.CASCADE)
    index = models.IntegerField()
    exercise = models.ForeignKey('exercises', on_delete=models.CASCADE)
    weight = models.FloatField()
    reps = models.FloatField()
    duration = models.TimeField()
    utc_time = models.DateTimeField()


class workout_history(models.Model):
    user = models.ForeignKey('users', on_delete=models.CASCADE)
    workout = models.ForeignKey('workouts', on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    total_time = models.TimeField()


class workouts(models.Model):
    user = models.ForeignKey('users', on_delete=models.CASCADE)
    created_at = models.DateTimeField()
