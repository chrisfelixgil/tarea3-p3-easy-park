using EasyPark.Modelos;

namespace EasyPark.Interfaces
{
    public interface ITickets
    {
        List<VistaDetalleTickets> ticketsCobrados();
        string ticketEntrada(int id_vehiculo);
        string Salida(string codigo);
    }
}
