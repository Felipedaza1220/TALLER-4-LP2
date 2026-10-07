from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db

router = APIRouter(
    prefix="/ejercicios",
    tags=["Ejercicios"]
)


@router.get("/", response_model=list[schemas.Ejercicio])
def listar_ejercicios(
    categoria_id: int | None = None,
    db: Session = Depends(get_db)
):
    return crud.get_ejercicios(db, categoria_id)


@router.get("/{ejercicio_id}", response_model=schemas.Ejercicio)
def obtener_ejercicio(
    ejercicio_id: int,
    db: Session = Depends(get_db)
):
    ejercicio = crud.get_ejercicio(db, ejercicio_id)

    if ejercicio is None:
        raise HTTPException(
            status_code=404,
            detail="Ejercicio no encontrado"
        )

    return ejercicio


@router.post("/", response_model=schemas.Ejercicio)
def crear_ejercicio(
    ejercicio: schemas.EjercicioCreate,
    db: Session = Depends(get_db)
):
    return crud.create_ejercicio(db, ejercicio)
