# Generated by Django 5.0.7 on 2024-10-24 15:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicalstoreapp', '0006_customer_auth_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feedback',
            name='product',
        ),
        migrations.RemoveField(
            model_name='feedback',
            name='rating',
        ),
    ]
