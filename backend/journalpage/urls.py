from django.urls import path
from .views import journal_entries

urlpatterns = [
    path('journal/', journal_entries, name='journal'),
]