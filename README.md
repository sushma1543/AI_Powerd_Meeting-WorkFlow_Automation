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

## Railway Deployment

1. Create a new Railway project and connect this repository.
2. Add two services:
   - **Backend**: point to the `backend` folder.
   - **Frontend**: point to the `frontend` folder.
3. Backend settings:
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Environment variable: `OPENAI_API_KEY`
4. Frontend settings:
   - Build command: `npm install && npm run build`
   - Start command: `npx serve -s dist --listen 0.0.0.0:$PORT`
   - Environment variable: `VITE_BACKEND_URL` set to your deployed backend URL.
5. After deployment, the frontend will use the Railway backend URL from `VITE_BACKEND_URL`.
