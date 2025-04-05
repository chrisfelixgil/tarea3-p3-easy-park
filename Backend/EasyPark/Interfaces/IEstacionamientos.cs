using EasyPark.Modelos;

namespace EasyPark.Interfaces
{
    public interface IEstacionamientos
    {
        List<VistaEstacionamientos> AllEstacionamientos();
        IEnumerable<object> Diponibles();
        IEnumerable<object> Ocupados();
        VistaDetalleEstacionamientos detalleEstacionamiento(int id);
        Estacionamientos modificarEstacionamientos(int id_vehiculo, int nuevaCapacidadTotal);
    }
}
