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
