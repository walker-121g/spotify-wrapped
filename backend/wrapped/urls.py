from django.urls import path, re_path
from wrapped.views.api.auth import begin_auth, handle_auth_callback, get_tokens, get_user, logout, delete_account
from wrapped.views.api.wraps import get_wraps, get_shared_wraps, create_wrap, accept_wrap, decline_wrap, preview_wrap
from wrapped.views.api.feedback import create_feedback
from wrapped.views.frontend import index


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
    path(
        "api/auth/delete",
        delete_account,
        name="delete_account",
    ),
    path(
        "api/wraps",
        get_wraps,
        name="get_wraps",
    ),
    path(
        "api/wraps/shared",
        get_shared_wraps,
        name="get_shared_wraps",
    ),
    path(
        "api/wraps/create",
        create_wrap,
        name="create_wrap",
    ),
    path(
        "api/wraps/accept",
        accept_wrap,
        name="accept_wrap",
    ),
    path(
        "api/wraps/decline",
        decline_wrap,
        name="decline_wrap",
    ),
    path(
        "api/wraps/preview",
        preview_wrap,
        name="preview_wrap",
    ),
    path(
        "api/feedback/create",
        create_feedback,
        name="create_feedback",
    ),
    re_path(r'^(?!static/|api/).*$', index, name="index"),
]
