import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from wrapped.models import User, Feedback


@csrf_exempt
def create_wrap(request):
    if request.method == "POST":
        data = json.loads(request.body)

        try:
            feedback = Feedback(email=data["email"], content=data["content"])
            feedback.save()
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

        return JsonResponse({"success": True}, status=200)
    else:
        return HttpResponse("Invalid request method")
