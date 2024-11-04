from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse


@csrf_exempt
def get_wraps(request):
    if request.method == "GET":
        print("abc")
    else:
        return HttpResponse("Invalid request method")
