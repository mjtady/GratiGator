from rest_framework import serializers
from .models import JournalEntry

class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = ['id', 'user', 'date', 'gratitude', 'challenges', 'pos_thoughts', 'neg_thoughts', 'mood']
        read_only_fields = ['id', 'user', 'date'] #  sets the id, user, and data automatically