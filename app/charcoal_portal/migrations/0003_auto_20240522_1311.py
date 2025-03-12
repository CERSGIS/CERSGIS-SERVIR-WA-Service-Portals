# Generated by Django 3.2 on 2024-05-22 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('charcoal_portal', '0002_appdetails_partner'),
    ]

    operations = [
        migrations.DeleteModel(
            name='AreaOfInterest',
        ),
        migrations.DeleteModel(
            name='NationalBoundary',
        ),
        migrations.DeleteModel(
            name='Points',
        ),
        migrations.DeleteModel(
            name='Region',
        ),
        migrations.AddField(
            model_name='appdetails',
            name='side_nav_color',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='appdetails',
            name='top_nav_color',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
