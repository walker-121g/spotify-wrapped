from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests


@csrf_exempt
def get_user_quiz(request):
    if request.method == "GET":
        auth_header = request.headers.get("Authorization")

        session = requests.Session()
        headers = {
            "Authorization": auth_header,
            "Content-Type": "application/json",
        }

        resp = session.get("https://api.spotify.com/v1/me/tracks", headers=headers)

        try:
            data = resp.json()
        except requests.exceptions.JSONDecodeError:
            return JsonResponse({"error": "Failed to create user quiz."})

        if "error" in data:
            return JsonResponse({"error": data["error"]}, status=401)

        if (len(data["items"]) < 4): 
            return JsonResponse({"error": "You do not have enough saved tracks to create a quiz. The minimum required is 5."})

        response = {}

        song_clip_urls = []
        correct_answers = []
        for item in data["items"]:
            track = item["track"]
            song_clip_urls.append(track["preview_url"]) 
            correct_answers.append(track["name"])

        response["song_clip_urls"] = song_clip_urls
        response["correct_answers"] = correct_answers 

        return JsonResponse(response, status=200)
    else:
        return HttpResponse("Invalid Request Method")
