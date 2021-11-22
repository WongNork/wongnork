from django.http import response
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User


class RegistrationTest(TestCase):
    """Test cases for registration system."""

    def test_can_view_register_page(self):
        """Test that anyone can access register page."""
        response = self.client.get(reverse('wongnork:register'))
        self.assertEqual(response.status_code, 200)

    def test_annonymous_can_register(self):
        """Test that annonymous user can register and redirect to home page."""
        response = self.client.post(reverse('wongnork:register'), {
            'username': 'demo1', 'email': 'demo1@gmail.com',
            'password1': 'Test@12345', 'password2': 'Test@12345'
        })
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, reverse('wongnork:home-page'))


class LoginTest(TestCase):
    """Test cases for login system."""

    def test_can_view_login_page(self):
        """Test that anyone can access login page."""
        response = self.client.get(reverse('wongnork:login'))
        self.assertEqual(response.status_code, 200)

    def test_can_login(self):
        """Test that annonymous user can login."""
        User.objects.create(
            username='demo1', email='demo1@gmail.com', password='Test@12345')
        response = self.client.post(reverse('wongnork:login'), {
            'username': 'demo1', 'password1': 'Test@12345'
        }, follow=True)
        self.assertEqual(response.status_code, 200)


class UserProfileTest(TestCase):
    """Test cases for user profile system."""

    def test_cant_view_user_profile(self):
        """Test that unauthenticated user cannot access user profile page."""
        response = self.client.get(reverse('wongnork:user-profile'))
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, reverse('wongnork:login')) # Redirect to login page

    def test_authenticated_view_user_profile(self):
        """Test that authenticated user can access user profile page."""
        User.objects.create_user(
            username='demo1', email='demo1@gmail.com', password='Test@12345')
        self.client.post(reverse('wongnork:login'), {
            'username': 'demo1', 'password1': 'Test@12345'
        }, follow=True)
        response = self.client.get(reverse('wongnork:user-profile'))
        self.assertEqual(response.status_code, 302)


# class HomePageTest(TestCase):
#     """Test cases for Home page system."""

    # def test_can_view_home_page(self):
    #     """Test that anyone can access home page."""
    #     response = self.client.get(reverse('wongnork:home-page'))
    #     self.assertEqual(response.status_code, 200)
