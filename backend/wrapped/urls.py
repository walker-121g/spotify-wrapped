from django.urls import path, re_path
from wrapped.views.api.auth import begin_auth, handle_auth_callback, get_tokens, get_user, logout, delete_account
from wrapped.views.api.wraps import get_wraps, get_shared_wraps, create_wrap, accept_wrap, decline_wrap, preview_wrap
from wrapped.views.api.feedback import create_feedback
from wrapped.views.api.album import get_user_albums, get_album, get_albums, get_album_tracks
from wrapped.views.api.album import check_if_saved, save_albums, delete_albums
from wrapped.views.api.artists import get_artist, get_artists, get_artist_albums
from wrapped.views.api.artists import get_related_artists, get_top_tracks
from wrapped.views.api.follow import get_following, follow
from wrapped.views.api.post import get_posts, get_following_posts, create_post, delete_post, like, comment
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
    path(
        "api/me/albums",
        get_user_albums,
        name="get_user_albums"
    ),
    path(
        "api/albums/<str:id>",
        get_album,
        name="get_album"
    ),
    path(
        "api/albums",
        get_albums,
        name="get_albums"
    ),
    path(
        "api/albums/<str:id>/tracks",
        get_album_tracks,
        name="get_album_tracks"
    ),
    path(
        "api/me/albums",
        save_albums,
        name="save_albums"
    ),
    path(
        "api/me/albums",
        delete_albums,
        name="delete_albums"
    ),
    path(
        "api/me/albums/contains",
        check_if_saved,
        name="check_if_saved"
    ),
    path(
        "api/artists/<str:id>",
        get_artist,
        name="get_artist"
    ),
    path(
        "api/artists",
        get_artists,
        name="get_artists"
    ),
    path(
        "api/artists/<str:id>/albums",
        get_artist_albums,
        name="get_artist_albums"
    ),
    path(
        "api/artists/<str:id>/top-tracks",
        get_top_tracks,
        name="get_top_tracks"
    ),
    path(
        "api/artists/<str:id>/related-artists",
        get_related_artists,
        name="get_related_artists"
    ),
    path(
        "api/following",
        get_following,
        name="get_following",
    ),
    path(
        "api/following/edit",
        follow,
        name="follow",
    ),
    path(
        "api/posts",
        get_posts,
        name="get_posts",
    ),
    path(
        "api/posts/following",
        get_following_posts,
        name="get_following_posts",
    ),
    path(
        "api/posts/create",
        create_post,
        name="create_post",
    ),
    path(
        "api/posts/delete",
        delete_post,
        name="delete_post",
    )
    path(
        "api/posts/like",
        like,
        name="like",
    ),
    path(
        "api/posts/comment",
        comment,
        name="comment",
    ),
    re_path(r'^(?!static/|api/).*$', index, name="index"),
]
