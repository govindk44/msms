# Generated by Django 5.1.3 on 2024-12-28 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medicalstoreapp', '0034_delete_address'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='created_on',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='amount',
            new_name='total_amount',
        ),
        migrations.RemoveField(
            model_name='order',
            name='items',
        ),
        migrations.RemoveField(
            model_name='order',
            name='payment_method',
        ),
        migrations.AddField(
            model_name='order',
            name='payment_type',
            field=models.CharField(default=4, max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(default='Pending', max_length=20),
        ),
    ]
