# Generated by Django 5.1.3 on 2025-01-20 17:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicalstoreapp', '0053_prescription'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='prescription',
            name='cart_item',
        ),
    ]
