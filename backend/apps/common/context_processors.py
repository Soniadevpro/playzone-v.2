# backend/apps/common/context_processors.py
def vite_manifest(request):
    return {
        'manifest': getattr(request, 'manifest', None)
    }