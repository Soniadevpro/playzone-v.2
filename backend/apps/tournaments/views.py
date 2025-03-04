# backend/apps/tournaments/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Tournament, Participant
from .serializers import TournamentSerializer, ParticipantSerializer

class IsOrganizerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.organizer == request.user

class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = [IsOrganizerOrReadOnly]
    
    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        tournament = self.get_object()
        
        # Vérifier si l'utilisateur est déjà inscrit
        if Participant.objects.filter(tournament=tournament, player=request.user).exists():
            return Response({"detail": "Vous êtes déjà inscrit à ce tournoi."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Vérifier si le tournoi est plein
        if tournament.participants.count() >= tournament.max_players:
            return Response({"detail": "Ce tournoi est complet."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Inscrire l'utilisateur
        Participant.objects.create(tournament=tournament, player=request.user)
        return Response({"detail": "Inscription réussie!"}, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['get'])
    def participants(self, request, pk=None):
        tournament = self.get_object()
        participants = tournament.participants.all()
        serializer = ParticipantSerializer(participants, many=True)
        return Response(serializer.data)