from django.urls import path, re_path
from .views import begin_auth, handle_auth_callback
from .views import get_tokens, get_user, logout, index

urlpatterns = [
    path(
        "api/auth/begin",
        begin_auth,
        name="begin_auth",
    ),
    path(
        "api/auth/redirect",
        handle_auth_callback,
        name="handle_auth_redirect",
    ),
    path(
        "api/auth/token",
        get_tokens,
        name="get_tokens",
    ),
    path(
        "api/auth/me",
        get_user,
        name="get_user",
    ),
    path(
        "api/auth/logout",
        logout,
        name="logout",
    ),
    re_path(r'^(?!static/|api/).*$', index, name="index"),
]
