from sqlalchemy import MetaData, Table, Column, Integer, Float, String, TIMESTAMP, ForeignKey
from users.models import users

metadata = MetaData()

flats = Table(
    "flats",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("city", String(50), nullable=False),
    Column("adress", String(50), nullable=False),
    Column("rooms", Integer, nullable=False),
    Column("area", Float, nullable=False),
    Column("price", Integer, nullable=False),
    Column("phone_number", String(13), nullable=False),
    Column("owner_name", String(25), nullable=False),
    Column("photo_url", String(200), nullable=False),
    Column("description", String(300), nullable=False),
    Column("user_id", Integer, ForeignKey(users.c.id), nullable=False),
)