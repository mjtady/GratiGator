from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.contrib.auth.models import User
import json

def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username_or_email = data['emailOrUsername']
        password = data['password']

        user = authenticate(request, username=username_or_email, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful', 'user_id': user.id})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
