# Generated by Django 5.0.7 on 2024-11-21 14:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicalstoreapp', '0013_cart_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='added_on',
        ),
        migrations.RemoveField(
            model_name='cart',
            name='user',
        ),
    ]
