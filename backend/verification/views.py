import json
import random
import string
from django.core.mail import send_mail
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

# Helper function to generate a random 6-digit verification code
def generate_verification_code():
    """Generate a 6-digit random verification code."""
    return ''.join(random.choices(string.digits, k=6))

@csrf_exempt
def send_verification_email(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')  # Extracting email from JSON data

            if not email:
                return JsonResponse({'status': 'error', 'message': 'Email not provided'}, status=400)

            # Generate a random verification code
            verification_code = generate_verification_code()

            # Store the code in the session (or database for production)
            request.session['verification_code'] = verification_code  # Save code in session

            # Sending email with verification code
            send_mail(
                'Email Verification',
                f'Please use this code to verify your email: {verification_code}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )

            return JsonResponse({'status': 'success'}, status=200)

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def verify_verification_code(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))
            entered_code = data.get('verification_code')  # Extract verification code from user input

            if not entered_code:
                return JsonResponse({'status': 'error', 'message': 'Verification code not provided'}, status=400)

            # Retrieve the code from the session
            stored_code = request.session.get('verification_code')

            if not stored_code:
                return JsonResponse({'status': 'error', 'message': 'No verification code found. Please request a new one.'}, status=400)

            # Check if the entered code matches the stored code
            if entered_code == stored_code:
                return JsonResponse({'status': 'success'}, status=200)
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid verification code'}, status=400)

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
