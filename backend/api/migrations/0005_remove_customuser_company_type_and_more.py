# Generated by Django 4.2.11 on 2024-03-23 00:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_customuser_mobile_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='company_type',
        ),
        migrations.AddField(
            model_name='company',
            name='company_type_tego',
            field=models.CharField(default='supplier', max_length=30),
            preserve_default=False,
        ),
    ]