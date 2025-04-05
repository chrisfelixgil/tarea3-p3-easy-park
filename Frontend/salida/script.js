function salir() {
  const salida = document.querySelector(".salida-estacionamiento");

  const datosForm = new FormData(salida);
  const datos = Object.fromEntries(datosForm);
  const codigo = datos.codigo;

  fetch(`https://localhost:7065/api/Tickets/Salida?codigo=${codigo}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.text();
    })
    .then((mensaje) => {
      alert(mensaje);
      location.reload();
    })
    .catch((error) => {
      console.log("Error al consumir la API: ", error);
    });
}
