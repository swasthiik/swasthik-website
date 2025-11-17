from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 1. Initialize the App
app = FastAPI()

# 2. Allow your Frontend to talk to this Backend (CORS)
# This is crucial. Without this, the browser blocks the connection.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, change this to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Define the Data Structure (What data do we expect?)
class ContactForm(BaseModel):
    name: str
    email: str
    message: str

# 4. Create the API Route ( The "Door" )
@app.get("/")
def read_root():
    return {"message": "RAW DATA Backend is Running!"}

@app.post("/submit-form")
def submit_data(form: ContactForm):
    # In the future, this is where you save to a Database
    print(f"NEW LEAD RECEIVED: {form.name} ({form.email})")
    
    return {
        "status": "success", 
        "message": "Data received by Python Backend",
        "received_data": form
    }