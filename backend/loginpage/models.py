from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
# Utilizes Django's built-in User model as it contains what will mostly be used
# https://docs.djangoproject.com/en/5.1/ref/contrib/auth/

class JournalUser(AbstractUser):
    email = models.EmailField(unique=True)
    dob = models.DateField(null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=6, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'dob']

    def __str__(self):
        return self.username
