from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import JournalEntry
from .serializers import JournalSerializer

# Create your views here.
# https://stackoverflow.com/questions/74226432/django-call-variable-on-input-user-text

#https://www.django-rest-framework.org/api-guide/views/
@api_view(['GET','POST'])
@permission_classes()[IsAuthenticated]
def journal_entries(request):
    if request.method == 'GET':
        entries = JournalEntry.objects.filter(user=request.user)
        serializer = JournalSerializer(entries, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = JournalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user) # links entry to the logged in user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)