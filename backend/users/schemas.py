from pydantic import BaseModel

class UserCreate(BaseModel):
    name : str
    email : str
    password : str


class UserUpdate(BaseModel):
    name : str
    email : str
    password : str
    new_password : str


class UserLogin(BaseModel):
    email : str
    password : str