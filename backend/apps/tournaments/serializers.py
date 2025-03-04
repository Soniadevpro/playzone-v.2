# backend/apps/tournaments/serializers.py
from rest_framework import serializers
from .models import Tournament, Participant
from backend.apps.accounts.serializers import UserSerializer

class TournamentSerializer(serializers.ModelSerializer):
    player_count = serializers.IntegerField(read_only=True)
    organizer = UserSerializer(read_only=True)
    
    class Meta:
        model = Tournament
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'organizer', 'player_count']
    
    def create(self, validated_data):
        user = self.context['request'].user
        tournament = Tournament.objects.create(organizer=user, **validated_data)
        return tournament

class ParticipantSerializer(serializers.ModelSerializer):
    player = UserSerializer(read_only=True)
    
    class Meta:
        model = Participant
        fields = ['id', 'player', 'registered_at']
        read_only_fields = ['id', 'registered_at']