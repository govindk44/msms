# Generated by Django 5.0.7 on 2024-11-22 15:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicalstoreapp', '0019_cart_delete_cartitem'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Cart',
            new_name='CartItem',
        ),
    ]
