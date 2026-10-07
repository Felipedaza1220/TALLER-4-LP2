from app.database import SessionLocal
from app.models import Categoria, Ejercicio


def seed():
    db = SessionLocal()

    try:
        if db.query(Categoria).count() > 0:
            print("La base de datos ya tiene datos.")
            return

        pecho = Categoria(nombre="Pecho")
        espalda = Categoria(nombre="Espalda")
        piernas = Categoria(nombre="Piernas")
        brazos = Categoria(nombre="Brazos")

        db.add_all([
            pecho,
            espalda,
            piernas,
            brazos
        ])

        db.commit()

        ejercicios = [
            Ejercicio(
                nombre="Press de banca",
                descripcion="Ejercicio para trabajar principalmente el pecho.",
                series=4,
                repeticiones=10,
                categoria_id=pecho.id
            ),
            Ejercicio(
                nombre="Aperturas con mancuernas",
                descripcion="Ejercicio de aislamiento para el pecho.",
                series=3,
                repeticiones=12,
                categoria_id=pecho.id
            ),
            Ejercicio(
                nombre="Remo con barra",
                descripcion="Ejercicio para trabajar la espalda.",
                series=4,
                repeticiones=10,
                categoria_id=espalda.id
            ),
            Ejercicio(
                nombre="Jalón al pecho",
                descripcion="Ejercicio para trabajar la espalda y dorsales.",
                series=3,
                repeticiones=12,
                categoria_id=espalda.id
            ),
            Ejercicio(
                nombre="Sentadilla",
                descripcion="Ejercicio principal para trabajar las piernas.",
                series=4,
                repeticiones=10,
                categoria_id=piernas.id
            ),
            Ejercicio(
                nombre="Curl de bíceps",
                descripcion="Ejercicio para trabajar los bíceps.",
                series=3,
                repeticiones=12,
                categoria_id=brazos.id
            )
        ]

        db.add_all(ejercicios)
        db.commit()

        print("Datos iniciales creados correctamente.")

    finally:
        db.close()


if __name__ == "__main__":
    seed()
