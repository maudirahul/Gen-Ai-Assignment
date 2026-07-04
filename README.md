# Persona Implementation Chatbot

An AI-powered developer simulation dashboard that replicates conversations with Hitesh Choudhary ("Chai aur Code") and Piyush Garg. The assistant responds in Hinglish (Hindi grammar written in the Latin alphabet, blended with English programming terms) to reflect their unique speech patterns, coding approaches, and personalities.

The application is built as a monorepo containing a **Node/Express** backend utilizing the official `@openrouter/sdk` and a **React (Vite) + Tailwind CSS v4** frontend using **Axios**.

---

## Project Structure

```text
Gen-Ai-Assignment/
├── Persona Implementation/
│   ├── backend/
│   │   ├── config/          # OpenRouter client initialization
│   │   ├── prompts/         # Hinglish prompt definitions
│   │   ├── services/        # OpenRouter business logic layer
│   │   ├── controllers/     # Chat request/response controller
│   │   ├── routes/          # Express route bindings
│   │   ├── middlewares/     # Error handlers and validation
│   │   ├── index.js         # Express main entry point
│   │   └── package.json     # Backend script runner
│   └── frontend/
│       ├── src/
│       │   ├── components/  # Modular React components
│       │   ├── App.jsx      # Conversation state engine
│       │   ├── index.css    # Tailwind v4 import directives
│       │   └── main.jsx     # Vite React mount file
│       ├── vite.config.js   # Vite Tailwind compiler configuration
│       └── package.json     # Frontend dependencies
├── .gitignore               # Root version control settings
└── README.md                # This instructions file
```

---

## Getting Started

Follow these instructions to configure and run the full-stack application on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v18+) installed.

---

### Step 1: Set Up and Run the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd "Persona Implementation/backend"
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Open the `.env` file and input your OpenRouter API Key:
   ```env
   PORT=5000
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start running on `http://localhost:5000`.*

---

### Step 2: Set Up and Run the Frontend

1. Open a new terminal window and navigate to the `frontend` directory:
   ```bash
   cd "Persona Implementation/frontend"
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   *Open the URL output in your terminal (typically `http://localhost:5173`) in your web browser.*

---

## Deployment Configuration

*   **Backend Hosting (Render)**: Set up a Web Service pointing to `Persona Implementation/backend` with build command `npm install` and start command `npm start`. Add your `OPENROUTER_API_KEY` to the environment variables.
*   **Frontend Hosting (Vercel)**: Import the repository, select the `Persona Implementation/frontend` directory, and add the environment variable `VITE_API_BASE_URL` pointing to your deployed backend API URL (e.g. `https://your-backend.onrender.com/api`).
