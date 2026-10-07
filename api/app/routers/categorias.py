from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db

router = APIRouter(
    prefix="/categorias",
    tags=["Categorías"]
)


@router.get("/", response_model=list[schemas.Categoria])
def listar_categorias(
    db: Session = Depends(get_db)
):
    return crud.get_categorias(db)


@router.get("/{categoria_id}", response_model=schemas.Categoria)
def obtener_categoria(
    categoria_id: int,
    db: Session = Depends(get_db)
):
    categoria = crud.get_categoria(db, categoria_id)

    if categoria is None:
        return {"error": "Categoría no encontrada"}

    return categoria


@router.post("/", response_model=schemas.Categoria)
def crear_categoria(
    categoria: schemas.CategoriaCreate,
    db: Session = Depends(get_db)
):
    return crud.create_categoria(db, categoria)
