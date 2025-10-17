import requests

try:
    r = requests.get("https://api.groq.ai/v1/chat")
    print(r.status_code)
except Exception as e:
    print(e)
