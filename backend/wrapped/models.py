from django.db import models


class User(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name}'


class Wrap(models.Model):
    name = models.CharField(max_length=255)
    time_period = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name}'


class WrapUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    wrap = models.ForeignKey(Wrap, on_delete=models.CASCADE)
    owner = models.BooleanField()
    accepted = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user} - {self.wrap}'


class WrapAlbum(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    wrap = models.ForeignKey(Wrap, on_delete=models.CASCADE)
    listen_time = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.id}'


class WrapTrack(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    listen_time = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.id}'
