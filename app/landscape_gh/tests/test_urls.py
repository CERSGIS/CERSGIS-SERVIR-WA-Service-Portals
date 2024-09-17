from django.test import SimpleTestCase
from django.urls import reverse

class ApiUrlTests(SimpleTestCase):
  def test_api_homepage_url_exists_at_correct_location(self):
    response = self.client.get('/landscape-gh/api/v1/')
    self.assertEqual(response.status_code, 200)

  def test_api_homepage_url_available_by_name(self):
    response = self.client.get(reverse('landscapeGH:api_home'))
    self.assertEqual(response.status_code, 200)

  def test_api_data_submission_url_exists_at_correct_location(self):
    response = self.client.get('/landscape-gh/api/v1/data-submissions')
    self.assertEqual(response.status_code, 405)

  def test_api_data_submission_url_available_by_name(self):
    response = self.client.get(reverse('landscapeGH:api_data_submissions'))
    self.assertEqual(response.status_code, 405)

  def test_api_data_submission_url_method_is_post(self):
    response = self.client.post(reverse('landscapeGH:api_data_submissions'))
    self.assertEqual(response.status_code, 204)