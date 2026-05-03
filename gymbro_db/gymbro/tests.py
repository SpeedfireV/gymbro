from rest_framework.test import APITestCase
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from .models import users, workouts, exercises, workout_exercises


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


class WorkoutExercisesEndpointsTest(APITestCase):

    def setUp(self):
        self.url_add = '/api/workout-exercises/'
        self.user = users.objects.create(username="XYZ", email="xyz@mail.com", password="123")
        self.workout = workouts.objects.create(user=self.user, created_at=timezone.now())

        self.exercise = exercises.objects.create(
            name="Wyciskanie", type="Strength", muscle="chest",
            difficulty="beginner", instructions="...", safety_info="..."
        )

        self.valid_payload = {
            "workout": self.workout.id,
            "exercise": self.exercise.id,
            "index": 1,
            "sets": 4,
            "reps": 10,
            "duration": "00:00:00",
            "break_between": "00:01:30",
            "break_after": "00:02:00"
        }

    def test_add_workout_exercise_successful(self):
        response = self.client.post(self.url_add, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(workout_exercises.objects.count(), 1)

    def test_delete_workout_exercise_successful(self):
        we_to_delete = workout_exercises.objects.create(
            workout=self.workout, exercise=self.exercise, index=1, sets=4, reps=10,
            duration=timedelta(seconds=0), break_between=timedelta(seconds=90), break_after=timedelta(seconds=120)
        )
        url_delete = f'/api/workout-exercises/{we_to_delete.id}/'
        response = self.client.delete(url_delete)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(workout_exercises.objects.count(), 0)

    def test_delete_non_existent_Exercise(self):
        url_delete = '/api/workout-exercises/999/'
        response = self.client.delete(url_delete)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class WorkoutsEndpointsTest(APITestCase):
    def setUp(self):
        self.url_workouts = '/api/workouts/'
        self.user = users.objects.create(username="Ludwig", email="ludwig@mail.com", password="123")

        self.valid_payload = {
            "user": self.user.id,
            "created_at": "2026-05-03T12:00:00Z"
        }

    def test_create_workout_successfyl(self):
        response = self.client.post(self.url_workouts, self.valid_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(workouts.objects.count(), 1)

    def test_delete_workout_successful(self):
        workout_to_delete = workouts.objects.create(user=self.user, created_at=timezone.now())
        url_delete = f'/api/workouts/{workout_to_delete.id}/'
        response = self.client.delete(url_delete)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(workouts.objects.count(), 0)

    def test_delete_non_existent_workout(self):
        url_delete = '/api/workouts/999/'
        response = self.client.delete(url_delete)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
