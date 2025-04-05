using EasyPark.Contexto;
using EasyPark.Interfaces;
using EasyPark.Modelos;
using Microsoft.EntityFrameworkCore;

namespace EasyPark.Services
{
    public class TicketsService : ITickets
    {
        private readonly EasyParkContext context;

        public TicketsService(EasyParkContext context)
        {
            this.context = context;
        }

        public string ticketEntrada(int id_vehiculo)
        {

            var estacionamiento = context.Estacionamientos.FirstOrDefault(e => e.Id == id_vehiculo);

            if (id_vehiculo == null)
                throw new Exception("Ingrese un tipo de vehiculo existente");

            // Verifica capacidad total vs espacio ocupado
            if (estacionamiento.EspacioOcupado >= estacionamiento.CapacidadTotal)
            {
                return "Estacionamiento lleno. Favor volver más tarde.";
            }

            string codigo = GenerarCodigo();

            var nuevoTicket = new Tickets
            {
                CodigoTicket = codigo,
                id_vehiculo = id_vehiculo,
                id_estacionamientos = id_vehiculo
            };

            context.Tickets.Add(nuevoTicket);

            estacionamiento.EspacioOcupado += 1;

            context.SaveChanges();

            return $"Bienvenido! Su código es el {codigo}";
        }

        public string Salida(string codigo)
        {
            var resultado = context.Set<TicketSalida>()
                .FromSqlInterpolated($"EXEC CalcularPago @CodigoTicket = {codigo}")
                .AsEnumerable()
                .FirstOrDefault();

            if (resultado == null)
                return $"Error: No se encontró un ticket con el código {codigo}.";

            var ticket = context.Tickets.FirstOrDefault(t => t.CodigoTicket == codigo);

            var estacionamiento = context.Estacionamientos.FirstOrDefault(e => e.Id == ticket.id_estacionamientos);

            estacionamiento.EspacioOcupado = Math.Max(0, estacionamiento.EspacioOcupado -1);

            context.SaveChanges();

            return $"El monto total a pagar para el ticket con código {codigo} es: {resultado.TotalPorPagar:C}. Tiempo transcurrido: {resultado.TiempoTotal}.";
        }

        public List<VistaDetalleTickets> ticketsCobrados()
        {
            return context.VistaDetalleTickets.ToList();
        }

        private string GenerarCodigo()
        {
           int ultimoId = context.Tickets.Max(e => (int?)e.Id) ?? 0;
            return "TCK" + (ultimoId + 1).ToString("D3");
        }
    }
}
