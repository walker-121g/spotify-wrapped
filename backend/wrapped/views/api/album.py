from django.http import HttpResponse, JsonResponse 
from django.views.decorators.csrf import csrf_exempt
from urllib.parse import urlparse
import requests

@csrf_exempt
def get_user_albums(request):
    if request.method == "GET":
        auth_header = request.headers.get("Authorization")

        limit = request.GET.get("limit") 
        offset = request.GET.get("offset")

        session = requests.Session()
        headers = {
            "Authorization": auth_header,
            "Content-Type": "application/json",
        }

        resp = session.get(f"https://api.spotify.com/v1/me/albums?limit={limit}&offset={offset}", headers=headers)

        try:
            data = resp.json()
        except:
            return JsonResponse(
                {"error": "Failed to get user albums."}, status=resp.status_code
            )

        if "error" in data:
            return JsonResponse({"error": data["error"]}, status=401)

        return JsonResponse(data, status=200)
    else:
        return HttpResponse("Invalid Request Method")

@csrf_exempt
def get_album(request):
    if request.method == "GET": 
        auth_header = request.headers.get("Authorization")


        parsed_url = urlparse(request.build_absolute_uri())
        id = parsed_url[-1]

        session = requests.Session()
        headers = {
            "Authorization": auth_header,
            "Content-Type": "application/json",
        }
        
        resp = session.get(f"https://api.spotify.com/v1/albums/{id}", headers=headers)

        try:
            data = resp.json()
        except:
            return JsonResponse(
                    {"error": "Failed to get album."}
            )
        
        if "error" in data:
            return JsonResponse({"error": data["error"]}, status=401)

        return JsonResponse(data, status=200)
    else:
        return HttpResponse("Invalid Request Method")

@csrf_exempt
def get_albums(request):
    if request.method == "GET":
        auth_header = request.headers.get("Authorization") 
        
        ids = request.GET.get("ids") 

        session = requests.Session()
        headers = {
                "Authorization": auth_header,
                "Content-Type": "application/json"
        }

        resp = session.get(f"https://api.spotify.com/v1/albums?ids={ids}", headers=headers)

        try: 
            data = resp.json()
        except:
            return JsonResponse(
                    {"error": "Failed to get albums"}
            )
                

        if "error" in data:
            return JsonResponse({"error": data["error"]}, status = 401)

        return JsonResponse(data, status=200)
    else:
        return HttpResponse("Invalid Request Method")

@csrf_exempt
def get_album_tracks(request):
    if request.method == "GET":
        auth_header = request.headers.get("Authorization") 
        
        parsed_url = urlparse(request.build_absolute_uri())
        id = parsed_url[-2]  

        session = requests.Session()
        headers = {
                "Authorization": auth_header,
                "Content-Type": "application/json"
        }

        resp = session.get(f"https://api.spotify.com/v1/albums/{id}/tracks", headers=headers)

        try:
            data = resp.json()
        except:
            return JsonResponse(
                    {"error": "Failed to get tracks"}
            )
                   
        if "error" in data:
            return JsonResponse({"error": data["error"]}, status = 401)

        return JsonResponse(data, status = 200)
    else:
        return HttpResponse("Invalid Request Method")

@csrf_exempt
def save_albums(request):
    if request.method == "PUT":
        auth_header = request.headers.get("Authorization") 
        
        ids = request.GET.get("ids")

        session = requests.Session()
        headers = {
                "Authorization": auth_header,
                "Content-Type": "application/json"
        }

        resp = session.put(f"https://api.spotify.com/v1/me/albums?ids={ids}", headers=headers)

        try:
            data = resp.json()
        except:
            return JsonResponse(
                    {"error": "Failed to save albums."}
            )

        if "error" in data:
            return JsonResponse({"error": data["error"]}, status = 401)

        return JsonResponse(data, status = 200)
    else:
        return HttpResponse("Invalid Request Method")

@csrf_exempt
def delete_albums(request):
    if request.method == "DELETE":
        auth_header = request.headers.get("Authorization") 
        
        ids = request.GET.get("ids")

        session = requests.Session()
        headers = {
                "Authorization": auth_header,
                "Content-Type": "application/json"
        }

        resp = session.delete(f"https://api.spotify.com/v1/me/albums?ids={ids}", headers=headers)

        try:
            data = resp.json()
        except:
            return JsonResponse(
                    {"error": "Failed to delete albums."}
            )

        if "error" in data:
            return JsonResponse({"error": data["error"]}, status = 401)

        return JsonResponse(data, status = 200)
    else:
        return HttpResponse("Invalid Request Method")

@csrf_exempt
def check_if_saved(request):
    if request.method == "GET":
        auth_header = request.headers.get("Authorization") 
        
        ids = request.GET.get("ids")

        session = requests.Session()
        headers = {
                "Authorization": auth_header,
                "Content-Type": "application/json"
        }

        resp = session.get(f"https://api.spotify.com/v1/me/contains?ids={ids}", headers=headers)

        try:
            data = resp.json()
        except:
            return JsonResponse(
                    {"error": "Failed to check for albums."}
            )

        if "error" in data:
            return JsonResponse({"error": data["error"]}, status = 401)

        return JsonResponse(data, status = 200)
    else:
        return HttpResponse("Invalid Request Method")

