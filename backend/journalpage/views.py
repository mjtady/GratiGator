from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import JournalEntry
from .serializers import JournalSerializer
from django.utils import timezone
from django.contrib.auth.models import User

# Create your views here.
# https://stackoverflow.com/questions/74226432/django-call-variable-on-input-user-text

#https://www.django-rest-framework.org/api-guide/views/
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def journal_entries(request):
    # handles when to get/receive user data from the database
    if request.method == 'GET':
        entries = JournalEntry.objects.filter(user=request.user)
        serializer = JournalSerializer(entries, many=True)
        return Response(serializer.data)
    # handles when to put/submit the user data into the data base
    elif request.method == 'POST':
        print("Headers:", request.headers)
    print("User:", request.user)
    print("Data:", request.data)

    serializer = JournalSerializer(data=request.data)
    if serializer.is_valid():
        # save initial data
        entry = serializer.save(user=request.user, date=timezone.now().date())

        # refetch from DB to get any post-save trigger changes
        refreshed_entry = JournalEntry.objects.get(pk=entry.pk)
        refreshed_serializer = JournalSerializer(refreshed_entry)

        return Response(refreshed_serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   # this authenticates if the current user is already an existing user 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        'username': user.username,
        'email': user.email
    })
