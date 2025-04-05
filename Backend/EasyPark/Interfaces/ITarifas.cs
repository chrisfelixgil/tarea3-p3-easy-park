using EasyPark.Modelos;

namespace EasyPark.Interfaces
{
    public interface ITarifas
    {
        List<Tarifas> allTarifas();
        string modificarTarifa(int id, decimal nuevaTarifa);


    }
}
