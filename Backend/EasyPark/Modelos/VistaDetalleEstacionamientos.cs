namespace EasyPark.Modelos
{
    public class VistaDetalleEstacionamientos
    {
        public int IdEstacionamiento {  get; set; }
        public string? TipoVehiculo { get; set; }
        public string? Codigo { get; set; }
        public DateTime? FechaHoraIngreso { get; set; }
        public string? TiempoTranscurrido { get; set; }
    }
}
