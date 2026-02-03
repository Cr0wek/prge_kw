from fastapi import APIRouter, Query
from sqlalchemy import create_engine, text # type: ignore
from app.settings import db_user, db_password, db_name

router_data = APIRouter()

def connect_to_db():
    return create_engine(f"postgresql://{db_user}:{db_password}@postgis:5432/{db_name}")

@router_data.get("/events")
async def get_events():
    try:
        db_connection = connect_to_db()
        sql_query = text("SELECT id, name, location FROM event")
        with db_connection.connect() as conn:
            result = conn.execute(sql_query)
            events_list = [dict(row._mapping) for row in result]
        return events_list
        
    except Exception as e:
        print(f"Błąd podczas get_events: {e}")
        return {'status': 'error', 'message': str(e)}

@router_data.get("/users")
async def get_users(type: str | None = Query(default=None)):
    try:
        db_connection = connect_to_db()
        base_query = "SELECT * FROM users"
        if type == 'artists':
            sql_query = text(base_query + " WHERE role = 'Artysta'")
        elif type == 'employees':
            sql_query = text(base_query + " WHERE role != 'Artysta'")
        else:
            sql_query = text(base_query)
        with db_connection.connect() as conn:
            result = conn.execute(sql_query)
            users_list = [dict(row._mapping) for row in result]
        return users_list

    except Exception as e:
        print(f"Błąd podczas get_users: {e}")
        return {'status': 'error', 'message': str(e)}