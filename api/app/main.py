from fastapi import FastAPI

from .database import Base, engine
from . import models
from .routers import categorias, ejercicios

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API de Rutinas de Gimnasio",
    description="API para gestionar categorías y ejercicios",
    version="1.0.0"
)

app.include_router(categorias.router)
app.include_router(ejercicios.router)


@app.get("/")
def root():
    return {
        "mensaje": "API de Rutinas de Gimnasio funcionando"
    }
