from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import random

def generate_options(correct_answer, test_bank):
    if len(test_bank) < 4:
        return ["cannot create options"]

    options = [correct_answer] 

    while len(options) < 4:
        choice = random.choice(test_bank)
        if choice not in options:
            coin_flip = random.randint(0, 1) #randomizes options
            if coin_flip == 0:
                options.append(choice)
            else:
                options.insert(0, choice)

    return options



@csrf_exempt
def get_clip_quiz(request):
    if request.method == "GET":
        auth_header = request.headers.get("Authorization")

        session = requests.Session()
        headers = {
            "Authorization": auth_header,
            "Content-Type": "application/json",
        }

        resp = session.get("https://api.spotify.com/v1/me/tracks", headers=headers)

        try:
            data = resp.json()
        except requests.exceptions.JSONDecodeError:
            return JsonResponse({"error": "Failed to create user quiz."})

        if "error" in data:
            return JsonResponse({"error": data["error"]}, status=401)

        if (len(data["items"]) < 4): 
            return JsonResponse({"error": "You do not have enough saved tracks to create a quiz. The minimum required is 5."})

        response = {}
        questions = [] 
        test_bank = []

        for item in data["items"]:
            track = item["track"]
            question = {}

            

            question["name"] = track["name"]
            question["clip_url"] = track["preview_url"] 
            question["options"] = generate_options(question["name"], data["items"])

            if question["clip_url"] is not None:
                questions.append(question)
                test_bank.append(question["name"])

        for question in questions:
            options = generate_options(question["name"], test_bank)
            question["options"] = options
                


        response["questions"] = questions

        return JsonResponse(response, status=200)
    else:
        return HttpResponse("Invalid Request Method")
