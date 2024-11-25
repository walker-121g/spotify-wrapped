import os
import json
import google.generativeai as genai
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)


@csrf_exempt
def create_story(request):
    if request.method == "POST":
        model = genai.GenerativeModel("gemini-1.5-flash")
        data = json.loads(request.body)
        prompt = data["prompt"]

        resp = model.generate_content(prompt)
        return JsonResponse(resp.text, safe=False, status=200)
    else:
        return HttpResponse("Invalid Request Method")
