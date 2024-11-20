from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests


@csrf_exempt
def get_track(request, id):
    if request.method == "GET":
        auth_header = request.headers.get("Authorization")

        session = requests.Session()
        headers = {
            "Authorization": auth_header,
            "Content-Type": "application/json",
        }

        resp = session.get(f"https://api.spotify.com/v1/tracks/{id}", headers=headers)

        try:
            data = resp.json()
        except requests.exceptions.JSONDecodeError:
            return JsonResponse({"error": "Failed to get track."})

        if "error" in data:
            return JsonResponse({"error": data["error"]}, status=401)

        return JsonResponse(data, status=200)
    else:
        return HttpResponse("Invalid Request Method")
