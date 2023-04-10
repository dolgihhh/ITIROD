from pydantic import BaseModel

class Favourite(BaseModel):
    user_id : int
    flat_id : int