from fastapi import HTTPException
from fastapi import FastAPI
from pydantic import BaseModel
import requests
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

class Signin(BaseModel):
    username: str
    usermail: str
    password: str
class Login(BaseModel):
    Email: str
    Password: str
class Thoughts(BaseModel):
    Email: str
    username: str
    userid: str
    tag: str
    content: str
    likes: str
    comments: str
    shares: str
class AI_request(BaseModel):
    prompt: str
    username:str

#for thoughts

@app.get("/")
def read_root():
    return {"message": "Hello, Buddy!"}

@app.get("/thoughts")
async def handle_thoughts():
   data = await thoughts.find().to_list(length=None)
   for id in data:
       id['_id'] = str(id['_id'])
   return {"Data": data}

#for posts

@app.get("/Posts")
async def get_posts():
    data = await Posts.find().to_list(length=None)
    for id in data:
        id['_id'] = str(id['_id'])
    return {"Data": data}

#for AI



@app.post("/api/ai_name")
async def ai_response(data: AI_request):

        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": "Bearer",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "llama-3.1-8b-instant",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": data.prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 500
        }

        response = requests.post(url, headers=headers, json=payload)

        # Extract and print response
        if response.status_code == 200:
            completion = response.json()
            print(completion["choices"][0]["message"]["content"])
        else:
            print("Error:", response.status_code, response.text)




class Follow(BaseModel):
    userid: str
    targetid: str

@app.post('/follow')
async def follow(data: Follow):
    await Login.update_one({"username": data.targetid}, {"$addToSet" : {"followers" : data.userid}})
    await Login.update_one({"username": data.userid}, {"&addToSet": {"following": data.targetid}})
    return {"message": "Follow Successfully"}

@app.post('/unfollow')
async def unfollow(data: Follow):
    await Login.update_one({"username": data.targetid}, {"&pull" : {"followers" : data.userid}})
    await Login.update_one({"username": data.userid}, {"&pull" : {"following": data.targetid}})
    return {"message": "Unfollowed Successfully"}