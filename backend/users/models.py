from sqlalchemy import MetaData, Table, Column, Integer, Float, String, TIMESTAMP, ForeignKey

metadata = MetaData()

users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(100), nullable=False),
    Column("email", String(50), nullable=False, unique=True),
    Column("password", String(50), nullable=False),
)