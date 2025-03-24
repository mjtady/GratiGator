from django.shortcuts import render, redirect
# sending email - https://docs.djangoproject.com/en/5.1/topics/email/
from django.core.mail import send_mail
from django.conf import settings
from .models import JournalUser
from .forms import UserRegistration, VerificationCode
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.http import JsonResponse
import random, json

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)  # Check database

        if user is not None:
            return JsonResponse({"message": "Login successful", "user": user.username})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)


def generate_verification_code():
    return ''.join(random.choices('0123456789', k=6)) #https://www.geeksforgeeks.org/random-choices-method-in-python/

def register(request):
    print("Register view called")  # Add this line to check if the view is hit
    if request.method == 'POST': # https://www.w3schools.com/tags/ref_httpmethods.asp
        form = UserRegistration(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            if not email.endswith('@ufl.edu'):
                return render(request, 'register.html' , {'form' : form, 'error' : 'Only @ufl.edu emails are allowed.'})
            if JournalUser.objects.filter(email = email).exists(): # https://www.geeksforgeeks.org/filter-in-python/
                return render(request, 'register.html', {'form': form, 'error': 'Email already registered.'})
            
            verification_code = generate_verification_code()

            user = JournalUser.objects.create_user(
                username = email,
                email = email,
                is_verified = False,
                verification_code = verification_code
            )

            user.set_unusable_password()
            user.save()
            
            print("Sending verification email to:", email)
            send_mail(
                'Gratigator Email Verification', 
                f'Your verification code is: {verification_code}',
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )
        return JsonResponse({'success': True, 'user_id': user.id})
    return JsonResponse({'success': False, 'error': 'Invalid request method.'})

def verify_email(request):
    if request.method == 'POST':
        user_id = request.POST.get('user_id')
        verification_code = request.POST.get('verification_code')

        try:
            user = JournalUser.objects.get(id=user_id)
            if user.verification_code == verification_code:
                user.is_verified = True
                user.save()
                return JsonResponse({'success' : True})
            else:
                return JsonResponse({'success' : False, 'error' : 'Invalid verification code.'})
        except JournalUser.DoesNotExist:
            return JsonResponse({'success' : False, 'error' : 'Email does not exist'})
        
    return JsonResponse({'success': False, 'error' : 'Invalid verification method'})