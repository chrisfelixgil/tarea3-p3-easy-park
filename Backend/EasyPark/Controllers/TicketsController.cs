using EasyPark.Interfaces;
using EasyPark.Modelos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyPark.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {

        private readonly ITickets services;

        public TicketsController(ITickets services)
        {
            this.services = services;
        }

        [HttpPost("Generar-Tickets")]
        public string ticketEntrada(int id_vehiculo)
        {
            return services.ticketEntrada(id_vehiculo);
        }

        [HttpPut("Salida")]
        public string Salida(string codigo)
        {
            return services.Salida(codigo);
        }

        [HttpGet("Tickets-pagos")]
        public List<VistaDetalleTickets> ticketsCobrados()
        {
            return services.ticketsCobrados();
        }
    }
}
