from fastapi import APIRouter
from sqlalchemy import create_engine, text # type: ignore
from pydantic import BaseModel # type: ignore
from app.settings import db_user, db_password, db_name

router_insert = APIRouter()
def get_coords_osm(location):
    import requests # type: ignore
    try:
        url:str=f'https://nominatim.openstreetmap.org/search?q={location}&format=json&limit=1'
        headers = {"User-Agent": 'My User Agent 1.0'}
        data=requests.get(url, headers=headers).json()
        latitude=float(data[0]['lat'])
        longitude=float(data[0]['lon'])
        return [latitude, longitude]
    except:
        print(f"Nie udało sie pobrać współrzędnych dla: {location}")
        return [52.2297, 21.0122]

def connect_to_db():
    return create_engine(f"postgresql://{db_user}:{db_password}@postgis:5432/{db_name}")

class UserData(BaseModel):
    name: str
    nick: str | None = None
    role: str
    location: str
    event_name: str

class EventData(BaseModel):
    name: str
    location: str

@router_insert.post("/insert_user")
async def insert_user(user: UserData):
    try:
        coords = get_coords_osm(user.location)
        db_connection = connect_to_db()
        params = {
            "name": user.name,
            "nick": user.nick,
            "role": user.role,
            "location": user.location,
            "event_name": user.event_name,
            "geometry": f"SRID=4326;POINT({coords[1]} {coords[0]})"
        }
        sql_query = text("""
            INSERT INTO users (name, nick, role, location, event_name, geometry) 
            VALUES (:name, :nick, :role, :location, :event_name, :geometry);
        """)
        with db_connection.connect() as conn:
            conn.execute(sql_query, params)
            conn.commit()
    except Exception as e:
        print(f"Error inserting user: {e}")
        return {"error": f"Database connection failed: {str(e)}"}
    
    return {"status": "User inserted successfully"}

@router_insert.post("/insert_event")
async def insert_event(event: EventData):
    try:
        coords = get_coords_osm(event.location)
        db_connection = connect_to_db()
        params = {
            "name": event.name,
            "location": event.location,
            "geometry": f"SRID=4326;POINT({coords[1]} {coords[0]})"
        }
        sql_query = text("""
            INSERT INTO event (name, location, geometry) 
            VALUES (:name, :location, :geometry);
        """)
        with db_connection.connect() as conn:
            conn.execute(sql_query, params)
            conn.commit()
    except Exception as e:
        print(f"Error inserting event: {e}")
        return {"error": f"Database connection failed: {str(e)}"}
    
    return {"status": "Event inserted successfully"}