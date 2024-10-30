from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse, HttpResponseServerError
from django.shortcuts import redirect
from wrapped.models import User
import requests
import random
import string
import os
import base64
from datetime import datetime

SPOTIFY_CLIENT_ID = os.environ.get("SPOTIFY_CLIENT_ID")
SPOTIFY_REDIRECT_URI = os.environ.get("SPOTIFY_REDIRECT_URI")
SPOTIFY_CLIENT_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET")
FRONTEND_URL = os.environ.get("FRONTEND_URL")


@csrf_exempt
def begin_auth(request):
    if request.method == "GET":
        scope = "user-read-private user-read-email user-top-read user-read-recently-played playlist-read-private playlist-read-collaborative user-library-read user-read-playback-position user-read-playback-state"
        state = "".join(
            random.choice(string.ascii_uppercase + string.digits) for _ in range(20)
        )

        url = "https://accounts.spotify.com/authorize?"
        url = url + f"client_id={SPOTIFY_CLIENT_ID}&response_type=code"
        url = url + f"&redirect_uri={SPOTIFY_REDIRECT_URI}"
        url = url + f"&scope={scope}&state={state}"
        return redirect(url)
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def handle_auth_callback(request):
    grant_type = "authorization_code"
    authValue = base64.b64encode(
        f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode("utf-8")
    )

    if request.method == "GET":
        error = request.GET.get("error")
        if error:
            return redirect(f"{FRONTEND_URL}/login?error={error}")

        code = request.GET.get("code")
        if not code:
            return redirect(f"{FRONTEND_URL}login?error=no_code")

        headers = {
            "Authorization": f"Basic {authValue.decode('utf-8')}",
            "Content-Type": "application/x-www-form-urlencoded",
        }
        payload = {
            "grant_type": grant_type,
            "code": code,
            "redirect_uri": SPOTIFY_REDIRECT_URI,
        }

        session = requests.Session()
        resp = session.post(
            "https://accounts.spotify.com/api/token", headers=headers, data=payload
        )

        data = resp.json()
        if "error" in data:
            return redirect(f"{FRONTEND_URL}/login?error={data['error']}")

        access_token = data["access_token"]
        refresh_token = data["refresh_token"]
        scope = data["scope"]

        print(f"Granted scopes = {scope}")

        # set refresh token in http only cookie
        response = HttpResponse(status=302)
        response.set_cookie(
            "x-wrapped-token",
            refresh_token,
            max_age=60 * 60 * 24 * 7,
            httponly=True,
            path="/",
            samesite="None",
            secure=True,  # most browsers accept the Secure cookie on localhost so no need to change for dev
        )

        response["Location"] = f"{FRONTEND_URL}/login?token={access_token}"
        return response
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def get_tokens(request):
    if request.method == "GET":
        refresh_token = request.COOKIES.get("x-wrapped-token")
        if not refresh_token:
            return JsonResponse({"error": "unauthorized"}, status=401)

        authValue = base64.b64encode(
            f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode("utf-8")
        )

        session = requests.Session()
        headers = {
            "Authorization": f"Basic {authValue.decode('utf-8')}",
            "Content-Type": "application/x-www-form-urlencoded",
        }
        payload = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
        }

        resp = session.post(
            "https://accounts.spotify.com/api/token", headers=headers, data=payload
        )

        data = resp.json()
        if "error" in data:
            return JsonResponse({"error": data["error"]}, status=401)

        access_token = data["access_token"]

        return JsonResponse({"access_token": access_token})
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def get_user(request):
    if request.method == "GET":
        auth_header = request.headers.get("Authorization")

        session = requests.Session()
        headers = {
            "Authorization": auth_header,
            "Content-Type": "application/json",
        }

        resp = session.get("https://api.spotify.com/v1/me", headers=headers)
        try:
            data = resp.json()
        except:
            return JsonResponse(
                {"error": "Failed to retrieve current user"}, status=resp.status_code
            )

        if "error" in data:
            return JsonResponse({"error": data["error"]}, status=401)

        try:
            databaseUser = User.objects.get(email=data["email"])
        except User.DoesNotExist:
            databaseUser = None
            pass

        if not databaseUser:
            databaseUser = User(email=data["email"], name=data["display_name"])
            databaseUser.save()

        return JsonResponse(data, status=200)
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def logout(request):
    if request.method == "GET":
        response = JsonResponse({"success": True}, status=200)
        response.set_cookie(
            "x-wrapped-token",
            "",
            max_age=0,
            httponly=True,
            path="/",
            samesite="None",
            secure=True,  # most browsers accept the Secure cookie on localhost so no need to change for dev
        )
        return response
    else:
        return HttpResponse("Invalid request method")
