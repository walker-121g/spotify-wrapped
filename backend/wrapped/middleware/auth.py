from django.http import HttpResponse
import requests

unauthorizedResponse = HttpResponse(
    "You are not authorized to access this resource, please sign in and try again",
    status=401,
)


def get_email_from_token(access_token):
    headers = {"Authorization": f"Bearer {access_token}"}

    response = requests.get("https://api.spotify.com/v1/me", headers=headers)

    if response.status_code == 200:
        body = response.json()
        return body["email"], None
    else:
        return None, "Invalid token"


class AuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if (
            request.path.startswith("/api/")
            and not request.path.startswith("/api/auth/begin")
            and not request.path.startswith("/api/auth/redirect")
            and not request.path.startswith("/api/auth/token")
            and not request.path.startswith("/api/feedback/create")
        ):
            auth_header = request.headers.get("Authorization")

            if auth_header and auth_header.startswith("Bearer "):
                if not auth_header.split(" ")[1]:
                    return unauthorizedResponse
                else:
                    access_token = auth_header.split(" ")[1]
                    email, err = get_email_from_token(access_token)
                    if err or not email:
                        return unauthorizedResponse
                    else:
                        request.user_email = email
                        return self.get_response(request)
        else:
            return self.get_response(request)

        return unauthorizedResponse
