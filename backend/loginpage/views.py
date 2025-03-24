from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate
from django.http import JsonResponse

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