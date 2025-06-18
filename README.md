# MERN Portfolio + Blog

A full‑stack developer portfolio built with **MongoDB, Express, React (+ TypeScript), and Node**.  It showcases projects, features a Markdown‑powered blog, and is deployed using modern cloud services.

---

## ✨ Features

* Dynamic **Projects** page fed from the backend
* **Blog** with Markdown editing & rendering
* Fully typed React frontend (Vite + TS)
* REST API built with Express & Mongoose
* Environment‑based configuration via `.env`
* CI‑ready folder layout and Conventional Commit history

---

## 🧰 Tech Stack

| Layer    | Tech                                     |
| -------- | ---------------------------------------- |
| Frontend | React @ Vite · TypeScript · Tailwind CSS |
| Backend  | Node.js · Express.js                     |
| Database | MongoDB Atlas (Mongoose ODM)             |
| Hosting  | Vercel (frontend) · Render (API)         |

---

## 🚀 Live Demo

> *Coming soon* – the site will be published at `catrandquist.com` once the initial MVP is complete.

---

## 🛠️ Getting Started

### Prerequisites

* **Node.js** ≥ 18 and **npm** ≥ 9
* A free **MongoDB Atlas** cluster & connection string

### Clone & Install

```bash
# Clone
git clone https://github.com/catrandquist/mern-portfolio-blog.git
cd mern-portfolio-blog

# Install backend deps
cd backend && npm install
# Install frontend deps
cd ../frontend && npm install
```

### Local Development

```bash
# 1️⃣ Start the API
cd backend
cp .env.example .env   # add your MONGO_URI
npm run dev            # http://localhost:5000

# 2️⃣ In another terminal, start the frontend
cd ../frontend
npm run dev            # http://localhost:5173
```

---

## 📁 Project Structure

```
mern-portfolio-blog/
├─ backend/      # Express API + Mongoose models
│  ├─ models/
│  ├─ routes/
│  └─ server.js
├─ frontend/     # React (Vite + TS) app
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ App.tsx
└─ README.md
```

---

## 🔃 Branching & Commit Conventions

* **`main`** – always deployable
* **`feature/<topic>`** – new work (e.g. `feature/blog-list`)
* **Conventional Commits** for clear history:<br>`feat: add blog post model` · `fix: correct Mongoose URI`

---

## 🚢 Deployment

1. **Frontend** → Vercel (`vercel --prod`)
2. **Backend** → Render free web service
3. Add environment vars to each platform (`MONGO_URI`, etc.)

---

## 📜 License

Distributed under the **MIT License** – see `LICENSE` for details.

---

## 🤝 Contact

Created with ♥ by **Cat Randquist** – [GitHub](https://github.com/crandquist) · [LinkedIn](https://linkedin.com/in/cat-randquist)
