---

# svelte_service

A full-stack project for managing cars, with a Svelte frontend and a Node.js (Express) backend.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/) (optional, for cloning)

---

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd svelte_service
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

### Start the Backend Server

```bash
npm start
```

- The backend will run on [http://localhost:5000](http://localhost:5000)
- Make sure `cars.db` is present in the `backend` folder (already included).

---

## 3. Frontend Setup

Open a new terminal, then:

```bash
cd frontend
npm install
```

### Start the Frontend Dev Server

```bash
npm run dev
```

- The frontend will run on [http://localhost:5173](http://localhost:5173) (default Vite port).

---

## 4. Usage

- Open your browser and go to [http://localhost:5173](http://localhost:5173)
- You can add, edit, and delete cars. All data is stored in the backend SQLite database.

---

## 5. Project Structure

```
svelte_service/
  backend/    # Express server, SQLite DB, API routes
  frontend/   # SvelteKit app
```

---

## 6. Troubleshooting

- If ports are in use, stop other processes or change the port in the config files.
- For database issues, ensure `cars.db` exists in `backend/`.

---

## 7. Scripts

### Backend

- `npm start` — Start backend server

### Frontend

- `npm run dev` — Start frontend dev server

---
