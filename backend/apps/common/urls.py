# backend/apps/common/urls.py
from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    # Cette vue servira le fichier index.html de React
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
]