using EasyPark.Contexto;
using EasyPark.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

namespace EasyPark.Services
{
    public class UsuariosServices : IUsuarios
    {
        private readonly EasyParkContext context;

        public UsuariosServices(EasyParkContext context)
        {
            this.context = context;
        }

        public IActionResult Login(string nombreUsuario, string contrasena)
        {
            try
            {
                if (string.IsNullOrEmpty(nombreUsuario) || string.IsNullOrEmpty(contrasena))
                    return new BadRequestObjectResult(new
                    {
                        ok = false,
                        mensaje = "Por favor, ingrese un nombre de usuario y una contraseña."
                    });

                var usuario = context.Usuarios.FirstOrDefault(u => (u.nombreUsuario.Equals(nombreUsuario) && u.contrasena.Equals(contrasena)));

                if (usuario == null) 
                {
                    return new UnauthorizedObjectResult(new
                    {
                        ok = false,
                        mensaje = "Credenciales invalidas. Por favor verifica el nombre de usuario y la contraseña."
                    });
                }

                return new OkObjectResult(new
                {
                    ok = true,
                    data = new
                    {
                        Id = usuario.Id,
                        nombreUsuario = usuario.nombreUsuario,
                        contrasena = usuario.contrasena
                    }
                });
            }
            catch (Exception ex)
            {
                return new ObjectResult(new
                {
                    ok = false,
                    mensaje = "Error de servidor. Por favor, intente más tarde.",
                    error = ex.Message
                })
                {
                    StatusCode = 500
                };
            }
        }
    }
}
