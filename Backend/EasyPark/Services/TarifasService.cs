using EasyPark.Contexto;
using EasyPark.Interfaces;
using EasyPark.Modelos;

namespace EasyPark.Services
{
    public class TarifasService : ITarifas
    {
        private readonly EasyParkContext context;

        public TarifasService(EasyParkContext context) 
        {
            this.context = context;
        }

        public List<Tarifas> allTarifas()
        {
            return context.Tarifas.ToList();
        }

        public string modificarTarifa(int id, decimal nuevaTarifa)
        {
            var tarifas = context.Tarifas.FirstOrDefault(t => t.Id == id);

            if (tarifas == null)
                throw new Exception($"No se encontró una tarifa para el id: {id}");

            tarifas.Tarifa_por_hora = nuevaTarifa;

            context.SaveChanges();

            return "Tarifa actualizada correctamente";
        }
    }
}
