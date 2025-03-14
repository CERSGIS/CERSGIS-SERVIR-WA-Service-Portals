# Generated by Django 3.2 on 2024-08-30 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charcoal_portal', '0009_report'),
    ]

    operations = [
        migrations.CreateModel(
            name='CharcoalRegion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reg_code', models.CharField(max_length=50, unique=True)),
                ('region', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': 'Charcoal Region',
                'verbose_name_plural': 'Charcoal Regions',
            },
        ),
    ]
