from fastapi import APIRouter
from sqlalchemy import create_engine, text # type: ignore
from app.settings import db_user, db_password, db_name
router_get_users=APIRouter()

def connect_to_db():
    return create_engine(f"postgresql://{db_user}:{db_password}@postgis:5432/{db_name}")

@router_get_users.get("/get_users")
async def get_users():
    try:
        db_connection = connect_to_db()
        sql_query=text("""select * from users""")
        with db_connection.connect() as conn:
            result = conn.execute(sql_query)
            users=[dict(row._mapping) for row in result]
        return {'status': 'success', "users": users}
    except Exception as e:
        print("Błąd podczas get_users")
        return {'status': str(e)}