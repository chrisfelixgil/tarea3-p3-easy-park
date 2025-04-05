//Completar la tabla con la API
allEstacionamientos();
estacionamientosOcupados();

function allEstacionamientos() {
  const HTMLTable = document.querySelector(".table-error-msg");

  fetch("https://localhost:7065/Estacionamientos/allEstacionamientos")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((estacionamientos) => mostrarDatos(estacionamientos))
    .catch((error) => {
      console.error("Error al consumir la API: ", error);
      HTMLTable.textContent =
        "Hubo un error al cargar los datos. Por favor, intenta nuevamente.";
    });

  const mostrarDatos = (estacionamientos) => {
    let body = "";
    for (let i = 0; i < estacionamientos.length; i++) {
      body += `<tr><td>${estacionamientos[i].idEstacionamiento}</td><td>${estacionamientos[i].tipoVehiculo}</td><td>${estacionamientos[i].capacidadTotal}</td><td>${estacionamientos[i].espacioOcupado}</td></tr>`;
    }

    document.querySelector(".dataAllEstacionamientos").innerHTML = body;
  };
}

//Generar el formulario al presionar el botón actualizar estacionamientos y actualizar un estacionamiento
function updateEstacionamientos() {
  if (document.querySelector(".new-form")) {
    return;
  }

  // Crear el formulario dinámicamente
  const formulario = document.createElement("form");
  formulario.setAttribute("action", "post");
  formulario.classList.add("new-form");
  formulario.innerHTML = `
      <label for="id">Estacionamiento</label>
      <input name="id_vehiculo" type="number" placeholder="Estacionamiento" id="id"/>
      <label for="capacidad">Nueva Capacidad</label>
      <input name="nuevaCapacidadTotal" type="text" placeholder="Tipo de vehiculo" id="capacidad" />
      <button type="submit" class="action-buttons" id="new-button">Actualizar Capacidad</button>
      <button class="action-buttons" type="button" onclick="ocultarFormulario()">Ocultar Formulario</button>
    `;

  // Insertar el formulario en el contenedor
  document.getElementById("contenedor-formulario").appendChild(formulario);

  //Obtener datos del formulario generado
  const elementoformulario = document.querySelector(".new-form");

  elementoformulario.addEventListener("submit", (event) => {
    event.preventDefault(); //Esto evita que el navegador recargue la pagina raro

    const datosform = new FormData(elementoformulario);
    const datos = Object.fromEntries(datosform);
    const id_vehiculo = datos.id_vehiculo;
    const nuevaCapacidad = datos.nuevaCapacidadTotal;
    console.log(datos);

    fetch(
      `https://localhost:7065/Estacionamientos/Modificar-Capacidad?id_vehiculo=${id_vehiculo}&nuevaCapacidadTotal=${nuevaCapacidad}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((TextoRespuesta) => {
        alert("Capacidad actualizada correctamente.");
        location.reload(); //recarga la pagina para que se llene la tabla
      })
      .catch((error) => {
        console.error("Error al enviar los datos a la API: ", error);
      });
  });
}

//Estacionamientos ocupados
function estacionamientosOcupados() {
  const HTMLTable = document.querySelector(".table-error-msg");

  fetch("https://localhost:7065/Estacionamientos/Estacionamientos-Ocupados")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((estacionamientos) => mostrarDatos(estacionamientos))
    .catch((error) => {
      console.error("Error al consumir la API: ", error);
      HTMLTable.textContent =
        "Hubo un error al cargar los datos. Por favor, intenta nuevamente.";
    });

  const mostrarDatos = (estacionamientos) => {
    let body = "";
    for (let i = 0; i < estacionamientos.length; i++) {
      body += `<tr><td>${estacionamientos[i].idEstacionamiento}</td><td>${estacionamientos[i].tipoVehiculo}</td><td>${estacionamientos[i].fechaHoraIngreso}</td></tr>`;
    }

    document.querySelector(".dataEstacionamientosOcupados").innerHTML = body;
  };
}

function searchEstacionamiento() {
  const inputId = document.querySelector(".input-search").value;

  if (!inputId) {
    alert("Por favor, introduzca un ID válido.");
    return;
  }

  fetch(
    `https://localhost:7065/Estacionamientos/Detalle-Estacionamiento?id=${inputId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((estacionamientos) => {
      console.log(estacionamientos);
      mostrarDatos(estacionamientos);
    })
    .catch((error) => {
      console.error("Error al consumir la API: ", error);
    });

    function mostrarDatos(estacionamiento) {
      const body = `
        <tr>
          <td>${estacionamiento.idEstacionamiento}</td>
          <td>${estacionamiento.tipoVehiculo}</td>
          <td>${estacionamiento.codigo}</td>
          <td>${estacionamiento.fechaHoraIngreso}</td>
          <td>${estacionamiento.tiempoTranscurrido}</td>
        </tr>
      `;

      document.querySelector(".dataDetalleEstacionamientos").innerHTML = body;
    }
    
}



