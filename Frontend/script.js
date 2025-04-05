//Motos
function ingresarMotos() {
  fetch("https://localhost:7065/api/Tickets/Generar-Tickets?id_vehiculo=1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error HTTP! Status: ${res.status}`);
      }
      return res.text();
    })
    .then((codigo) => {
      alert(codigo);
    })
    .catch((error) => {
      console.log("Error al consumir la API: ", error);
    });
}

//Carros - Jeppetas
function ingresarCarros() {
    fetch("https://localhost:7065/api/Tickets/Generar-Tickets?id_vehiculo=2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error HTTP! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((codigo) => {
        alert(codigo);
      })
      .catch((error) => {
        console.log("Error al consumir la API: ", error);
      });
  }


//Camiones
function ingresarCamiones() {
    fetch("https://localhost:7065/api/Tickets/Generar-Tickets?id_vehiculo=3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error HTTP! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((codigo) => {
        alert(codigo);
      })
      .catch((error) => {
        console.log("Error al consumir la API: ", error);
      });
  }
