# Generated by Django 5.1 on 2024-12-02 01:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wrapped', '0011_wrap_artist_count_wrap_track_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='wrapartist',
            name='priority',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='wraptrack',
            name='priority',
            field=models.IntegerField(default=0),
        ),
    ]
