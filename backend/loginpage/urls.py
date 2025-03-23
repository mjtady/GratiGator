from django.urls import path
from . import views  # Import views from the same app

urlpatterns = [
    path('register/', views.register, name='register'),
    path('verify_email/', views.verify_email, name='verify_email'),
]