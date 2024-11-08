import requests


def get_current_profile(token):
    url = "https://api.spotify.com/v1/me"
    headers = {
        "Authorization": f"{token}"
    }

    response = requests.get(url, headers=headers)
    return response.json()


def get_top_artists(time_range, token, limit=10, offset=0):
    url = "https://api.spotify.com/v1/me/top/artists"
    url = url + f"?time_range={time_range}&limit={limit}&offset={offset}"

    headers = {
        "Authorization": f"{token}"
    }

    response = requests.get(url, headers=headers)
    body = response.json()
    if len(body["items"]) == limit:
        next = get_top_artists(time_range, token, limit, offset+20)
        body["items"] += next

    return body["items"]


def get_top_tracks(time_range, token, limit=10, offset=0):
    print(token)
    url = "https://api.spotify.com/v1/me/top/tracks"
    url = url + f"?time_range={time_range}&limit={limit}&offset={offset}"
    headers = {
        "Authorization": f"{token}"
    }

    response = requests.get(url, headers=headers)
    body = response.json()
    if len(body["items"]) == limit:
        next = get_top_tracks(time_range, token, limit, offset+20)
        body["items"] += next

    return body["items"]


def get_user_profile(user_id, token):
    url = f"https://api.spotify.com/v1/users/{user_id}"
    headers = {
        "Authorization": f"{token}"
    }

    response = requests.get(url, headers=headers)
    return response.json()
