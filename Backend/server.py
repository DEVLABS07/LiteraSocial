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
client = AsyncIOMotorClient(url)
db = client["LiteralSocial"]
login = db["Authentication"]
Posts = db["Posts"]
thoughts = db["Thoughts"]
pass_context = CryptContext(schemes="bcrypt", deprecated="auto")

class Signin(BaseModel):
    username: str
    usermail: str
    password: str
class Login(BaseModel):
    Email: str
    Password: str
class Post(BaseModel):
    Email: str
    Username: str
    Userid: str
    tag: str
    heading: str
    content: str   
    likes: str
    comments: str
    shares: str
    time: str
    
@app.post("/signin")
async def signin(data:Signin):
    name = data.username   
    password = pass_context.hash(data.password)
    email = data.usermail
    found = await login.find_one({"Email": email})
    if found:
        return {"message": "Accound already registered", "id": 1}
    else: 
        await login.insert_one({"Username": name,"Email": email ,"Password": password})
        return {"message": "Successfully created an Account", "id": 2}
    
@app.get("/thoughts")
async def handle_thoughts():
    data = await thoughts.find().to_list(length=None)
    for item in data:
        item['_id'] = str(item['_id'])
    return {"Data": data}

@app.get("/Posts")
async def get_posts():
    data = await Posts.find().to_list(length=None)
    for id in data:
        id['_id'] = str(id['_id'])
    return {"Data": data}

@app.post("/addPost")
async def add_posts(data:Post):
    response = await Posts.insert_one({"Email":data.Email, "Username": data.Username, "UserId": data.Userid, "tag": data.tag,"heading": data.heading ,"content": data.content, "likes":data.likes, "comments":data.comments, "share":data.shares, "time": data.time})
    return {"Message": "Post Successfully saved"}