namespace EasyPark.Modelos
{
    public class Tickets
    {
        public int Id { get; set; }
        public string CodigoTicket { get; set; }
        public int id_vehiculo { get; set; }
        public int id_estacionamientos { get; set; }
        public DateTime? Fecha_hora_ingreso { get; set; }
        public DateTime? Fecha_hora_salida { get; set; }
        public int? TiempoTotal { get; set; }
        public decimal? Total_por_pagar { get; set; }

    }
}
