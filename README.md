# 🚀 Personal Portfolio | Eslam Amin

<img width="1825" height="746" alt="image" src="https://github.com/user-attachments/assets/7c97c896-089c-479f-bc26-e826741bf3fb" />
A modern, responsive personal portfolio website built to showcase my projects, skills, and experience as a **Backend Engineer** — powered by a dynamic **Node.js + Express + MongoDB** backend.

Designed with a focus on clean UI/UX, performance, and accessibility.

## 🔗 Live Demo
**[Visit Portfolio](https://eslam-amin.github.io/Portfolio/)**

## 🛠️ Tech Stack

* **Frontend:** [React.js](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
* **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [Mongoose](https://mongoosejs.com/), [MongoDB](https://www.mongodb.com/)
* **Deployment:** GitHub Pages (Frontend)
* **Package Manager:** npm

## 📂 Project Structure

```bash
my-portfolio/
├── backend/                  # Express + MongoDB REST API
│   ├── src/
│   │   ├── config/db.js      # MongoDB connection setup
│   │   ├── controllers/      # CRUD controllers for portfolio sections
│   │   ├── models/           # Mongoose schemas (Profile, Skill, Experience, Education, Project)
│   │   ├── routes/           # Express API routes
│   │   ├── seed/             # Database seed script and initial data
│   │   └── server.js         # Backend server entry point
│   ├── .env.example
│   └── package.json
└── frontend/                 # React + Tailwind frontend application
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── data/             # Fallback static portfolio data
    │   ├── services/api.js   # API client for dynamic backend calls
    │   ├── App.js            # Main application layout
    │   └── index.js
    ├── .env.example
    └── package.json
```

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/portfolio` | Fetch all portfolio data (auto-seeds MongoDB if empty) |
| `POST` | `/api/seed` | Reset and re-seed MongoDB with initial portfolio data |
| `GET` / `PUT` | `/api/profile` | Get or update bio, contact details, links, section titles, and footer |
| `GET` / `PUT` | `/api/skills` | Get or update skills categories & skill cards |
| `POST` / `PUT` / `DELETE` | `/api/skills/cards/:cardId` | Add, update, or remove skill display cards |
| `GET` / `POST` | `/api/experience` | List or create work experience entries |
| `PUT` / `DELETE` | `/api/experience/:id` | Update or delete a work experience entry |
| `GET` / `POST` | `/api/education` | List or create education entries |
| `PUT` / `DELETE` | `/api/education/:id` | Update or delete an education entry |
| `GET` / `POST` | `/api/projects` | List or create portfolio projects |
| `PUT` / `DELETE` | `/api/projects/:id` | Update or delete a portfolio project |

## 🚀 Getting Started

### 1. Start the Backend Server

```bash
cd backend
npm install
# Configure your MongoDB URI in .env (defaults to mongodb://127.0.0.1:27017/eslam_portfolio)
npm run seed
npm run dev
```

### 2. Start the Frontend Development Server

```bash
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📬 Contact

**Eslam Amin** - Backend Engineer

---

© 2026 Eslam Amin. All Rights Reserved.
