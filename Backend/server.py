from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from passlib.context import CryptContext 

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
url = os.getenv("url")
client = AsyncIOMotorClient("mongodb+srv://devlabs07:0rsKIrtlWd1h0Fn6@cluster0.0onzi5k.mongodb.net/")
db = client["LiteralSocial"]
collection = db["Authentication"]
pass_context = CryptContext(schemes="bcrypt", deprecated="auto")

class Signin(BaseModel):
    username: str
    usermail: str
    password: str

@app.post("/signin")
async def signin(data:Signin):
    name = data.username   
    password = pass_context.hash(data.password)
    email = data.usermail
    found = await collection.find_one({"Username": name})
    if found:
        return {"message": "Accound already registered"}
    else: 
        await collection.insert_one({"Username": name,"Email": email ,"Password": password})
        return {"message": "Successfully created an Account"}