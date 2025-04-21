from django.urls import path
from .views import journal_entries, current_user

urlpatterns = [
    path('journal/', journal_entries, name='journal'),
    path('auth/user/', current_user, name='current_user'),
]