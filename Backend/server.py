from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from passlib.context import CryptContext 
from typing import List
from bson import ObjectId

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
  
    
class likes(BaseModel):
    id: str
    email: str
    type: str
    content: str
    
class Report(BaseModel):
    id: str
    email: str
    posttype: str
    
class Thoughts(BaseModel):
    Email: str
    Username: str
    UserId: str
    Tag: str
    Thought: str
    Likes: int
    Comments: int
    Shares: int
    Time: str 
class sort(BaseModel):
    method: str       
class add_Comments(BaseModel):
    postId: str
    Email: str
    Username: str
    UserId: str
    Comment: str
    Time: str 
class SearchRequest(BaseModel):
    search: str
    type: str

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
    
@app.post("/login")
async def handle_login(data:Login):
    email = data.Email
    password = data.Password
    found = await login.find_one({"Email": email})
    if found:
        if pass_context.verify(password, found["Password"]):
            return {"Message": "Login Successful", "id": 123}
        else:
            return {"Message": "Invalid Credentials", "id": 4}
    else:
        return {"Message": "Account Not found", "id": 5}
    
    
@app.get("/thoughts")
async def handle_thoughts():
    data = await thoughts.find().sort("time", -1).limit(10).to_list(length=10)
    for item in data:
        item['_id'] = str(item['_id'])
    return {"Data": data}

@app.post("/Posts")
async def get_posts(data:sort):
    method = data.method
    if method == "latest":
        data = await Posts.find().sort("time", -1).limit(10).to_list(length=10)
    elif method == "trend":
        data = await Posts.find().sort("likes", -1).limit(10).to_list(length=10)
    elif method == "poems": 
        data = await Posts.find({"tag":"poetry"}).limit(10).to_list(length=10)
    elif method == "stories":
        data = await Posts.find({"tag": "story"}).limit(10).to_list(length=10)
    else:
        return{"Data":"Sorting method not specified"}    
    for posts in data:
        posts['_id'] = str(posts['_id'])
    return {"Data": data}

@app.post("/addPost")
async def add_posts(data:Post):
    response = await Posts.insert_one({"Email":data.Email, "Username": data.Username, "UserId": data.Userid, "tag": data.tag,"heading": data.heading ,"content": data.content, "likes":0, "comments":0, "share":0, "time": data.time})
    return {"Message": "Post Successfully saved"}


@app.post("/addthoughts")
async def create_thought(thought: Thoughts):
    result = thoughts.insert_one(thought.dict())
    return {"message": "Thought saved"}


@app.post("/likes")
async def handle_likes(data:likes):
    id = data.id
    email = data.email
    type = data.type
    print(type)
    if type == "unliked":
        if data.content == "post":
            finalresponse = await Posts.find_one_and_update({"_id": ObjectId(id)}, {"$pull": {"likers": email},"$inc": {"likes": -1}}, return_document=True)
        else:
            finalresponse = await thoughts.find_one_and_update({"_id": ObjectId(id)}, {"$pull": {"likers": email},"$inc": {"likes": -1}}, return_document=True)            
        return{"message": "Unlike Updated Successfully"}
    else: 
        if data.content == "post":    
            finalresponse = await Posts.find_one_and_update({"_id": ObjectId(id)}, {"$addToSet": {"likers":email},"$inc": {"likes": 1}}, return_document=True)
        else:
            finalresponse = await thoughts.find_one_and_update({"_id": ObjectId(id)}, {"$addToSet": {"likers":email},"$inc": {"likes": 1}}, return_document=True)

        return{"message": "Like Updated Successfully"}



@app.post("/report")
async def handle_report(data:Report):
    post_id = data.id
    email = data.email
    posttype = data.posttype
    response = await Posts.find_one({"_id": ObjectId(post_id)})
    if response["report"] and response["report"] > 50:
        await Posts.find_one_and_delete({"_id": ObjectId(post_id)})
        return {"message": "Post Reported Successfully"}
    if posttype == "POST":
        finalresponse = await Posts.find_one_and_update({"_id": ObjectId(post_id)},{"$addToSet": {"reporters":email},"$inc": {"report": 1}}, return_document=True)
    else:
        finalresponse = await thoughts.find_one_and_update({"_id": ObjectId(post_id)},{"$addToSet": {"reporters":email},"$inc": {"report": 1}}, return_document=True)        
    return {"message": "Post Reported Successfully"}


@app.post("/comment")
async def handle_tests(data: add_Comments):
    comment = {"email": data.Email, "username": data.Username, "userid": data.UserId, "comment":data.Comment, "time": data.Time}
    finalresponse = await Posts.find_one_and_update({"_id": ObjectId(data.postId)}, {"$addToSet": {"comments-text": comment},"$inc": {"comments": 1}}, return_document=True)
    return {"message": "Comments successfully saved"}

@app.post("/fetch-comments")
async def fetch_comment(data: sort):
    id = data.method
    response = await Posts.find_one({"_id": ObjectId(id)})
    if response.get("comments-text"):
        return {"data": response["comments-text"]}
    else:
        return {"data": "No comments found."}


@app.post("/search")
async def search_data(payload: SearchRequest):
    type = payload.type
    if type == "post":
       query = {"title": {"$regex": payload.search, "$options": "i"}}  
       results = await Posts.find(query).to_list(length=None)
       return {"results": results}
    elif type == "user":
       results = await login.find({"Username": payload.search}).to_list(length=None)
       for result in results:
           result["_id"] = str(result["_id"])
       return {"username": results["email"], "userid": results["userid"]}
    else:
        return{"data": " Search Type not specified"}