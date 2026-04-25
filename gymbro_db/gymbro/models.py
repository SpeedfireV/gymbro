from django.db import models

# TO DO - dostosować enumy do potrzeb naszych tabel


class EventTypes(models.choices):
    WORKOUT = 'workout'
    REST = 'rest'


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
