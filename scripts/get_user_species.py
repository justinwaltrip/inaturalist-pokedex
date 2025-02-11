"""Get unique species observed by a user.

Given zero to many of following parameters, returns observations matching the search criteria. The large size of the observations index prevents us from supporting the page parameter when retrieving records from large result sets. If you need to retrieve large numbers of records, use the per_page and id_above or id_below parameters instead.
"""

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
