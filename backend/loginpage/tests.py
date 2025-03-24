from django.test import TestCase
from django.urls import reverse
from django.core import mail
from .models import JournalUser
from .views import generate_verification_code

class UserRegistrationTest(TestCase):

    def test_register_with_valid_ufl_email(self):
        print("\nRunning test_register_with_valid_ufl_email")

        # Simulate valid registration data
        form_data = {
            'email': 'testuser@ufl.edu',
            'password': 'securepassword123',
            'confirm_password': 'securepassword123',
            'dob': '2000-01-01',
        }
        
        # Make a POST request to the register view
        print(f"Posting form data: {form_data}")
        response = self.client.post(reverse('register'), form_data)
        
        # Check if the response is successful
        print(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 200)
        print(f"Response content: {response.content}")
        self.assertJSONEqual(response.content, {'success': True,  'user_id': response.json().get('user_id')})  # Adjust user_id based on your test setup
        
        # Check if the email was sent
        print(f"Emails sent: {len(mail.outbox)}")
        self.assertEqual(len(mail.outbox), 1)
        print(f"Email body: {mail.outbox[0].body}")
        self.assertIn('Your verification code is:', mail.outbox[0].body)
        
        # Check if the user was created in the database
        user = JournalUser.objects.get(email='testuser@ufl.edu')
        print(f"User created: {user.email}, Verified: {user.is_verified}")
        self.assertFalse(user.is_verified)
        self.assertEqual(user.email, 'testuser@ufl.edu')

    def test_register_with_invalid_email(self):
        print("\nRunning test_register_with_invalid_email")

        # Simulate registration with invalid email (not a @ufl.edu address)
        form_data = {
            'email': 'testuser@gmail.com',
            'password': 'securepassword123',
            'confirm_password': 'securepassword123',
            'dob': '2000-01-01',
        }
        
        # Make a POST request to the register view
        print(f"Posting form data: {form_data}")
        response = self.client.post(reverse('register'), form_data)
        
        # Check that the response contains an error message for invalid email
        print(f"Response content: {response.content}")
        self.assertContains(response, 'Only @ufl.edu emails are allowed.', status_code=200)

    def test_register_with_existing_email(self):
        print("\nRunning test_register_with_existing_email")

        # First, create a user with the email
        existing_user = JournalUser.objects.create_user(
            username='testuser@ufl.edu',
            email='testuser@ufl.edu',
            is_verified=False,
            verification_code='123456',
        )
        existing_user.set_unusable_password()
        existing_user.save()

        # Simulate registration with the same email
        form_data = {
            'email': 'testuser@ufl.edu',
            'password': 'securepassword123',
            'confirm_password': 'securepassword123',
            'dob': '2000-01-01',
        }
        
        # Make a POST request to the register view
        print(f"Posting form data: {form_data}")
        response = self.client.post(reverse('register'), form_data)
        
        # Check that the response contains an error message for existing email
        print(f"Response content: {response.content}")
        self.assertContains(response, 'Email already registered.', status_code=200)

    def test_verify_email_with_correct_code(self):
        print("\nRunning test_verify_email_with_correct_code")

        # Create a user
        user = JournalUser.objects.create_user(
            username='testuser@ufl.edu',
            email='testuser@ufl.edu',
            is_verified=False,
            verification_code='123456'
        )
        user.set_unusable_password()
        user.save()

        # Simulate the correct verification code
        form_data = {
            'user_id': user.id,
            'verification_code': '123456'
        }
        
        # Make a POST request to the verify_email view
        print(f"Posting form data: {form_data}")
        response = self.client.post(reverse('verify_email'), form_data)
        
        # Check if the user is marked as verified
        user.refresh_from_db()
        print(f"User verified: {user.is_verified}")
        self.assertTrue(user.is_verified)
        
        # Check if the response indicates success
        print(f"Response content: {response.content}")
        self.assertJSONEqual(response.content, {'success': True})

    def test_verify_email_with_incorrect_code(self):
        print("\nRunning test_verify_email_with_incorrect_code")

        # Create a user
        user = JournalUser.objects.create_user(
            username='testuser@ufl.edu',
            email='testuser@ufl.edu',
            is_verified=False,
            verification_code='123456'
        )
        user.set_unusable_password()
        user.save()

        # Simulate an incorrect verification code
        form_data = {
            'user_id': user.id,
            'verification_code': '654321'
        }
        
        # Make a POST request to the verify_email view
        print(f"Posting form data: {form_data}")
        response = self.client.post(reverse('verify_email'), form_data)
        
        # Check if the response contains the error message for invalid code
        print(f"Response content: {response.content}")
        self.assertJSONEqual(response.content, {'success': False, 'error': 'Invalid verification code.'})

    def test_verify_email_with_non_existent_user(self):
        print("\nRunning test_verify_email_with_non_existent_user")

        # Simulate a verification request with a non-existent user ID
        form_data = {
            'user_id': 9999,  # An ID that does not exist
            'verification_code': '123456'
        }
        
        # Make a POST request to the verify_email view
        print(f"Posting form data: {form_data}")
        response = self.client.post(reverse('verify_email'), form_data)
        
        # Check if the response contains the error message for non-existent user
        print(f"Response content: {response.content}")
        self.assertJSONEqual(response.content, {'success': False, 'error': 'Email does not exist'})