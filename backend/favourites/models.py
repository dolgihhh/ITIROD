from sqlalchemy import MetaData, Table, Column, Integer, Float, String, TIMESTAMP, ForeignKey
from users.models import users
from flats.models import flats
metadata = MetaData()


favourites = Table(
    "favourites",
    metadata,
    Column("user_id", Integer, ForeignKey(users.c.id), primary_key=True, nullable=False),
    Column("flat_id", Integer, ForeignKey(flats.c.id, ondelete="CASCADE"), primary_key=True, nullable=False),
) 