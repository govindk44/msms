# Generated by Django 5.1.3 on 2024-12-29 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medicalstoreapp', '0040_order_orderitem'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='order',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='medicine',
        ),
        migrations.AddField(
            model_name='booking',
            name='quantity',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.DeleteModel(
            name='Order',
        ),
        migrations.DeleteModel(
            name='OrderItem',
        ),
    ]
