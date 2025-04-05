allTicketss();

function allTicketss() {
  const HTMLTable = document.querySelector(".table-error-msg");

  fetch("https://localhost:7065/api/Tickets/Tickets-pagos")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((tickets) => mostrarDatos(tickets))
    .catch((error) => {
      console.error("Error al consumir la API: ", error);
      HTMLTable.textContent =
        "Hubo un error al cargar los datos. Por favor, intenta nuevamente.";
    });

  const mostrarDatos = (tickets) => {
    let body = "";
    for (let i = 0; i < tickets.length; i++) {
      body += `<tr><td>${tickets[i].idEstacionamiento}</td><td>${tickets[i].tipoVehiculo}</td><td>${tickets[i].codigo}</td><td>${tickets[i].fechaHoraIngreso}</td><td>${tickets[i].fechaHoraSalida}</td><td>${tickets[i].tiempoTranscurrido}</td><td>${tickets[i].montoTotal}</td></tr>`;
    }

    document.querySelector(".data").innerHTML = body;
  };
}