using EasyPark.Interfaces;
using EasyPark.Modelos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyPark.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VehiculosController : ControllerBase
    {
        private readonly IRepository<Vehiculos> service;

        public VehiculosController(IRepository<Vehiculos> service)
        {
            this.service = service;
        }

        [HttpGet("all-Vehiculos")]
        public List<Vehiculos> obtenerTodo()
        {
            return service.obtenerTodo();
        }

        [HttpPost("Nuevo-Vehiculos")]
        public string agregar(Vehiculos entidad)
        {
            return service.agregar(entidad);
        }

        [HttpDelete("Eliminar-Vehiculos")]
        public string delete(int id)
        {
            return service.delete(id);
        }

        [HttpPut("Actualizar-Vehiculo")]
        public string update(Vehiculos entidad)
        {
            return service.update(entidad);
        }


    }
}
