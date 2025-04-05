//Completar la tabla con la API
allVehiculos();

function allVehiculos() {
  const HTMLTable = document.querySelector(".table-error-msg");

  fetch("https://localhost:7065/Vehiculos/all-Vehiculos")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((vehiculos) => mostrarDatos(vehiculos))
    .catch((error) => {
      console.error("Error al consumir la API: ", error);
      HTMLTable.textContent =
        "Hubo un error al cargar los datos. Por favor, intenta nuevamente.";
    });

  const mostrarDatos = (vehiculos) => {
    let body = "";
    for (let i = 0; i < vehiculos.length; i++) {
      body += `<tr><td>${vehiculos[i].id}</td><td>${vehiculos[i].tipoVehiculo}</td></tr>`;
    }

    document.querySelector(".data").innerHTML = body;
  };
}

//Botón ocultar formulario
function ocultarFormulario() {
  const contenedorFormulario = document.getElementById("contenedor-formulario");
  if (contenedorFormulario.firstChild) {
    contenedorFormulario.innerHTML = ""; // Borra el contenido del div
  }
}

//Generar el formulario al presionar el botón nuevo vehiculo y crear nuevo vehiculo
function newVehiculo() {
  if (document.querySelector(".new-form")) {
    return;
  }

  // Crear el formulario dinámicamente
  const formulario = document.createElement("form");
  formulario.setAttribute("action", "post");
  formulario.classList.add("new-form");
  formulario.innerHTML = `
      <input name="id" type="number" placeholder="id" value="0" class="hidden-input" />
      <label for="idtipoVehiculo">Tipo de vehiculo</label>
      <input name="tipoVehiculo" type="text" placeholder="Tipo de vehiculo" id="idtipoVehiculo" />
      <button type="submit" class="action-buttons" id="new-button">Nuevo Vehiuclo</button>
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
    console.log(datos);

    fetch("https://localhost:7065/Vehiculos/Nuevo-Vehiculos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((TextoRespuesta) => {
        alert(TextoRespuesta);
        location.reload(); //recarga la pagina para que se llene la tabla
      })
      .catch((error) => {
        console.error("Error al enviar los datos a la API: ", error);
      });
  });
}


//Generar el formulario al presionar el botón actualizar vehiculo y actualizar un vehiculo
function updateVehiculo() {
    if (document.querySelector('.new-form')) {
      return; 
    }
  
    // Crear el formulario dinámicamente
    const formulario = document.createElement('form');
    formulario.setAttribute('action', 'post');
    formulario.classList.add('new-form');
    formulario.innerHTML = `
      <label for="id">Id</label>
      <input name="id" type="number" placeholder="Introduzca id" id="id"/>
      <label for="idtipoVehiculo">Tipo de vehiculo</label>
      <input name="tipoVehiculo" type="text" placeholder="Tipo de vehiculo" id="idtipoVehiculo" />
      <button type="submit" class="action-buttons" id="new-button">Actualizar Vehiuclo</button>
      <button class="action-buttons" type="button" onclick="ocultarFormulario()">Ocultar Formulario</button>
    `;
  
    // Insertar el formulario en el contenedor
    document.getElementById('contenedor-formulario').appendChild(formulario);
  
    //Obtener datos del formulario generado
  const elementoformulario = document.querySelector(".new-form");
  
  elementoformulario.addEventListener("submit", (event) => {
    event.preventDefault(); //Esto evita que el navegador recargue la pagina raro
  
    const datosform = new FormData(elementoformulario);
    const datos = Object.fromEntries(datosform);
    console.log(datos);
  
    fetch("https://localhost:7065/Vehiculos/Actualizar-Vehiculo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((TextoRespuesta) => {
        alert(TextoRespuesta);
        location.reload(); //recarga la pagina para que se llene la tabla
      })
      .catch((error) => {
        console.error("Error al enviar los datos a la API: ", error);
      });
  });
  }


  //Generar el formulario al presionar el botón eliminar vehiculo y borar un vehiculo
function deleteVehiculo() {
    if (document.querySelector('.new-form')) {
      return; 
    }
  
    // Crear el formulario dinámicamente
    const formulario = document.createElement('form');
    formulario.setAttribute('action', 'post');
    formulario.classList.add('new-form');
    formulario.innerHTML = `
      <label for="id">Id</label>
      <input name="id" type="number" placeholder="Introduzca id" id="id"/>
      <button type="submit" class="action-buttons" id="new-button">Eliminar Vehiuclo</button>
      <button class="action-buttons" type="button" onclick="ocultarFormulario()">Ocultar Formulario</button>
    `;
  
    // Insertar el formulario en el contenedor
    document.getElementById('contenedor-formulario').appendChild(formulario);
  
    //Obtener datos del formulario generado
  const elementoformulario = document.querySelector(".new-form");
  
  elementoformulario.addEventListener("submit", (event) => {
    event.preventDefault(); //Esto evita que el navegador recargue la pagina raro
  
    const datosform = new FormData(elementoformulario);
    const datos = Object.fromEntries(datosform);
    const id = datos.id;
    console.log(id);
  
    fetch(`https://localhost:7065/Vehiculos/Eliminar-Vehiculos?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((TextoRespuesta) => {
        alert(TextoRespuesta);
        location.reload(); //recarga la pagina para que se llene la tabla
      })
      .catch((error) => {
        console.error("Error al enviar los datos a la API: ", error);
      });
  });
  }
