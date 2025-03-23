from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import JournalUser

# https://docs.djangoproject.com/en/5.1/topics/forms/
# https://www.geeksforgeeks.org/django-forms/

class UserRegistration(forms.Form):
    email = forms.EmailField(label="Email", max_length=254)

class VerificationCode(forms.Form):
    verification_code = forms.CharField(label="Verification Code", max_length=6)