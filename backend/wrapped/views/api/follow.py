import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.db import transaction
from wrapped.models import User, Follow


@csrf_exempt
def get_following(request):
    if request.method == "GET":
        email = request.user_email

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return HttpResponse("User not found", status=404)

        following = Follow.objects.filter(follower=user).prefetch_related('following').all()
        following_data = []

        for follow in following:
            following_data.append({
                'id': follow.id,
                'following': {
                    'id': follow.following.id,
                    'email': follow.following.email,
                    'name': follow.following.name,
                    'created_at': follow.following.created_at
                },
                'created_at': follow.created_at
            })

        return JsonResponse(list(following_data), safe=False, status=200)
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def follow(request):
    if request.method == "POST":
        email = request.user_email
        data = json.loads(request.body)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return HttpResponse("User not found", status=404)

        try:
            following = User.objects.get(email=data['following'])
        except User.DoesNotExist:
            return HttpResponse("Following user not found", status=404)

        try:
            with transaction.atomic():
                follow = Follow(follower=user, following=following)
                follow.save()
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

        return JsonResponse({'success': True}, status=200)
    else:
        if request.method == "DELETE":
            email = request.user_email
            data = json.loads(request.body)

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return HttpResponse("User not found", status=404)

            try:
                following = User.objects.get(email=data['following'])
            except User.DoesNotExist:
                return HttpResponse("Following user not found", status=404)

            try:
                with transaction.atomic():
                    follow = Follow.objects.get(follower=user, following=following)
                    follow.delete()
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=400)

            return JsonResponse({'success': True}, status=200)
        else:
            return HttpResponse("Invalid request method")
