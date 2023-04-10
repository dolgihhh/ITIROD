from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy import select, insert, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import exc
from database import get_async_session
from users.models import users
from users.schemas import UserLogin, UserCreate, UserUpdate


router = APIRouter(
    prefix="/users",
    tags=["User"]
)


@router.post("/registration")
async def register_user(new_user: UserCreate , session: AsyncSession = Depends(get_async_session)):
    try:
        stmt = insert(users).values(**new_user.dict())
        await session.execute(stmt)
        await session.commit()
    except exc.IntegrityError as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "This email already registered"}, status_code=400)
    except Exception as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Error"}, status_code=400)
    return JSONResponse(content={"message": "User succesfully created"}, status_code=200)


@router.post("/login")
async def login_user(user: UserLogin , session: AsyncSession = Depends(get_async_session)):
    try:
        query = select(users).where(users.c.email == user.email)
        result = await session.execute(query)
        user_dict = [dict(r._mapping) for r in result][0]
        password = user_dict.get('password')
        if(password == user.password):
            return JSONResponse(content={"message": "Successful login", "id": user_dict.get('id')}, status_code=200)  
    except Exception as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Wrong email or password"}, status_code=400)
    return JSONResponse(content={"message": "Wrong email or password"}, status_code=400)


@router.put("/update_user/{user_id}")
async def update_user(user_id: int, user: UserUpdate , session: AsyncSession = Depends(get_async_session)):
    try:
        query = select(users).where(users.c.id == user_id)
        result = await session.execute(query)
        user_dict = [dict(r._mapping) for r in result][0]
        password = user_dict.get('password')
        if password == user.password:
            stmt = update(users).where(users.c.id == user_id).values(name = user.name, email = user.email, password = user.new_password)
            await session.execute(stmt)
            await session.commit()
            print(stmt)
            return JSONResponse(content={"message": "User data updated"}, status_code=200)
    except exc.IntegrityError as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "This email already registered"}, status_code=400)
    except IndexError as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Wrong user_id, this user doesn't exist"}, status_code=400)
    except Exception as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Error"}, status_code=400)
    return JSONResponse(content={"message": "Wrong password"}, status_code=400)


@router.get("/{user_id}")
async def get_user(user_id: int, session: AsyncSession = Depends(get_async_session)):
    try:
        query = select(users).where(users.c.id == user_id)
        result = await session.execute(query)
        user_dict = [dict(r._mapping) for r in result][0]
        return JSONResponse(content={"message": "User data received", "name": user_dict.get('name'), "email": user_dict.get('email')}, status_code=200)  
    except IndexError as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Wrong user_id, this user doesn't exist"}, status_code=400)
    except Exception as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Error"}, status_code=400)
    

    # query = select(users.c.id,users.c.name).where(users.c.email == new_user.email)
    # print(query)
    # result = await session.execute(query)
    # print([dict(r._mapping) for r in result])