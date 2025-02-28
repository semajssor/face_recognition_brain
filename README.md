<div align="left">
    <!-- <img src="./frontend/src/assets/brain-icon.svg" width="20%" align="left" style="margin-right: 15px"/> -->
    <div style="display: inline-block;">
        <h2 style="display: inline-block; vertical-align: middle; margin-top: 0;">FACE RECOGNITION BRAIN</h2>
        <p>
	<em>AI-powered face detection application</em>
</p>
        <p>
	<img src="https://img.shields.io/github/license/semajssor/face_recognition_brain?style=plastic&logo=opensourceinitiative&logoColor=white&color=blueviolet" alt="license">
	<img src="https://img.shields.io/github/last-commit/semajssor/face_recognition_brain?style=plastic&logo=git&logoColor=white&color=blueviolet" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/semajssor/face_recognition_brain?style=plastic&color=blueviolet" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/semajssor/face_recognition_brain?style=plastic&color=blueviolet" alt="repo-language-count">
</p>
        <p>Built with:</p>
        <p>
	<img src="https://img.shields.io/badge/npm-CB3837.svg?style=plastic&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=plastic&logo=HTML5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=plastic&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/PostgreSQL-316192.svg?style=plastic&logo=postgresql&logoColor=white" alt="PostgreSQL">
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=plastic&logo=react&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=plastic&logo=vite&logoColor=white" alt="Vite">
   
</p>
    </div>
</div>
<br clear="left"/>

## 🔗 Table of Contents

1. [📍 Overview](#-overview)
2. [👾 Features](#-features)
3. [📁 Project Structure](#-project-structure)
4. [🚀 Getting Started](#-getting-started)
   - [☑️ Prerequisites](#-prerequisites)
   - [⚙️ Installation](#-installation)
   - [🤖 Usage](#-usage)
   - [🧑🏻‍💻 Deployment](#-deployment)
5. [🎗 License](#-license)
6. [🙌 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

**Face Recognition Brain** is a web application that utilizes Clarifai's AI API for face detection. Built with a Vite/React frontend and a Node.js backend, users can upload images and receive real-time face detection results.

---

## 👾 Features

- **Face Detection**: Detect faces in uploaded images using Clarifai's AI API.
- **User Authentication**: Register and sign in to track your usage.
- **Responsive Design**: A clean and intuitive user interface built with Vite + React.
- **Database:** PostgreSQL

---

## 📁 Project Structure

```sh
└── face_recognition_brain/
    ├── README.md               # Project documentation
    ├── backend/                # Node.js server and API logic
    │   ├── controllers/        # Route handlers for API endpoints
    │   ├── package-lock.json   # Lockfile for backend dependencies
    │   ├── package.json        # Backend dependencies and scripts
    │   └── server.js           # Entry point for the backend server
    ├── eslint.config.js        # ESLint configuration for code linting
    └── frontend/               # React-based frontend application
        ├── .gitignore          # Files to ignore in Git
        ├── index.html          # Main HTML file for the frontend
        ├── package-lock.json   # Lockfile for frontend dependencies
        ├── package.json        # Frontend dependencies and scripts
        ├── src/                # React components and application logic
        └── vite.config.js      # Vite configuration for the frontend
```

---

## 🚀 Getting Started

### ☑️ Prerequisites
- Node.js (>=16)
- PostgreSQL installed and running

### ⚙️ Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Setup environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```sh
   PORT=5000
   DATABASE_URL=postgres://user:password@localhost:5432/dbname
   CLARIFAI_API_KEY=your_clarifai_api_key
   ```
   Replace `user`, `password`, `dbname`, and `your_clarifai_api_key` with your actual credentials.

4. **Start PostgreSQL database:**
   - Ensure PostgreSQL is running.
   - Run migrations if needed.

5. **Run the backend:**
   ```sh
   npm run server
   ```
6. **Run the frontend:**
   ```sh
   npm run dev
   ```

### 🤖 Usage

1. Start the backend server:
   ```sh
   cd backend
   node server.js
   ```
2. Start the frontend:
   ```sh
   cd frontend
   npm run dev
   ```
3. Open the browser and go to `http://localhost:3000`

### 🧑🏻‍💻 Deployment

- To deploy, ensure all environment variables are set on your hosting platform.
- Use `npm run build` for production frontend builds.
- Use a service like Render, Vercel, or Heroku for deployment. I used [render.com](https://render.com/) for my database and backend, and [vercel.com](https://vercel.com/)

---

## 🎗 License

This project is licensed under the MIT License. See [LICENSE](https://choosealicense.com/licenses/) for details.

---

## 🙌 Acknowledgments

- Inspired by the Zero to Mastery course on full-stack development.
- Built with ❤️ by **semajssor**.
