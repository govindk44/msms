# Generated by Django 5.0.7 on 2024-11-23 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medicalstoreapp', '0022_rename_medicine_cart_product_cart_customer_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cart',
            old_name='product',
            new_name='medicine',
        ),
        migrations.RemoveField(
            model_name='cart',
            name='customer',
        ),
        migrations.AlterField(
            model_name='cart',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
    ]
