import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.db import transaction
from wrapped.models import User, Wrap, WrapUser, WrapArtist, WrapTrack
from wrapped.utils.spotify.users import get_top_tracks, get_top_artists


@csrf_exempt
def get_wrap(request):
    if request.method == "GET":
        id = request.GET.get("id")

        wrap = (
            Wrap.objects.filter(id=id)
            .prefetch_related(
                "wrapuser_set__user",
                "wrapartist_set",
                "wraptrack_set")
            .distinct()
        )

        if len(wrap) == 0:
            return HttpResponse("Wrap not found")

        wrap_data = {
            "id": wrap[0].id,
            "name": wrap[0].name,
            "period": wrap[0].time_period,
            "track_count": wrap[0].track_count,
            "artist_count": wrap[0].artist_count,
            "users": [
                {
                    "email": wrap_user.user.email,
                    "name": wrap_user.user.name,
                    "owner": wrap_user.owner,
                    "accepted": wrap_user.accepted,
                }
                for wrap_user in wrap[0].wrapuser_set.all()
            ],
            "artists": [
                {
                    "id": artist.id,
                    "artist": artist.artist,
                    "listen_time": artist.listen_time,
                    "user": {
                        "id": artist.user.id,
                        "email": artist.user.email,
                        "name": artist.user.name,
                    }
                }
                for artist in wrap[0].wrapartist_set.all()
            ],
            "tracks": [
                {
                    "id": track.id,
                    "track": track.track,
                    "listen_time": track.listen_time,
                    "user": {
                        "id": track.user.id,
                        "email": track.user.email,
                        "name": track.user.name,
                    }
                }
                for track in wrap[0].wraptrack_set.all()
            ],
            "created_at": wrap[0].created_at,
        }

        return JsonResponse(wrap_data, safe=False, status=200)
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def get_wraps(request):
    if request.method == "GET":
        email = request.user_email

        user = User.objects.get(email=email)
        wraps = (
            Wrap.objects.filter(wrapuser__user=user, wrapuser__owner=True)
            .prefetch_related(
                "wrapuser_set__user",
                "wrapartist_set",
                "wraptrack_set")
            .distinct()
        )

        wraps_data = []
        for wrap in wraps:
            wraps_data.append(
                {
                    "id": wrap.id,
                    "name": wrap.name,
                    "period": wrap.time_period,
                    "track_count": wrap.track_count,
                    "artist_count": wrap.artist_count,
                    "users": [
                        {
                            "email": wrap_user.user.email,
                            "name": wrap_user.user.name,
                            "owner": wrap_user.owner,
                            "accepted": wrap_user.accepted,
                        }
                        for wrap_user in wrap.wrapuser_set.all()
                    ],
                    "artists": [
                        {
                            "id": artist.id,
                            "artist": artist.artist,
                            "listen_time": artist.listen_time,
                        }
                        for artist in wrap.wrapartist_set.all()
                    ],
                    "tracks": [
                        {
                            "id": track.id,
                            "track": track.track,
                            "listen_time": track.listen_time,
                        }
                        for track in wrap.wraptrack_set.all()
                    ],
                    "created_at": wrap.created_at,
                }
            )

        return JsonResponse(list(wraps_data), safe=False, status=200)
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def get_shared_wraps(request):
    if request.method == "GET":
        email = request.user_email

        user = User.objects.get(email=email)
        wraps = (
            Wrap.objects.filter(wrapuser__user=user, wrapuser__owner=False)
            .prefetch_related(
                "wrapuser_set__user",
                "wrapartist_set",
                "wraptrack_set")
            .distinct()
        )

        wraps_data = []
        for wrap in wraps:
            wraps_data.append(
                {
                    "id": wrap.id,
                    "name": wrap.name,
                    "period": wrap.time_period,
                    "track_count": wrap.track_count,
                    "artist_count": wrap.artist_count,
                    "users": [
                        {
                            "email": wrap_user.user.email,
                            "name": wrap_user.user.name,
                            "owner": wrap_user.owner,
                            "accepted": wrap_user.accepted,
                        }
                        for wrap_user in wrap.wrapuser_set.all()
                    ],
                    "artists": [
                        {
                            "id": artist.id,
                            "artist": artist.artist,
                            "listen_time": artist.listen_time,
                        }
                        for artist in wrap.wrapartist_set.all()
                    ],
                    "tracks": [
                        {
                            "id": track.id,
                            "track": track.track,
                            "listen_time": track.listen_time,
                        }
                        for track in wrap.wraptrack_set.all()
                    ],
                    "created_at": wrap.created_at,
                }
            )

        return JsonResponse(list(wraps_data), safe=False, status=200)
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def create_wrap(request):
    if request.method == "POST":
        email = request.user_email
        data = json.loads(request.body)
        auth_header = request.headers.get("Authorization")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=400)

        try:
            with transaction.atomic():
                wrap = Wrap(name=data["name"], time_period=data["period"])
                wrap.save()

                wrap_user = WrapUser(user=user, wrap=wrap, owner=True, accepted=True)
                wrap_user.save()

                for invite in data["users"]:
                    invite_user = User.objects.get(email=invite)
                    wrap_invite = WrapUser(
                        user=invite_user, wrap=wrap, owner=False, accepted=False
                    )
                    wrap_invite.save()

                top_tracks = get_top_tracks(data["period"], auth_header)
                top_artists = get_top_artists(data["period"], auth_header)

                wrap.track_count = len(top_tracks)
                wrap.artist_count = len(top_artists)
                wrap.save()

                for artist in top_artists[:20]:
                    wrap_artist = WrapArtist(
                        artist=artist["id"], user=user, wrap=wrap, listen_time=0
                    )
                    wrap_artist.save()

                for track in top_tracks[:100]:
                    wrap_track = WrapTrack(track=track["id"], user=user, wrap=wrap, listen_time=0)
                    wrap_track.save()
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

        return JsonResponse({"success": True}, status=200)
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def delete_wrap(request):
    if request.method == "POST":
        email = request.user_email
        data = json.loads(request.body)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=400)

        try:
            wrap = Wrap.objects.get(id=data["id"])
        except Wrap.DoesNotExist:
            return JsonResponse({"error": "Wrap does not exist"}, status=400)

        try:
            wrap_user = WrapUser.objects.get(user=user, wrap=wrap)
            if wrap_user.accepted:
                wrap.delete()
        except WrapUser.DoesNotExist:
            return JsonResponse({"error": "User is not part of the wrap"}, status=400)

        return JsonResponse({"success": True}, status=200)
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def accept_wrap(request):
    if request.method == "POST":
        email = request.user_email
        auth_header = request.headers.get("Authorization")
        data = json.loads(request.body)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=400)

        try:
            wrap = Wrap.objects.get(id=data["wrap_id"])
        except Wrap.DoesNotExist:
            return JsonResponse({"error": "Wrap does not exist"}, status=400)

        try:
            wrap_user = WrapUser.objects.get(user=user, wrap=wrap)
            wrap_user.accepted = True
            wrap_user.save()
        except WrapUser.DoesNotExist:
            return JsonResponse({"error": "User is not part of the wrap"}, status=400)

        top_tracks = get_top_tracks(wrap.time_period, auth_header)
        top_artists = get_top_artists(wrap.time_period, auth_header)

        wrap.track_count += len(top_tracks)
        wrap.artist_count += len(top_artists)
        wrap.save()

        for artist in top_artists[:20]:
            wrap_artist = WrapArtist(artist=artist["id"], user=user, wrap=wrap, listen_time=0)
            wrap_artist.save()

        for track in top_tracks[:100]:
            wrap_track = WrapTrack(track=track["id"], user=user, wrap=wrap, listen_time=0)
            wrap_track.save()

        return JsonResponse({"success": True}, status=200)
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def decline_wrap(request):
    if request.method == "POST":
        email = request.user_email
        data = json.loads(request.body)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=400)

        try:
            wrap = Wrap.objects.get(id=data["wrap_id"])
        except Wrap.DoesNotExist:
            return JsonResponse({"error": "Wrap does not exist"}, status=400)

        try:
            wrap_user = WrapUser.objects.get(user=user, wrap=wrap)
            if not wrap_user["owner"] and not wrap_user["accepted"]:
                wrap.delete()
            else:
                return JsonResponse(
                    {"error": "User is the owner of the wrap or has already accepted"},
                    status=400,
                )
        except WrapUser.DoesNotExist:
            return JsonResponse({"error": "User is not part of the wrap"}, status=400)

        return JsonResponse({"success": True}, status=200)
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def preview_wrap(request):
    if request.method == "GET":
        period = request.GET.get("period")
        auth_header = request.headers.get("Authorization")

        top_tracks = get_top_tracks(period, auth_header)
        top_artists = get_top_artists(period, auth_header)

        return JsonResponse(
            {"tracks": top_tracks, "artists": top_artists}, status=200, safe=False
        )
    else:
        return HttpResponse("Invalid request method")
