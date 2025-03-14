# Generated by Django 3.2 on 2024-05-20 10:46

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='landacape-Gh/image/')),
                ('observation_on_site', models.CharField(blank=True, max_length=50, null=True)),
                ('activity_status', models.CharField(blank=True, max_length=15, null=True)),
                ('charcoal_type', models.CharField(blank=True, max_length=15, null=True)),
                ('comment', models.CharField(blank=True, max_length=1000, null=True)),
                ('audio', models.FileField(blank=True, null=True, upload_to='landscape-Gh/audio/')),
                ('geometry_type', models.CharField(blank=True, max_length=15, null=True)),
                ('geom', django.contrib.gis.db.models.fields.GeometryField(blank=True, null=True, srid=4326)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='User_data',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('organization', models.CharField(blank=True, max_length=250, null=True)),
                ('contact', models.CharField(blank=True, max_length=20, null=True)),
                ('email', models.EmailField(blank=True, max_length=255, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('record_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='landscape_gh.record')),
            ],
        ),
        migrations.CreateModel(
            name='Record_coordinate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.DecimalField(decimal_places=8, max_digits=15)),
                ('longitude', models.DecimalField(decimal_places=8, max_digits=15)),
                ('accuracy', models.DecimalField(decimal_places=3, max_digits=5)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('record_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='landscape_gh.record')),
            ],
        ),
    ]
