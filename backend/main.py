from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os
import json

# Load env
load_dotenv()

# Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# FastAPI app
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class MeetingRequest(BaseModel):
    transcript: str

class EmailRequest(BaseModel):
    summary: str
    action_items: list

# Home route
@app.get("/")
def home():
    return {"status": "AI Meeting Assistant Backend Running"}

# Process transcript
@app.post("/process")
def process_meeting(data: MeetingRequest):

    prompt = f"""
Analyze this meeting transcript.

Return ONLY valid JSON in this exact format:

{{
  "summary": "short summary",
  "action_items": [
    {{
      "description": "",
      "assignee": "",
      "deadline": ""
    }}
  ],
  "decisions": [
    "decision 1"
  ]
}}

Transcript:
{data.transcript}
"""

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,
        )

        content = completion.choices[0].message.content

        # Clean JSON
        cleaned = (
            content.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        parsed = json.loads(cleaned)

        return parsed

    except Exception as e:
        return {
            "summary": "Error generating summary",
            "action_items": [],
            "decisions": [],
            "error": str(e)
        }

# Follow-up email
@app.post("/followup")
def followup_email(data: EmailRequest):

    prompt = f"""
Write a professional follow-up email.

Summary:
{data.summary}

Action Items:
{data.action_items}
"""

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.5,
        )

        email = completion.choices[0].message.content

        return {
            "email": email
        }

    except Exception as e:
        return {
            "email": f"Error: {str(e)}"
        }