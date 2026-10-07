const categoriaSelect = document.getElementById("categoria");
const ejerciciosContainer = document.getElementById("ejercicios");
const detalleSection = document.getElementById("detalle");
const detalleContenido = document.getElementById("detalle-contenido");


async function cargarCategorias() {
    const respuesta = await fetch("/api/categorias/");
    const categorias = await respuesta.json();

    categorias.forEach(categoria => {
        const opcion = document.createElement("option");

        opcion.value = categoria.id;
        opcion.textContent = categoria.nombre;

        categoriaSelect.appendChild(opcion);
    });
}


async function cargarEjercicios(categoriaId = "") {
    let url = "/api/ejercicios/";

    if (categoriaId) {
        url += `?categoria_id=${categoriaId}`;
    }

    const respuesta = await fetch(url);
    const ejercicios = await respuesta.json();

    ejerciciosContainer.innerHTML = "";

    ejercicios.forEach(ejercicio => {
        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${ejercicio.nombre}</h3>
            <p>${ejercicio.descripcion}</p>
            <p><strong>Categoría:</strong> ${ejercicio.categoria.nombre}</p>
            <p><strong>Series:</strong> ${ejercicio.series}</p>
            <p><strong>Repeticiones:</strong> ${ejercicio.repeticiones}</p>

            <button onclick="verDetalle(${ejercicio.id})">
                Ver detalle
            </button>
        `;

        ejerciciosContainer.appendChild(card);
    });
}


async function verDetalle(id) {
    const respuesta = await fetch(`/api/ejercicios/${id}`);
    const ejercicio = await respuesta.json();

    detalleContenido.innerHTML = `
        <h3>${ejercicio.nombre}</h3>
        <p>${ejercicio.descripcion}</p>
        <p><strong>Categoría:</strong> ${ejercicio.categoria.nombre}</p>
        <p><strong>Series:</strong> ${ejercicio.series}</p>
        <p><strong>Repeticiones:</strong> ${ejercicio.repeticiones}</p>
    `;

    detalleSection.classList.remove("oculto");

    detalleSection.scrollIntoView({
        behavior: "smooth"
    });
}


categoriaSelect.addEventListener("change", () => {
    cargarEjercicios(categoriaSelect.value);
});


cargarCategorias();
cargarEjercicios();
