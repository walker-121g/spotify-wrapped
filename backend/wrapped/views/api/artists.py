from django.http import Http404, HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests


@csrf_exempt
def get_artist(request, id):
    if request.method == "GET":

        auth_header = request.headers.get("Authorization")

        session = requests.Session()
        headers = {
            "Authorization": auth_header,
            "Content-Type": "application/json",
        }

        resp = session.get(f"https://api.spotify.com/v1/artists/{id}", headers=headers)

        try:
            data = resp.json()
        except requests.exceptions.JSONDecodeError:
            return JsonResponse({"error": "Failed to get artist."})

        if "error" in data:
            return JsonResponse({"error": data["error"]}, status=401)

        return JsonResponse(data, status=200)
    else:
        return HttpResponse("Invalid Request Method")


@csrf_exempt
def get_artists(request):
    if request.method == "GET":

        auth_header = request.headers.get("Authorization")

        ids = request.GET.get("ids")

        session = requests.Session()
        headers = {
            "Authorization": auth_header,
            "Content-Type": "application/json",
        }

        resp = session.get(f"https://api.spotify.com/v1/artists?ids={ids}", headers=headers)

        try:
            data = resp.json()
        except requests.exceptions.JSONDecodeError:
            return JsonResponse({"error": "Failed to get artists."})

        if "error" in data:
            return JsonResponse({"error": data["error"]}, status=401)

        return JsonResponse(data, status=200)
    else:
        return HttpResponse("Invalid Request Method")


@csrf_exempt
def get_artist_albums(request, id):
    if request.method == "GET":

        auth_header = request.headers.get("Authorization")

        session = requests.Session()
        headers = {
            "Authorization": auth_header,
            "Content-Type": "application/json",
        }

        resp = session.get(f"https://api.spotify.com/v1/artists/{id}/albums", headers=headers)

        try:
            data = resp.json()
        except requests.exceptions.JSONDecodeError:
            return JsonResponse({"error": "Failed to get artist's albums."})

        if "error" in data:
            return JsonResponse({"error": data["error"]}, status=401)

        return JsonResponse(data, status=200)
    else:
        return HttpResponse("Invalid Request Method")


@csrf_exempt
def get_top_tracks(request, id):
    if request.method == "GET":

        auth_header = request.headers.get("Authorization")

        session = requests.Session()
        headers = {
            "Authorization": auth_header,
            "Content-Type": "application/json",
        }

        resp = session.get(f"https://api.spotify.com/v1/artists/{id}/top-tracks", headers=headers)

        try:
            data = resp.json()
        except requests.exceptions.JSONDecodeError:
            return JsonResponse({"error": "Failed to get artist's top tracks."})

        if "error" in data:
            return JsonResponse({"error": data["error"]}, status=401)

        return JsonResponse(data, status=200)
    else:
        return HttpResponse("Invalid Request Method")


@csrf_exempt
def get_related_artists(request, id):
    if request.method == "GET":

        auth_header = request.headers.get("Authorization")

        session = requests.Session()
        headers = {
            "Authorization": auth_header,
            "Content-Type": "application/json",
        }

        resp = session.get(f"https://api.spotify.com/v1/artists/{id}/related-artists", headers=headers)

        try:
            data = resp.json()
        except requests.exceptions.JSONDecodeError:
            return JsonResponse({"error": "Failed to get artist's related artists."})

        if "error" in data:
            return JsonResponse({"error": data["error"]}, status=401)

        return JsonResponse(data, status=200)
    else:
        return HttpResponse("Invalid Request Method")
