# Generated by Django 5.1 on 2024-11-04 07:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wrapped', '0005_wraptrack_wrap'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wraptrack',
            name='wrap',
        ),
        migrations.DeleteModel(
            name='WrapArtist',
        ),
        migrations.DeleteModel(
            name='WrapTrack',
        ),
    ]
