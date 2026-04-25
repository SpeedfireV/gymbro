from django.db import models


class users(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.TextField(unique=True)
    email = models.TextField(unique=True)
    password = models.TextField()
    first_name = models.TextField()
    last_name = models.TextField()
    created_at = models.DateTimeField()
