# Generated by Django 4.2 on 2025-01-09 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('galamsey_portal', '0015_referencewafordcolorpalette_referencewaforddata'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdditionalLayer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, unique=True)),
                ('url', models.URLField(blank=True, null=True)),
            ],
        ),
    ]
