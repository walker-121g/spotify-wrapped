# Generated by Django 5.1 on 2024-11-25 19:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wrapped', '0009_follow'),
    ]

    operations = [
        migrations.AddField(
            model_name='wrapartist',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wrapped.user'),
        ),
        migrations.AddField(
            model_name='wraptrack',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wrapped.user'),
        ),
    ]
