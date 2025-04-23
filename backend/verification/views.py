import json
import random
import string
from django.core.mail import send_mail
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

email_verification_codes = {} #Store the codes

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
            email = data.get('email')

            if not email:
                return JsonResponse({'status': 'error', 'message': 'Email not provided'}, status=400)

            if not email.endswith('@ufl.edu'): # Ensure only UF emails are accepted
                return JsonResponse({'status': 'error', 'message': 'Only @ufl.edu email addresses are allowed'}, status=400)


            # Generate a random verification code
            verification_code = generate_verification_code()

            # Store the code in the dictionary (or database for production)
            email_verification_codes[email] = verification_code

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

            # Retrieve the code from the dict
            email = data.get('email')
            stored_code = email_verification_codes.get(email)


            if not stored_code:
                return JsonResponse({'status': 'error', 'message': 'No verification code found. Please request a new one.'}, status=400)

            # Check if the entered code matches the stored code
            if entered_code == stored_code:
                return JsonResponse({'status': 'success'}, status=200)
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid verification code'}, status=400)

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

# Allow POST requests without CSRF validation (for testing purposes)
@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            # Here we get and double check credentials and details before registering by creating a new profile
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')


            if not email.endswith('@ufl.edu'): #Double check for extra security
                return JsonResponse({'error': 'Only @ufl.edu email addresses are allowed'}, status=400)

            if not username or not email or not password:
                return JsonResponse({"error": "All fields are required"}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already exists"}, status=400)

            # Validate the password using Django's built-in password validation
            try:
                validate_password(password)
            except ValidationError as e:
                return JsonResponse({"error": e.messages[0]}, status=400)

            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()

            return JsonResponse({'status': 'success', "message": "User registered successfully"}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST method is allowed"}, status=405)

