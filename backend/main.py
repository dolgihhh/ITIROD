from fastapi import FastAPI
from pydantic import BaseModel, Field
from users.router import router as router_users
from flats.router import router as router_flats
from favourites.router import router as router_favourites
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title = "RentaBY"
)

app.include_router(router_users)
app.include_router(router_flats)
app.include_router(router_favourites)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# fake_users = [
#     {"id": 1, "name": "Pasha", "email": "dolgihgod@mail.ru", "password": "02032003"},
#     {"id": 2, "name": "Dima", "email": "dima@mail.ru", "password": "Dolgih2003"},
#     {"id": 3, "name": "Vasya", "email": "loh@mail.ru", "password": "Chmo115"},
# ]


# @app.get("/users/{user_id}")
# def get_user(user_id: int):
#     current_user = list(filter(lambda user: user["id"] == user_id, fake_users))[0]
#     return current_user

# fake_flats = [
#     {"id": 1, "city": "Minsk", "flats": 3, "price": 400},
#     {"id": 2, "city": "Gomel", "flats": 2, "price": 250},
#     {"id": 3, "city": "Minsk", "flats": 5, "price": 800},
# ]


# @app.get("/flats")
# def get_flats():
#     return fake_flats


# @app.get("/flats/{flat_id}")
# def get_flat(flat_id: int):
#     return [flat for flat in fake_flats if flat["id"] == flat_id]



# class Flat(BaseModel):
#     id: int
#     city: str
#     flats: int
#     price: int = Field(ge=0)


# @app.post("/flats")
# def add_flat(flat: Flat):
#     fake_flats.append(flat)
#     return {"status": 200, "data": fake_flats}
