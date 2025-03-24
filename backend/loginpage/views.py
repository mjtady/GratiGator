from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
# sending email - https://docs.djangoproject.com/en/5.1/topics/email/
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from .models import JournalUser
from .forms import UserRegistration, VerificationCode
import random


def generate_verification_code():
    return ''.join(random.choices('0123456789', k=6)) #https://www.geeksforgeeks.org/random-choices-method-in-python/

def register(request):
    if request.method == 'POST': # https://www.w3schools.com/tags/ref_httpmethods.asp
        form = UserRegistration(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            if not email.endswith('@ufl.edu'):
                return render(request, 'register.html' , {'form' : form, 'error' : 'Only @ufl.edu emails are allowed.'})
            if JournalUser.objects.filter(uflemail = email).exists(): # https://www.geeksforgeeks.org/filter-in-python/
                return render(request, 'register.html', {'form': form, 'error': 'Email already registered.'})
            
            verification_code = generate_verification_code()
            send_mail(
                'Gratigator Email Verification', 
                f'Your verification code is: {verification_code}',
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently = False,
            )
            user = JournalUser.objects.create_user(
                username = email,
                uflemail = email,
                is_verified = False,
                verification_code = verification_code
            )
            user.set_unusable_password()
            user.save()

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