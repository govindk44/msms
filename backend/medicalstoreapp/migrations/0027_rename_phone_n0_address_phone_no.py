# Generated by Django 5.0.7 on 2024-11-24 06:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicalstoreapp', '0026_address_phone_n0'),
    ]

    operations = [
        migrations.RenameField(
            model_name='address',
            old_name='phone_n0',
            new_name='phone_no',
        ),
    ]
