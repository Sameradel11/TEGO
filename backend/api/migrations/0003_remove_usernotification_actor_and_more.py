# Generated by Django 4.2.11 on 2024-03-26 01:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_usernotification_actor_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usernotification',
            name='actor',
        ),
        migrations.RemoveField(
            model_name='usernotification',
            name='event',
        ),
        migrations.RemoveField(
            model_name='usernotification',
            name='verb',
        ),
    ]
