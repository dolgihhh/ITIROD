from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy import func, select, insert, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import exc
from database import get_async_session
from favourites.models import favourites
from flats.models import flats
from users.models import users
from favourites.schemas import Favourite


router = APIRouter(
    prefix="/favourites",
    tags=["Favourite"]
)


@router.post("/")
async def create_favourite(new_fav: Favourite, session: AsyncSession = Depends(get_async_session)):
    try:
        stmt = insert(favourites).values(**new_fav.dict())
        await session.execute(stmt)
        await session.commit()
    except Exception as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Error"}, status_code=400)
    return JSONResponse(content={"message": "Favourites succesfully created"}, status_code=200)



@router.delete("/")
async def delete_flat_from_favourite(fav: Favourite, session: AsyncSession = Depends(get_async_session)):
    try:
        count_before = await session.scalar(select(func.count()).select_from(favourites))
        stmt = delete(favourites).where((favourites.c.flat_id == fav.flat_id) & (favourites.c.user_id == fav.user_id))
        await session.execute(stmt)
        await session.commit()
        count_after = await session.scalar(select(func.count()).select_from(favourites))
        if count_before == count_after:
            raise Exception
    except Exception as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Error"}, status_code=400)
    return JSONResponse(content={"message": "Flat was deleted from favourite"}, status_code=200)



@router.get("/{user_id}")
async def get_user_favorite_flats_(user_id: int, session: AsyncSession = Depends(get_async_session)):
    try:
        query_for_checking_user = select(users).where(users.c.id == user_id)
        result = await session.execute(query_for_checking_user)
        user_id_dict = [dict(r._mapping) for r in result]
        if len(user_id_dict) == 0:
            return JSONResponse(content=[{"message": "Wrong user_id, user doesnt exist"}], status_code=400)  
        query = select(favourites.c.flat_id).where(favourites.c.user_id == user_id)
        result = await session.execute(query)
        flat_id_dict = [dict(r._mapping) for r in result]
        flat_id_list = []
        for flat in flat_id_dict:
            flat_id_list.append(flat.get('flat_id'))
        if len(flat_id_list) == 0:
            return JSONResponse(content=[{"message": "User has 0 favourites"}], status_code=200)  
        print(flat_id_list)
        print(flat_id_dict)
        query = select(flats).where(flats.c.id.in_(flat_id_list))
        result = await session.execute(query)
        flatlist = [dict(r._mapping) for r in result]
        print(flatlist)
        for item in flatlist:
            del item["user_id"]
            del item["description"]
            del item["owner_name"]
            del item["phone_number"]
            del item["city"]
        res = [{"message": "User favourite flats data received"}]
        res.extend(flatlist)
        return JSONResponse(content=res, status_code=200)  
    except Exception as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Error"}, status_code=400)