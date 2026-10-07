from pydantic import BaseModel


class CategoriaBase(BaseModel):
    nombre: str


class CategoriaCreate(CategoriaBase):
    pass


class Categoria(CategoriaBase):
    id: int

    class Config:
        from_attributes = True


class EjercicioBase(BaseModel):
    nombre: str
    descripcion: str | None = None
    series: int
    repeticiones: int
    categoria_id: int


class EjercicioCreate(EjercicioBase):
    pass


class Ejercicio(EjercicioBase):
    id: int
    categoria: Categoria

    class Config:
        from_attributes = True
