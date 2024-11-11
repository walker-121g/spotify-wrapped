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


class WrapArtist(models.Model):
    artist = models.CharField(max_length=255)
    wrap = models.ForeignKey(Wrap, on_delete=models.CASCADE)
    listen_time = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.artist}'


class WrapTrack(models.Model):
    track = models.CharField(max_length=255)
    wrap = models.ForeignKey(Wrap, on_delete=models.CASCADE)
    listen_time = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.track}'


class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    wrap = models.ForeignKey(Wrap, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.title}'


class Comment(models.Model):
    content = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.content}'


class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.post} - {self.user}'


class Feedback(models.Model):
    email = models.EmailField(max_length=255, unique=True, primary_key=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.email}'


class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='follower')
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.follower} - {self.following}'
