from django.urls import path
from . import views

urlpatterns = [
    # URL for sending verification email
    path('send-verification-email/', views.send_verification_email, name='send_verification_email'),

    # URL for verifying the verification code
    path('verify-verification-code/', views.verify_verification_code, name='verify_verification_code'),
]
