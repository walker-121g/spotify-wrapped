# Generated by Django 5.1 on 2024-11-04 05:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wrapped', '0002_wrap_wraptrack_alter_user_created_at_wrapalbum_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='WrapAlbum',
            new_name='WrapArtist',
        ),
    ]
