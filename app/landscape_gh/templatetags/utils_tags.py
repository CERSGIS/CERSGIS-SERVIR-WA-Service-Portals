from django import template
from django.core.files.storage import default_storage

register = template.Library()

@register.simple_tag(name='file_exists')
def file_exists(file_path):
	if default_storage.exists(file_path.name):
		return file_path
	else:
		return None