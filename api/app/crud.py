from sqlalchemy.orm import Session

from . import models, schemas


def get_categorias(db: Session):
    return db.query(models.Categoria).all()


def get_categoria(db: Session, categoria_id: int):
    return (
        db.query(models.Categoria)
        .filter(models.Categoria.id == categoria_id)
        .first()
    )


def create_categoria(
    db: Session,
    categoria: schemas.CategoriaCreate
):
    db_categoria = models.Categoria(
        nombre=categoria.nombre
    )

    db.add(db_categoria)
    db.commit()
    db.refresh(db_categoria)

    return db_categoria


def get_ejercicios(
    db: Session,
    categoria_id: int | None = None
):
    query = db.query(models.Ejercicio)

    if categoria_id is not None:
        query = query.filter(
            models.Ejercicio.categoria_id == categoria_id
        )

    return query.all()


def get_ejercicio(db: Session, ejercicio_id: int):
    return (
        db.query(models.Ejercicio)
        .filter(models.Ejercicio.id == ejercicio_id)
        .first()
    )


def create_ejercicio(
    db: Session,
    ejercicio: schemas.EjercicioCreate
):
    db_ejercicio = models.Ejercicio(
        nombre=ejercicio.nombre,
        descripcion=ejercicio.descripcion,
        series=ejercicio.series,
        repeticiones=ejercicio.repeticiones,
        categoria_id=ejercicio.categoria_id
    )

    db.add(db_ejercicio)
    db.commit()
    db.refresh(db_ejercicio)

    return db_ejercicio
