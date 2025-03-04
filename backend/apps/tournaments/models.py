# backend/apps/tournaments/models.py
from django.db import models
from django.conf import settings

class Tournament(models.Model):
    LOCATION_CHOICES = (
        ('online', 'En ligne'),
        ('local', 'En local'),
    )
    STATUS_CHOICES = (
        ('open', 'Inscription ouverte'),
        ('full', 'Complet'),
        ('ongoing', 'En cours'),
        ('ended', 'Terminé'),
    )
    
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='organized_tournaments')
    game = models.CharField(max_length=100)
    date = models.DateTimeField()
    max_players = models.PositiveIntegerField()
    description = models.TextField()
    entry_fee = models.DecimalField(max_digits=8, decimal_places=2)
    prize = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=10, choices=LOCATION_CHOICES, default='online')
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    platform = models.CharField(max_length=100, blank=True, null=True)
    requirements = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.game} - {self.date.strftime('%d/%m/%Y')}"
    
    @property
    def player_count(self):
        return self.participants.count()

class Participant(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='participants')
    player = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tournaments')
    registered_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('tournament', 'player')
    
    def __str__(self):
        return f"{self.player.username} - {self.tournament.game}"