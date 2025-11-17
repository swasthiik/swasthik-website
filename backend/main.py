import csv
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 1. Initialize
app = FastAPI()

# 2. Security
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Data Model
class ContactForm(BaseModel):
    name: str
    email: str
    message: str

@app.get("/")
def read_root():
    return {"message": "RAW DATA Backend is Running!"}

# 4. The Logic to SAVE Data
@app.post("/submit-form")
def submit_data(form: ContactForm):
    
    # Print to Terminal (So you can see it)
    print(f"Saving data for: {form.name}")

    # --- NEW CODE: Save to CSV File ---
    file_exists = os.path.isfile("leads.csv")
    
    with open("leads.csv", "a", newline="") as file:
        writer = csv.writer(file)
        
        # If file is new, add the headers first
        if not file_exists:
            writer.writerow(["Name", "Email", "Message"])
            
        # Write the actual data
        writer.writerow([form.name, form.email, form.message])
    # ----------------------------------

    return {"status": "success", "message": "Data Saved to CSV"}