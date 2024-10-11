from django.db import models


class User(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_created=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
