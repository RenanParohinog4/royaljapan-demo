import os
import logging
from django.http import JsonResponse

def get_version():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    version_file = os.path.join(base_dir, "VERSION")
    
    try:
        with open(version_file) as f:
            return f.read().strip()
    except FileNotFoundError:
        return "unknown"


def healthz(request):
    return JsonResponse({
        "status": "ok",
        "version": get_version()
    })

