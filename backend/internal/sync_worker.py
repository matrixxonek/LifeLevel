import requests
import time
from datetime import datetime

# KONFIGURACJA
BASE_URL = "http://localhost:5000/api/internal"
INTERNAL_KEY = "9b1c8e5f-8a3b-4c9d-9e7a-2f1b6c8d9e7f"  # Musi zgadzać się z internal-key w Expressie
HEADERS = {"internal-key": INTERNAL_KEY}
SYNC_INTERVAL = 900  # 15 minut (w sekundach)

def fetch_sync_targets():
    """Pobiera listę użytkowników do sprawdzenia."""
    try:
        response = requests.get(f"{BASE_URL}/userSync", headers=HEADERS)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"[{datetime.now()}] Błąd pobierania celów: {e}")
        return []

def check_github(user):
    """Sprawdza aktywność na GitHub i wysyła EXP."""
    username = user.get('githubUsername')
    if not username:
        return

    print(f" -> Sprawdzam GitHub: {username}")
    url = f"https://api.github.com/users/{username}/events/public"
    
    try:
        res = requests.get(url)
        if res.status_code == 200:
            events = res.json()
            # Interesują nas tylko PushEvent z ostatnich 15 min (uprośćmy: bierzemy 5 ostatnich)
            for event in events[:5]:
                if event['type'] == 'PushEvent':
                    event_id = event['id']
                    payload = {
                        "userId": user['id'],
                        "amount": 20, # Przykładowa wartość
                        "category": "Mind",
                        "reason": f"GitHub Push: {event['repo']['name']}",
                        "source": "GitHub",
                        "externalId": event_id
                    }
                    send_exp(payload)
    except Exception as e:
        print(f"    Błąd GitHub ({username}): {e}")

def check_strava(user):
    """Sprawdza aktywność na Strava i wysyła EXP."""
    token = user.get('stravaAccessToken')
    if not token:
        return

    print(f" -> Sprawdzam Strava: {user['id']}")
    url = "https://www.strava.com/api/v3/athlete/activities"
    headers = {"Authorization": f"Bearer {token}"}
    
    try:
        res = requests.get(url, headers=headers)
        if res.status_code == 200:
            activities = res.json()
            for act in activities[:3]: # Bierzemy 3 ostatnie aktywności
                payload = {
                    "userId": user['id'],
                    "amount": 50,
                    "category": "Physical",
                    "reason": f"Trening Strava: {act['name']}",
                    "source": "Strava",
                    "externalId": str(act['id'])
                }
                send_exp(payload)
    except Exception as e:
        print(f"    Błąd Strava (User {user['id']}): {e}")

def send_exp(payload):
    """Wysyła paczkę EXP do backendu Node.js."""
    try:
        res = requests.post(f"{BASE_URL}/addExp", json=payload, headers=HEADERS)
        data = res.json()
        if data.get('success'):
            print(f"    [SUCCESS] Dodano EXP: {payload['reason']}")
        elif data.get('skipped'):
            pass 
    except Exception as e:
        print(f"    [ERROR] Nie udało się wysłać EXP: {e}")

def main():
    print(f"=== Worker wystartował: {datetime.now()} ===")
    while True:
        targets = fetch_sync_targets()
        print(f"Znaleziono {len(targets)} użytkowników do synchronizacji.")
        
        for user in targets:
            check_github(user)
            check_strava(user)
        
        print(f"=== Cykl zakończony. Kolejny za {SYNC_INTERVAL//60} min. ===")
        time.sleep(SYNC_INTERVAL)

if __name__ == "__main__":
    main()