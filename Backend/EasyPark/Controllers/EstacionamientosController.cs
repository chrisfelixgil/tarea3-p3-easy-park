using EasyPark.Interfaces;
using EasyPark.Modelos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyPark.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EstacionamientosController : ControllerBase
    {
        private readonly IEstacionamientos service;

        public EstacionamientosController(IEstacionamientos service)
        {
            this.service = service;
        }

        [HttpGet("allEstacionamientos")]
        public ActionResult AllEstacionamientos()
        {
            return Ok(service.AllEstacionamientos());
        }

        [HttpGet("Estacionamientos-Disponibles")]
        public IEnumerable<object> Diponibles()
        {
            return service.Diponibles();
        }

        [HttpGet("Estacionamientos-Ocupados")]
        public IEnumerable<object> Ocupados()
        {
            return service.Ocupados();
        }

        [HttpPut("Modificar-Capacidad")]
        public Estacionamientos modificarEstacionamientos(int id_vehiculo, int nuevaCapacidadTotal)
        {
            return service.modificarEstacionamientos(id_vehiculo, nuevaCapacidadTotal);
        }

        [HttpGet("Detalle-Estacionamiento")]
        public VistaDetalleEstacionamientos detalleEstacionamiento(int id)
        {
            return service.detalleEstacionamiento(id);
        }
    }
}
