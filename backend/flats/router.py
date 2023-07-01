from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy import func, select, insert, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import exc
from sqlalchemy import desc
from database import get_async_session
from flats.models import flats
from flats.schemas import FlatCreate, FlatRead


router = APIRouter(
    prefix="/flats",
    tags=["Flat"]
)


@router.post("/")
async def create_flat(new_flat: FlatCreate, session: AsyncSession = Depends(get_async_session)):
    try:
        stmt = insert(flats).values(**new_flat.dict())
        await session.execute(stmt)
        await session.commit()
    except Exception as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Error"}, status_code=400)
    return JSONResponse(content={"message": "Flat succesfully created"}, status_code=200)


@router.put("/update_flat/{flat_id}")
async def update_user(flat_id: int, flat: FlatCreate , session: AsyncSession = Depends(get_async_session)):
    try:
        # stmt = select(flats).where(flats.c.id == flat_id)
        # await session.execute(stmt)
        # await session.commit()
        # flat_dict = [dict(r._mapping) for r in result][0]
        stmt = update(flats).where(flats.c.id == flat_id).values(**flat.dict())
        await session.execute(stmt)
        await session.commit()
        print(stmt)
        return JSONResponse(content={"message": "Flat data updated"}, status_code=200)
    except IndexError as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Wrong flat_id, this flat doesn't exist"}, status_code=400)
    except Exception as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Error"}, status_code=400)



@router.delete("/{flat_id}")
async def delete_flat(flat_id: int, session: AsyncSession = Depends(get_async_session)):
    try:
        count_before = await session.scalar(select(func.count()).select_from(flats))
        stmt = delete(flats).where(flats.c.id == flat_id)
        await session.execute(stmt)
        await session.commit()
        count_after = await session.scalar(select(func.count()).select_from(flats))
        if count_before == count_after:
            raise Exception
    except Exception as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Error occured"}, status_code=400)
    return JSONResponse(content={"message": "Flat succesfully deleted"}, status_code=200)



@router.get("/{flat_id}", response_model=FlatRead)
async def get_flat(flat_id: int, session: AsyncSession = Depends(get_async_session)):
    try:
        query = select(flats).where(flats.c.id == flat_id)
        result = await session.execute(query)
        flat_dict = [dict(r._mapping) for r in result][0]
        res = {"message": "Flat data received"}
        del flat_dict["user_id"]
        res.update(flat_dict)
        return JSONResponse(content=res, status_code=200)  
    except IndexError as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Wrong flat_id, this flat doesn't exist"}, status_code=400)
    except Exception as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Error"}, status_code=400)
    
    

@router.get("/user/{user_id}")
async def get_flats_created_by_user(user_id: int, session: AsyncSession = Depends(get_async_session)):
    try:
        query = select(flats).where(flats.c.user_id == user_id)
        result = await session.execute(query)
        count_flats = await session.scalar(select(func.count()).select_from(flats).where(flats.c.user_id == user_id))
        if count_flats == 0:
            return JSONResponse(content=[{"message": "User has 0 flats"}], status_code=200)
        flatlist = [dict(r._mapping) for r in result]
        for item in flatlist:
            del item["user_id"]
            del item["description"]
            del item["owner_name"]
            del item["phone_number"]
            del item["city"]
        res = [{"message": "User flats data received"}]
        res.extend(flatlist)
        return JSONResponse(content=res, status_code=200)  
    except Exception as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Error"}, status_code=400)
    
    

@router.get("/")
async def get_all_flats(city="", orderby="", session: AsyncSession = Depends(get_async_session)):
    try:
        count_flats = await session.scalar(select(func.count()).select_from(flats))
        if count_flats == 0:
            return JSONResponse(content=[{"message": "There is 0 flats available"}], status_code=200)
        if city and orderby:
            query = select(flats).where(flats.c.city == city).order_by(orderby)
        elif city:
            query = select(flats).where(flats.c.city == city)
        elif orderby:
            query = select(flats).order_by(orderby)
        else:
            query = select(flats)
        result = await session.execute(query)
        flatlist = [dict(r._mapping) for r in result]
        for item in flatlist:
            del item["user_id"]
            del item["description"]
            del item["owner_name"]
            del item["phone_number"]
        res = [{"message": "Flats data received"}]
        res.extend(flatlist)
        if len(res) == 1:
            return JSONResponse(content=[{"message": "0 flats in this city"}], status_code=200)  
        return JSONResponse(content=res, status_code=200)  
    except Exception as e:
        print(type(e))
        print(e)
        return JSONResponse(content={"message": "Error"}, status_code=400)