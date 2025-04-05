namespace EasyPark.Modelos
{
    public class TicketSalida
    {
        public string CodigoTicket { get; set; }
        public DateTime FechaIngreso { get; set; }
        public DateTime FechaSalida { get; set; }
        public string TiempoTotal { get; set; }
        public decimal TotalPorPagar { get; set; }
    }
}
