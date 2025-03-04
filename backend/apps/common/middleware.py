# backend/apps/common/middleware.py
import json
import os
from django.conf import settings

class ViteMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Essayer de charger le manifest.json
        try:
            manifest_path = os.path.join(settings.STATICFILES_DIRS[0], 'manifest.json')
            with open(manifest_path, 'r') as f:
                manifest = json.load(f)
                request.manifest = manifest
        except (FileNotFoundError, KeyError, json.JSONDecodeError):
            request.manifest = None

        response = self.get_response(request)
        return response