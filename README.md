# AI Meeting Workflow Assistant

AI Meeting Workflow Assistant is a full-stack AI-powered web application that analyzes meeting transcripts, generates summaries, extracts action items, tracks decisions, and creates professional follow-up emails using Groq AI. Built with React, FastAPI, and Vite for fast and efficient workflow automation.

## Features
- React Frontend
- FastAPI Backend
- OpenAI GPT Integration
- Meeting Summaries
- Action Item Extraction
- Decision Detection
- Follow-up Email Generation
- Modern Dark UI

## Backend Setup
```bash
cd backend
pip install -r requirements.txt
```

Create `.env`
```env
OPENAI_API_KEY=your_key_here
```

Run backend:
```bash
uvicorn main:app --reload
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend:
http://localhost:5173

Backend:
http://localhost:8000
