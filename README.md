# Gen AI Assignments Repository

This repository contains full-stack Generative AI projects built using **Node/Express**, **React (Vite)**, and the **OpenRouter SDK** to implement advanced LLM behaviors.

---

## Projects in this Repository

### 1. [Persona Implementation Chatbot](./Persona%20Implementation)
An AI-powered developer simulation dashboard that replicates conversations with Hitesh Choudhary ("Chai aur Code") and Piyush Garg. The assistants respond in Hinglish (blending Hindi grammar with English coding terms) to match their unique speech patterns, coding approaches, and teaching personalities.
*   **Tech Stack**: Node/Express, React, Axios, Tailwind CSS v4, OpenRouter.
*   **Key Feature**: Highly-customized system prompts replicating specific tech creators.

### 2. [Self-Consistency GPT](./Self%20consistency%20GPT)
A chat interface implementing the **Self-Consistency (Sample-and-Vote)** architecture. It queries three different LLM models simultaneously (GPT-4o Mini, Claude Sonnet 4, Gemini 2.5 Flash) and routes all outputs to an OpenAI-based consensus judge (GPT-4o) to evaluate, reconcile contradictions, and synthesize a single, hallucination-free final response.
*   **Tech Stack**: Node/Express, React, Lucide Icons, Custom CSS, OpenRouter.
*   **Key Feature**: Parallel model dispatching, custom markdown rendering, consensus evaluation tracing.

---

## Global Repository Structure

```text
Gen-Ai-Assignment/
├── Persona Implementation/      # Project 1: Hinglish Creator chatbot
│   ├── backend/                 # Express backend server
│   └── frontend/                # React (Vite) + Tailwind CSS UI
├── Self consistency GPT/        # Project 2: Consensus Synthesis engine
│   ├── backend/                 # Express backend server
│   └── frontend/                # React (Vite) + Custom CSS Chat UI
├── .gitignore                   # Workspace gitignore rules
└── README.md                    # Main repository overview (this file)
```

---

## Getting Started

Detailed running instructions are included in the individual project folders. Below is a quick overview of how to launch either application:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v18+) installed.

### Run Project 1: Persona Chatbot
1. Configure `Persona Implementation/backend/.env` with your API keys.
2. In terminal 1 (Backend):
   ```bash
   cd "Persona Implementation/backend" && npm install && npm run dev
   ```
3. In terminal 2 (Frontend):
   ```bash
   cd "Persona Implementation/frontend" && npm install && npm run dev
   ```

### Run Project 2: Self-Consistency GPT
1. Configure `Self consistency GPT/backend/.env` with your API keys.
2. In terminal 1 (Backend):
   ```bash
   cd "Self consistency GPT/backend" && npm install && npm start
   ```
3. In terminal 2 (Frontend):
   ```bash
   cd "Self consistency GPT/frontend" && npm install && npm run dev
   ```
