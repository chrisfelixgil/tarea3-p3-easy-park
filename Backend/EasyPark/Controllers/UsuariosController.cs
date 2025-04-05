using EasyPark.Interfaces;
using EasyPark.Modelos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyPark.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarios service;

        public UsuariosController(IUsuarios service)
        {
            this.service = service;
        }

        [HttpPost("Login")]
        public IActionResult Login(string nombreUsuario, string contrasena)
        {
            return service.Login(nombreUsuario, contrasena);
        }

    }
}
