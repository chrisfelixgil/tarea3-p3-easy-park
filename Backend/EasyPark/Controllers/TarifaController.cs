using EasyPark.Interfaces;
using EasyPark.Modelos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyPark.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TarifaController : ControllerBase
    {
        private readonly ITarifas services;

        public TarifaController(ITarifas services) 
        {
            this.services = services;
        }

        [HttpGet("All-Tarifas")]
        public List<Tarifas> allTarifas()
        {
            return services.allTarifas();
        }

        [HttpPut("Actualizar-Tarifas")]
        public string modificarTarifa(int id, decimal nuevaTarifa)
        {
           return services.modificarTarifa(id, nuevaTarifa);
        }

    }
}
