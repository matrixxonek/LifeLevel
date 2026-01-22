# ⚔️ LifeLevel: The Gamified Life Planner

**LifeLevel** to coś więcej niż zwykły menedżer zadań – to produktywne RPG, w którym realizacja Twojej prawdziwej listy "do zrobienia" podnosi poziom Twojej wirtualnej postaci. Zmień codzienne obowiązki, treningi i naukę w epickie questy, które rozwijają Twoje atrybuty i budują dyscyplinę.

---

**API Documentation** https://documenter.getpostman.com/view/51290401/2sBXVkBUrC

---

## ✨ Główne Funkcjonalności

### 1. System Planowania (Core Planner)
* **Zarządzanie Zadaniami**: Twórz i organizuj zadania z określonym priorytetem (**Low, Medium, High**) oraz terminem wykonania.
* **Widok Kalendarza (React Big Calendar)**: Zintegrowany widok łączący **Zadania** (elementy do wykonania) oraz **Wydarzenia** (bloki czasowe). Obsługuje przeciąganie (Drag & Drop) oraz inteligentne rozpoznawanie wydarzeń całodniowych.
* **Kategoryzacja Tematyczna**: Każde zadanie przypisane jest do konkretnej sfery życia, co determinuje rozwój odpowiedniego atrybutu RPG.

### 2. Elementy RPG (Gamification)
Serce LifeLevel to zaawansowany system progresji wizualizujący Twój realny rozwój:

#### Atrybuty Postaci
| Atrybut | Obszar Tematyczny | Realny Wpływ |
| :--- | :--- | :--- |
| **Wiedza (MIND)** | Nauka, Kariera, Czytanie | Wzrost biegłości w zadaniach umysłowych. |
| **Siła (PHYSICAL)** | Fitness, Zdrowie, Sport | Poprawa kondycji i nawyków fizycznych. |
| **Relacje (SOCIAL)** | Życie towarzyskie, Networking | Rozwój umiejętności miękkich i relacji. |

#### Mechanika Levelowania
* **Zysk EXP**: Ukończenie zadania przyznaje punkty doświadczenia (EXP). Ilość zależy od priorytetu (np. High = 50 EXP).
* **Level Up**: Po zapełnieniu paska postępu, poziom atrybutu wzrasta, a nadmiarowy EXP przechodzi na kolejny poziom.
* **System Streak**: Wizualizacja ciągłości działań motywująca do codziennej aktywności.

---

## 🛠️ Architektura Techniczna
* **Frontend**: React (Vite), TypeScript, Tailwind CSS, Framer Motion (animacje).
* **Backend**: Node.js, Express.js, JWT (Autoryzacja).
* **Baza Danych**: PostgreSQL + Sequelize ORM (Atomowe transakcje dla bezpieczeństwa punktów EXP).

---

## 🚀 Instalacja i Uruchomienie Lokalne

### Wymagania Wstępne
* Node.js (wersja LTS)
* Zainstalowana baza danych PostgreSQL

### 1. Klonowanie i Instalacja
```bash
git clone <URL_REPOZYTORIUM>
cd lifelevel-planner
npm install

```
### 2. Konfiguracja Środowiska
* Stwórz plik .env w folderze backend:
```bash
PORT=twoj_port
DATABASE_URL=twoj_url_do_bazy_danych
JWT_SECRET=twoj_sekretny_kod
```

---

3. Uruchomienie Aplikacji
* Otwórz dwa osobne terminale:
* **frontend**
    npm run dev
* **backend**
    npm start


---

🗺️ Roadmapa Rozwoju
* Sklep z Nagrodami: Wydawanie złota na realne przyjemności.
* System Osiągnięć: Odznaki za kamienie milowe rozwoju.
* Analityka Python: Zaawansowane wykresy progresu i predykcje nawyków.

Zmień swoje życie w grę. Leveluj codziennie z LifeLevel. 🛡️✨