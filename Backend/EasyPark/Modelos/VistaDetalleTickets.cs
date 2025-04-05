namespace EasyPark.Modelos
{
    public class VistaDetalleTickets
    {
        public int IdEstacionamiento {  get; set; }
        public string TipoVehiculo { get; set; }
        public string Codigo { get; set; }
        public DateTime FechaHoraIngreso { get; set; }
        public DateTime FechaHoraSalida { get; set; }
        public string TiempoTranscurrido { get; set; }
        public decimal MontoTotal {  get; set; }

    }
}
