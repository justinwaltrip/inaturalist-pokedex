"""Get unique species observed by a user."""

import requests

species = set()
page = 1
while True:
    url = f"https://api.inaturalist.org/v1/observations?user_id=jwaltrip&order=desc&order_by=created_at&per_page=200&page={page}"
    response = requests.get(url)
    data = response.json()
    observations = data["results"]
    if not observations:
        break
    for observation in observations:
        species.add(observation["species_guess"])
    page += 1

print(species)
