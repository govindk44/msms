# Generated by Django 5.1.3 on 2024-12-31 13:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medicalstoreapp', '0044_alter_medicine_stock_quantity'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='quantity',
        ),
        migrations.AlterField(
            model_name='booking',
            name='booking_date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='booking',
            name='customer',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='booking',
            name='product',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='booking',
            name='status',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
