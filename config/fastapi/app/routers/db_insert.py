from fastapi import APIRouter
from sqlalchemy import create_engine, text
from pydantic import BaseModel
from app.settings import db_user, db_password, db_name
router_insert = APIRouter()

def connect_to_db():
    return create_engine(f"postgresql://{db_user}:{db_password}@postgis:5432/{db_name}")

class UserData(BaseModel):
    name: str
    posts: int
    location: str


@router_insert.post("/insert_user")
async def insert_user(user: UserData):
    try:
        db_connection = connect_to_db()
        #TODO change hardcoded values
        params={
            "name": user.name,
            "posts": user.posts,
            "location": user.location
        }
        
        sql_query = text("INSERT INTO users (name, posts, location) VALUES (:name, :posts, :location);")
        with db_connection.connect() as conn:
            result = conn.execute(sql_query, params)
            conn.commit()
            print(result)
    except Exception as e:
        return {"error": f"Database connection failed: {str(e)}"}
    
    return {"status": "User inserted successfully"}

# 1. przygotować konfiguracje geoserwera z 10 dowolnie wybranymi warstwami bdot10k
# na podstawie tej konfiguracji przygotować kompozycje usługi WMS z tymi warstwami
# sprawozdanie z wykonanej pracy
# 2. Dołożyć do konfiguracji remote konfig. fastapi

#  do 9 stycznia
