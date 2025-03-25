from django.urls import path
from .views import login_view, register, verify_email

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register, name='register'),
    path('verify_email/', verify_email, name='verify_email'),
]