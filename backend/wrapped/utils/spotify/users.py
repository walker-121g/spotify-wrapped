from urllib import response
import requests

def get_current_profile(token):
	url = "https://api.spotify.com/v1/me"
	headers = {
		"Authorization": f"Bearer {token}"
	}

	response = requests.get(url, headers=headers)
	return response.json()

def get_top_artists(time_range, token, limit=10, offset=0):
	url = f"https://api.spotify.com/v1/me/top/artists?time_range={time_range}&limit={limit}&offset={offset}"
	headers = {
		"Authorization": f"Bearer {token}"
	}

	response = requests.get(url, headers=headers)
	body = response.json()
	if len(body.items) == 20:
		next = get_top_artists(time_range, token, limit, offset+20)
		body.items += next.items

	return body

def get_top_tracks(time_range, token, limit=10, offset=0):
	url = f"https://api.spotify.com/v1/me/top/tracks?time_range={time_range}&limit={limit}&offset={offset}"
	headers = {
		"Authorization": f"Bearer {token}"
	}

	response = requests.get(url, headers=headers)
	body = response.json()
	if len(body.items) == 20:
		next = get_top_tracks(time_range, token, limit, offset+20)
		body.items += next.items

	return body

def get_user_profile(user_id, token):
	url = f"https://api.spotify.com/v1/users/{user_id}"
	headers = {
		"Authorization": f"Bearer {token}"
	}

	response = requests.get(url, headers=headers)
	return response.json()

