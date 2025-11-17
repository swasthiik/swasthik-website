from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 1. Initialize the App
app = FastAPI()

# 2. SECURITY: Allow your Frontend to talk to this Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Define the Data Structure
class ContactForm(BaseModel):
    name: str
    email: str
    message: str

# 4. Root Route (To test if server is on)
@app.get("/")
def read_root():
    return {"message": "RAW DATA Backend is Running!"}

# 5. The Form Submission Route
@app.post("/submit-form")
def submit_data(form: ContactForm):
    # This prints the data to your VS Code Terminal
    print("\n--- NEW MESSAGE RECEIVED ---")
    print(f"Name: {form.name}")
    print(f"Email: {form.email}")
    print(f"Message: {form.message}")
    print("----------------------------\n")
    
    return {
        "status": "success", 
        "message": "Data received successfully",
        "data": form
    }