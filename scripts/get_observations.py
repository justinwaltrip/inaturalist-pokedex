"""Get observations for user.

curl -X GET --header 'Accept: application/json' 'https://api.inaturalist.org/v1/observations?user_id=jwaltrip&order=desc&order_by=created_at'
"""
import requests

url = "https://api.inaturalist.org/v1/observations?user_id=jwaltrip&order=desc&order_by=created_at"
response = requests.get(url)

print(response.json())
