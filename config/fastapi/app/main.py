from fastapi import FastAPI
from app.routers.db_insert import router_insert
from app.routers.dynamic_content import router_data
from fastapi.middleware.cors import CORSMiddleware # type: ignore
app = FastAPI(title="Mapbook API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_insert, prefix="/app")
app.include_router(router_data, prefix="/app")