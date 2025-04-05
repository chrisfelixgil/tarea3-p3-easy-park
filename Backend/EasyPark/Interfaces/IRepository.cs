using EasyPark.Modelos;

namespace EasyPark.Interfaces
{
    public interface IRepository<T>
    {
        //Aplicado para la API de estacionamiento y todos sus endpoints
        List<T> obtenerTodo();
        string agregar(T entidad);
        string update(T entidad);
        string delete(int id);




    }
}
