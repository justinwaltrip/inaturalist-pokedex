"""Get unique locations where a user has observed species."""

import requests

locations = set()
page = 1
while True:
    url = f"https://api.inaturalist.org/v1/observations?user_id=jwaltrip&order=desc&order_by=created_at&per_page=200&page={page}"
    response = requests.get(url)
    data = response.json()
    observations = data["results"]
    if not observations:
        break
    for observation in observations:
        locations.add(observation["place_guess"])
    page += 1

print(locations)
