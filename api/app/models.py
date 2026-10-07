from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from .database import Base


class Categoria(Base):
    __tablename__ = "categorias"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)

    ejercicios = relationship(
        "Ejercicio",
        back_populates="categoria"
    )


class Ejercicio(Base):
    __tablename__ = "ejercicios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(Text, nullable=True)
    series = Column(Integer, nullable=False)
    repeticiones = Column(Integer, nullable=False)
    categoria_id = Column(
        Integer,
        ForeignKey("categorias.id"),
        nullable=False
    )

    categoria = relationship(
        "Categoria",
        back_populates="ejercicios"
    )
