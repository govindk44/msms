# Generated by Django 5.1.3 on 2025-02-07 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medicalstoreapp', '0055_paymentdetails_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paymentdetails',
            name='razorpay_order_id',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='paymentdetails',
            name='razorpay_payment_id',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='paymentdetails',
            name='status',
            field=models.CharField(default='Pending', max_length=50),
        ),
    ]
