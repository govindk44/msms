# Generated by Django 5.1.3 on 2025-01-09 14:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicalstoreapp', '0051_order_paymentdetails_delete_bookings_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='status',
        ),
        migrations.RemoveField(
            model_name='paymentdetails',
            name='payment_status',
        ),
        migrations.RemoveField(
            model_name='paymentdetails',
            name='user',
        ),
    ]
