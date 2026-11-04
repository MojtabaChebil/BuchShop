# 📚 BuchShop

Mini-Projekt: Eine vollständige Website für den Online-Verkauf von Büchern.

Ein Kunde kann den Katalog durchstöbern, sich registrieren/einloggen, Bücher als
Favoriten merken, in den Warenkorb legen und eine Bestellung abschließen. Alle
Bestellungen und Favoriten sind mit dem jeweiligen Konto verknüpft.

**Technologien:** Angular 21 (Frontend) · Node.js / Express (Backend) · JWT-Authentifizierung

---

## ✨ Funktionen

- 🏠 Startseite mit Buchkatalog (18 Klassiker), Suche und Kategorie-Filter
- 📖 Detailseite pro Buch mit Beschreibung, Bewertung, Verfügbarkeit
- 🔐 Registrierung & Login (JWT-basiert, Passwörter mit bcrypt gehasht)
- ❤️ Favoriten – Bücher merken und in „Meine Favoriten" wiederfinden
- 🛒 Warenkorb – Menge anpassen, entfernen, Zwischensumme live berechnet
- ✅ Bestellung abschließen (Checkout) mit Bestellbestätigung
- 👤 Konto-Seite mit Profil und vollständiger Bestellhistorie
- 📱 Vollständig responsive (Mobile, Tablet, Desktop)

---

## 🗂️ Projektstruktur

```
buchshop/
├── backend/                 # Node.js / Express API
│   ├── controllers/         # Anfragen-Logik (auth, book, cart, favorite, order)
│   ├── models/               # Datenzugriff (User, Book, Cart, Favorite, Order)
│   ├── routes/                # API-Routen
│   ├── middleware/          # JWT-Auth-Middleware
│   ├── data/                  # seed.js (Beispielbücher) + db.json (wird automatisch erzeugt)
│   ├── utils/db.js          # Einfache JSON-Datei-"Datenbank"
│   └── server.js             # Einstiegspunkt
│
├── frontend/                 # Angular 21 (Standalone Components + Signals)
│   └── src/app/
│       ├── models/            # TypeScript-Interfaces
│       ├── services/          # Auth, Book, Cart, Favorites, Order, Toast
│       ├── guards/            # Route-Schutz für eingeloggte Bereiche
│       ├── interceptors/      # Hängt JWT automatisch an Anfragen an
│       ├── components/        # Navbar, Footer, BookCard, BookCover, Toast
│       └── pages/              # Home, BookDetail, Login, Register, Cart, …
│
├── package.json               # Praktische Skripte für beide Teile zusammen
└── README.md
```

---

## 🚀 Installation

**Voraussetzung:** [Node.js](https://nodejs.org) ab Version 18 (empfohlen: 20 oder neuer)

1. Projektordner entpacken und hineinwechseln:
   ```bash
   cd buchshop
   ```

2. Alles installieren (Backend **und** Frontend in einem Schritt):
   ```bash
   npm install
   ```
   *(Das dauert beim ersten Mal 1–2 Minuten, da Angular mitinstalliert wird.)*

---

## ▶️ Projekt starten

**Variante A – Beides gleichzeitig starten (empfohlen):**
```bash
npm run dev
```
Startet Backend **und** Frontend zusammen in einem Terminal.

**Variante B – Getrennt in zwei Terminals:**
```bash
# Terminal 1
npm run backend

# Terminal 2
npm run frontend
```

Danach öffnen:
- **Frontend (Website):** http://localhost:4200
- **Backend (API):** http://localhost:3000/api/health

Registriere einfach ein neues Konto über „Registrieren" – es sind keine
vorgefertigten Zugangsdaten nötig.

---

## 🗄️ Zur Datenbank

Dieses Mini-Projekt braucht **keinen separaten Datenbankserver** (kein MongoDB,
kein MySQL). Beim ersten Start des Backends wird automatisch die Datei
`backend/data/db.json` mit den 18 Beispielbüchern erzeugt. Benutzer, Warenkörbe,
Favoriten und Bestellungen werden dort ebenfalls gespeichert.

**Zurücksetzen:** Backend stoppen, `backend/data/db.json` löschen, Backend neu
starten – die Datei wird mit den Original-Beispielbüchern neu erzeugt.

---

## 🔌 API-Übersicht

| Methode | Endpoint                  | Beschreibung                          | Login nötig |
|---------|----------------------------|----------------------------------------|:-----------:|
| POST    | `/api/auth/register`       | Neues Konto erstellen                 | –           |
| POST    | `/api/auth/login`          | Anmelden                               | –           |
| GET     | `/api/auth/me`             | Eigene Kontodaten abrufen             | ✅          |
| GET     | `/api/books`                | Alle Bücher (`?search=`, `?category=`) | –           |
| GET     | `/api/books/categories`    | Alle Kategorien                        | –           |
| GET     | `/api/books/:id`           | Ein Buch im Detail                    | –           |
| GET     | `/api/cart`                 | Warenkorb anzeigen                    | ✅          |
| POST    | `/api/cart`                  | Buch in den Warenkorb legen          | ✅          |
| PUT     | `/api/cart/:bookId`        | Menge ändern                          | ✅          |
| DELETE  | `/api/cart/:bookId`        | Artikel entfernen                     | ✅          |
| POST    | `/api/cart/checkout`       | Bestellung abschließen                | ✅          |
| GET     | `/api/favorites`            | Favoriten anzeigen                     | ✅          |
| POST    | `/api/favorites/:bookId`   | Zu Favoriten hinzufügen               | ✅          |
| DELETE  | `/api/favorites/:bookId`   | Aus Favoriten entfernen               | ✅          |
| GET     | `/api/orders`                | Eigene Bestellhistorie                | ✅          |

Geschützte Routen erwarten den Header `Authorization: Bearer <token>`, den das
Frontend nach dem Login automatisch mitschickt.

---

## 🔒 Hinweis für den produktiven Einsatz

Dies ist ein Lern-/Mini-Projekt. Für einen echten Produktiveinsatz solltest du:
- den `JWT_SECRET` in `backend/.env` durch einen eigenen, zufälligen Wert ersetzen
- `data/db.json` durch eine echte Datenbank ersetzen (z. B. MongoDB oder PostgreSQL)
- CORS in `backend/server.js` auf die tatsächliche Frontend-Domain einschränken

---

Viel Spaß mit BuchShop! 📖
