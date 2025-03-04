# Dans apps/accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('player', 'Joueur'),
        ('organizer', 'Organisateur'),
    )
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='player')
    profile_image = models.ImageField(upload_to='profiles/', blank=True, null=True)

    def __str__(self):
        return self.username