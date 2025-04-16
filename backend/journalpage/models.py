from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# https://stackoverflow.com/questions/34305805/foreignkey-user-in-models
# https://stackoverflow.com/questions/14663523/foreign-key-django-model
# https://stackoverflow.com/questions/74226432/django-call-variable-on-input-user-text

class JournalEntry(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    gratitude = models.TextField(blank=True, null=True)
    challenges = models.TextField(blank=True, null=True)
    pos_thoughts = models.TextField(blank=True, null=True)
    neg_thoughts = models.TextField(blank=True, null=True)

    class Mood(models.IntegerChoices):
        VERY_SAD = 1, 'Very Sad'
        SAD = 2, 'Sad'
        NEUTRAL = 3, 'Neutral'
        HAPPY = 4, 'Happy'
        VERY_HAPPY = 5, 'Very Happy'
        
    mood = models.IntegerField(choices=Mood.choices, default=Mood.NEUTRAL)
class Meta:
    ordering = ['-date']