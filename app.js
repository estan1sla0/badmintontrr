
document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("loggedUser");
  if (!user) location.href = "index.html";

  const form = document.getElementById("formEntrenamiento");
  const tabla = document.getElementById("tablaEntrenamientos");
  let editIndex = null;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("entrenamientos") || "[]");
    const entrenamiento = {
      usuario: user,
      fecha: form.fecha.value,
      categoria: form.categoria.value,
      tipoTrabajo: form.tipoTrabajo.value,
      modalidad: form.modalidad.value,
      carga: form.carga.value,
      descripcion: form.descripcion.value
    };
    if (editIndex !== null) {
      data[editIndex] = entrenamiento;
      editIndex = null;
    } else {
      data.push(entrenamiento);
    }
    localStorage.setItem("entrenamientos", JSON.stringify(data));
    form.reset();
    mostrar();
  });

  window.editar = i => {
    const data = JSON.parse(localStorage.getItem("entrenamientos") || "[]").filter(e => e.usuario === user);
    const item = data[i];
    form.fecha.value = item.fecha;
    form.categoria.value = item.categoria;
    form.tipoTrabajo.value = item.tipoTrabajo;
    form.modalidad.value = item.modalidad;
    form.carga.value = item.carga;
    form.descripcion.value = item.descripcion;
    editIndex = i;
  };

  window.eliminar = i => {
    const all = JSON.parse(localStorage.getItem("entrenamientos") || "[]");
    const propios = all.filter(e => e.usuario === user);
    const globalIndex = all.findIndex((e, idx) => e === propios[i]);
    all.splice(globalIndex, 1);
    localStorage.setItem("entrenamientos", JSON.stringify(all));
    mostrar();
  };

  function mostrar() {
    const data = JSON.parse(localStorage.getItem("entrenamientos") || "[]").filter(e => e.usuario === user);
    tabla.innerHTML = "";
    data.forEach((e, i) => {
      tabla.innerHTML += `
        <tr>
          <td>${e.fecha}</td><td>${e.categoria}</td><td>${e.tipoTrabajo}</td><td>${e.modalidad}</td><td>${e.carga}</td><td>${e.descripcion}</td>
          <td>
            <button onclick="editar(${i})" class="btn btn-sm btn-warning">✏️</button>
            <button onclick="eliminar(${i})" class="btn btn-sm btn-danger">🗑️</button>
          </td>
        </tr>`;
    });
  }

  mostrar();
});
