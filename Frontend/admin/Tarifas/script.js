//Completar la tabla con la API
allTarifas();

function allTarifas() {
  const HTMLTable = document.querySelector(".table-error-msg");

  fetch("https://localhost:7065/Tarifa/All-Tarifas")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((tarifas) => mostrarDatos(tarifas))
    .catch((error) => {
      console.error("Error al consumir la API: ", error);
      HTMLTable.textContent =
        "Hubo un error al cargar los datos. Por favor, intenta nuevamente.";
    });

  const mostrarDatos = (tarifas) => {
    let body = "";
    for (let i = 0; i < tarifas.length; i++) {
      body += `<tr><td>${tarifas[i].id}</td><td>${tarifas[i].id_vehiculo}</td><td>${tarifas[i].tarifa_por_hora}</td></tr>`;
    }

    document.querySelector(".data").innerHTML = body;
  };
}


function updateTarifas() {
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
      <label for="TarifaHoras">Tarifa por hora</label>
      <input name="tarifa_por_hora" type="text" placeholder="Tarifa por hora" id="TarifaHoras" />
      <button type="submit" class="action-buttons" id="new-button">Actualizar Tarifa</button>
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
    const nuevaTarifa = datos.tarifa_por_hora;
    console.log(datos);
  
    fetch(`https://localhost:7065/Tarifa/Actualizar-Tarifas?id=${id}&nuevaTarifa=${nuevaTarifa}`, {
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