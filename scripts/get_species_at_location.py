"""Get unique species observed at a location within the last 30 days.

d1: Must be observed on or after this date
"""

import requests
import datetime

LOCATION = "Key Largo, Key Largo, FL, US"
TAXA = "47178"  # Ray-finned Fishes
LAST_30_DAYS = datetime.datetime.now() - datetime.timedelta(days=30)

species = set()
page = 1
while True:
    url = f"https://api.inaturalist.org/v1/observations?place_guess={LOCATION}&taxon_id={TAXA}&d1={LAST_30_DAYS}&order=desc&order_by=created_at&per_page=200&page={page}&identifications=most_agree&quality_grade=research&popular=true"
    response = requests.get(url)
    data = response.json()
    observations = data["results"]
    if not observations:
        break
    for observation in observations:
        species.add(observation["species_guess"])
    page += 1

print(species)
