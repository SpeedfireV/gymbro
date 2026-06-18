from django.contrib import admin
from .models import exercises, workouts, workout_exercises, calendar_events, users
# Register your models here.
admin.site.register(exercises)
admin.site.register(workouts)
admin.site.register(workout_exercises)
admin.site.register(calendar_events)
admin.site.register(users)