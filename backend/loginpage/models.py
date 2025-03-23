from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
# Utilizes Django's built-in User model as it contains what will mostly be used
# https://docs.djangoproject.com/en/5.1/ref/contrib/auth/
class JournalUser(AbstractUser):
    uflemail = models.EmailField(unique=True) # ensures each user is unique
    dob = models.DateField()
    is_verified = models.BooleanField(default=False) # set to false as users must be verified at registration before user is truly active
    verification_code = models.CharField(max_length=6, null=True, blank=True)

    # Add unique related_name attributes to avoid clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='journaluser_set',  # Unique related_name
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='journaluser_set',  # Unique related_name
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.username