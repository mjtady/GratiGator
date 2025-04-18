from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.authtoken.models import Token

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)  # Check database

        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse({"message": "Login successful", "user": user.username, "token" : token.key})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)