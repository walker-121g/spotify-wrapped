import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.db import transaction
from wrapped.models import User, Follow, Post, Like, Comment, Wrap, WrapUser


@csrf_exempt
def get_posts(request):
    if request.method == "GET":
        email = request.user_email
        page = int(request.GET.get('page', 1))

        try:
            User.objects.get(email=email)
        except User.DoesNotExist:
            return HttpResponse("User not found", status=404)

        posts = Post.objects.order_by('-created_at').all()
        posts = posts[(page) * 10:(page + 1) * 10]
        posts_data = []

        for post in posts:
            likes = Like.objects.filter(post=post).count()
            comments = Comment.objects.filter(post=post).count()
            author = post.user

            posts_data.append({
                'id': post.id,
                'title': post.title,
                'content': post.content,
                'likes': likes,
                'comments': comments,
                'created_at': post.created_at,
                'user': {
                    'id': author.id,
                    'name': author.name,
                    'email': author.email
                }
            })

        return JsonResponse(list(posts_data), safe=False, status=200)
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def get_following_posts(request):
    if request.method == "GET":
        email = request.user_email
        page = int(request.GET.get('page', 1))

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return HttpResponse("User not found", status=404)

        following = Follow.objects.filter(follower=user).all()
        following = [f.following for f in following]

        posts = Post.objects.filter(user__in=following).order_by('-created_at').all()
        posts = posts[(page) * 10:(page + 1) * 10]
        posts_data = []

        for post in posts:
            likes = Like.objects.filter(post=post).count()
            comments = Comment.objects.filter(post=post).count()
            author = post.user

            posts_data.append({
                'id': post.id,
                'title': post.title,
                'content': post.content,
                'likes': likes,
                'comments': comments,
                'created_at': post.created_at,
                'user': {
                    'id': author.id,
                    'name': author.name,
                    'email': author.email
                }
            })

        return JsonResponse(list(posts_data), safe=False, status=200)
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def create_post(request):
    if request.method == "POST":
        email = request.user_email
        data = json.loads(request.body)

        try:
            user = User.objects.get(email=email)
            wrap = Wrap.objects.get(id=data['wrap_id'])
            WrapUser.objects.get(wrap=wrap, user=user)
        except User.DoesNotExist:
            return HttpResponse("User not found", status=404)
        except Wrap.DoesNotExist:
            return HttpResponse("Wrap not found", status=404)
        except WrapUser.DoesNotExist:
            return HttpResponse("User not in wrap", status=400)

        try:
            with transaction.atomic():
                post = Post(user=user, title=data['title'], content=data['content'], wrap=wrap)
                post.save()
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

        return JsonResponse({'success': True}, status=200)
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def delete_post(request):
    if request.method == "POST":
        email = request.user_email
        data = json.loads(request.body)

        try:
            user = User.objects.get(email=email)
            post = Post.objects.get(id=data['id'])
        except User.DoesNotExist:
            return HttpResponse("User not found", status=404)
        except Post.DoesNotExist:
            return HttpResponse("Post not found", status=404)

        if post.user != user:
            return HttpResponse("Unauthorized", status=401)

        try:
            with transaction.atomic():
                post.delete()
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

        return JsonResponse({'success': True}, status=200)
    else:
        return HttpResponse("Invalid request method")


@csrf_exempt
def like(request):
    if request.method == "GET":
        email = request.user_email
        post_id = request.GET.get('id')

        try:
            user = User.objects.get(email=email)
            post = Post.objects.get(id=post_id)
        except User.DoesNotExist:
            return HttpResponse("User not found", status=404)
        except Post.DoesNotExist:
            return HttpResponse("Post not found", status=404)

        try:
            like = Like.objects.get(user=user, post=post)
            return JsonResponse({'success': True}, status=200)
        except Like.DoesNotExist:
            return JsonResponse({'success': False}, status=200)
    else:
        if request.method == "POST":
            email = request.user_email
            data = json.loads(request.body)

            try:
                user = User.objects.get(email=email)
                post = Post.objects.get(id=data['id'])
            except User.DoesNotExist:
                return HttpResponse("User not found", status=404)
            except Post.DoesNotExist:
                return HttpResponse("Post not found", status=404)

            try:
                like = Like.objects.get(user=user, post=post)
                return JsonResponse({'success': True}, status=200)
            except Like.DoesNotExist:
                pass

            try:
                with transaction.atomic():
                    like = Like(user=user, post=post)
                    like.save()
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=400)

            return JsonResponse({'success': True}, status=200)
        else:
            if request.method == "DELETE":
                email = request.user_email
                data = json.loads(request.body)

                try:
                    user = User.objects.get(email=email)
                    post = Post.objects.get(id=data['id'])
                except User.DoesNotExist:
                    return HttpResponse("User not found", status=404)
                except Post.DoesNotExist:
                    return HttpResponse("Post not found", status=404)

                try:
                    like = Like.objects.get(user=user, post=post)
                except Like.DoesNotExist:
                    return HttpResponse("Like not found", status=404)

                try:
                    with transaction.atomic():
                        like.delete()
                except Exception as e:
                    return JsonResponse({'error': str(e)}, status=400)

                return JsonResponse({'success': True}, status=200)
            else:
                return HttpResponse("Invalid request method")


@csrf_exempt
def comment(request):
    if request.method == "POST":
        email = request.user_email
        data = json.loads(request.body)

        try:
            user = User.objects.get(email=email)
            post = Post.objects.get(id=data['id'])
        except User.DoesNotExist:
            return HttpResponse("User not found", status=404)
        except Post.DoesNotExist:
            return HttpResponse("Post not found", status=404)

        try:
            with transaction.atomic():
                comment = Comment(user=user, post=post, content=data['content'])
                comment.save()
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

        return JsonResponse({'success': True}, status=200)
    else:
        if request.method == "DELETE":
            email = request.user_email
            data = json.loads(request.body)

            try:
                user = User.objects.get(email=email)
                comment = Comment.objects.get(id=data['id'])
            except User.DoesNotExist:
                return HttpResponse("User not found", status=404)
            except Comment.DoesNotExist:
                return HttpResponse("Comment not found", status=404)

            if comment.user != user:
                return HttpResponse("Unauthorized", status=401)

            try:
                with transaction.atomic():
                    comment.delete()
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=400)

            return JsonResponse({'success': True}, status=200)
        else:
            return HttpResponse("Invalid request method")
