from fastapi import APIRouter
from sqlalchemy import create_engine, text
from app.settings import db_user, db_password, db_name
router_insert = APIRouter()

def connect_to_db():
    return create_engine(f"postgresql://{db_user}:{db_password}@postgis:5432/{db_name}")

@router_insert.post("/insert_user")
async def insert_user():
    try:
        db_connection = connect_to_db()
        
        params={
            "name": request.name,
            "posts": request.posts,
            "location": request.location
        }
        
        sql_query = text("INSERT INTO users (name, posts, location) VALUES (:name, :posts, :location);")
        with db_connection.connect() as conn:
            result = conn.execute(sql_query, params)
            conn.commit()
            print(result)
    except Exception as e:
        return {"error": f"Database connection failed: {str(e)}"}
    
    return {"status": "User inserted successfully"}