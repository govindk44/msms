# Generated by Django 5.0.7 on 2024-11-22 15:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicalstoreapp', '0020_rename_cart_cartitem'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CartItem',
            new_name='Cart',
        ),
    ]
