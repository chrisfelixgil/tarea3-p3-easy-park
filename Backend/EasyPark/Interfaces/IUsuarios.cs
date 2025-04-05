using Microsoft.AspNetCore.Mvc;

namespace EasyPark.Interfaces
{
    public interface IUsuarios
    {
        IActionResult Login(string nombreUsuario, string contrasena);
    }
}
