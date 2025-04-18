from rest_framework import serializers
from .models import JournalEntry
from django.contrib.auth.models import User

class JournalSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False  # allows the field to be omitted in input
    )
    class Meta:
        model = JournalEntry
        fields = ['id', 'user', 'date', 'gratitude', 'challenges', 'pos_thoughts', 'neg_thoughts', 'mood']
        read_only_fields = ['id', 'date'] #  sets the id, user, and data automatically