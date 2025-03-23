from django.test import TestCase
from django.core.mail import send_mail
from django.core import mail
from django.conf import settings

class EmailTests(TestCase):
    def test_send_email(self):
        # Send a test email
        send_mail(
            'Test Email',
            'This is a test email from Django.',
            settings.EMAIL_HOST_USER,  # Sender's email
            ['mtady@ufl.edu'],  # Recipient's email
            fail_silently=False,
        )

        # Check if an email was sent
        self.assertEqual(len(mail.outbox), 1)  # Ensure one email was sent
        self.assertEqual(mail.outbox[0].subject, 'Test Email')
        self.assertEqual(mail.outbox[0].to, ['mtady@ufl.edu'])
        self.assertIn('This is a test email from Django.', mail.outbox[0].body)