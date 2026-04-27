from rest_framework.test import APITestCase
from rest_framework import status
from .models import users


class AuthEndpointsTest(APITestCase):
    def setUp(self):
        self.register_url = '/api/register/'
        self.login_url = '/api/login/'

        self.valid_register_payload = {
            "nickname": "Test100",
            "email": "useremail@mail.com",
            "password": "1234",
            "repeat_password": "1234"
        }

    # --- Testy rejestracji ---

    def test_register_successful(self):
        response = self.client.post(self.register_url, self.valid_register_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('tokens', response.data)
        self.assertEqual(users.objects.count(), 1)

    def test_register_duplicate_email(self):
        self.client.post(self.register_url, self.valid_register_payload, format='json')

        payload = self.valid_register_payload.copy()
        payload['nickname'] = "Nowe1"

        response = self.client.post(self.register_url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

    def test_register_missing_field(self):
        invalid_payload = {"nickname": "Test100"}
        response = self.client.post(self.register_url, invalid_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_passwords_mismatch(self):
        payload = self.valid_register_payload.copy()
        payload['repeat_password'] = "4321"

        response = self.client.post(self.register_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)

    # --- Testy logowania ---
    def test_login_successful(self):
        self.client.post(self.register_url, self.valid_register_payload, format='json')

        login_payload = {
            "email": "useremail@mail.com",
            "password": "1234"
        }

        response = self.client.post(self.login_url, login_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('tokens', response.data)

    def test_login_wrong_password(self):
        self.client.post(self.register_url, self.valid_register_payload, format='json')

        login_payload = {
            "email": "useremail@mail.com",
            "password": "zlehaslo"
        }

        response = self.client.post(self.login_url, login_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
