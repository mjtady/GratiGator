from django.shortcuts import render, redirect #redirect might be wrong

# Create your views here.
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

def login_view(request):
    username = request.POST['username']
    password = request.POST['password']

    # Check if user exists and the password is correct
    user = authenticate(request, username=username, password=password)

    if user is not None:
        # Log the user in
        login(request, user)
        return redirect('home')  # Redirect to some home page after login
    else:
        return render(request, 'loginpage/login.html', {'error': 'Invalid login credentials'})