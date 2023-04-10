from pydantic import BaseModel

class FlatCreate(BaseModel):
    city : str
    adress : str
    rooms : int
    area : float
    price : int
    phone_number : str
    owner_name : str
    photo_url : str
    description : str
    user_id : int


class FlatRead(BaseModel):
    message : str
    city : str
    adress : str
    rooms : int
    area : float
    price : int
    phone_number : str
    owner_name : str
    photo_url : str
    description : str