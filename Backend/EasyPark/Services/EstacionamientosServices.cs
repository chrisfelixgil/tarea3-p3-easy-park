using EasyPark.Contexto;
using EasyPark.Interfaces;
using EasyPark.Modelos;
using Microsoft.EntityFrameworkCore;

namespace EasyPark.Services
{
    public class EstacionamientosServices : IEstacionamientos
    {
        private readonly EasyParkContext context;

        public EstacionamientosServices(EasyParkContext context) 
        {
            this.context = context;
        }

        //Consultar configuración actual de los estacionamientos (cantidad por tipo de vehículo).
        public List<VistaEstacionamientos> AllEstacionamientos()
        {
            return context.VistaEstacionamientos.ToList();
        }

        //Ver el detalle de un estacionamiento ocupado (fecha de ingreso, tiempo transcurrido, código, tipo de vehículo).
        public VistaDetalleEstacionamientos detalleEstacionamiento(int id)
        {
            var estacionamiento = context.VistaDetalleEstacionamientos
                .FromSqlInterpolated($"SELECT * FROM VistaDetalleEstacionamientos WHERE IdEstacionamiento = {id}")
                .FirstOrDefault();

            if (estacionamiento == null)
                throw new KeyNotFoundException($"No se encontró un estacionamiento con el ID {id}.");

            return estacionamiento;
        }

        //Ver todos los estacionamientos disponibles por tipo de vehículo.
        public IEnumerable<object> Diponibles()
        {
            return context.Estacionamientos.Select(e => new
            {
                e.Id,
                e.id_vehiculo,
                e.CapacidadTotal
            }).ToList();        

        }

        //Modificar la cantidad de estacionamientos por tipo de vehículo.
        public Estacionamientos modificarEstacionamientos(int id_vehiculo, int nuevaCapacidadTotal)
        {
            var estacionamiento = context.Estacionamientos.FirstOrDefault(e => e.id_vehiculo == id_vehiculo);

            if (estacionamiento == null)
                throw new Exception($"No se encontró un estacionamiento para el id_vehiculo: {id_vehiculo}");

            estacionamiento.CapacidadTotal = nuevaCapacidadTotal;

            context.SaveChanges();

            return estacionamiento;
        }

        //Ver todos los estacionamientos ocupados por tipo de vehículo.
        public IEnumerable<object> Ocupados()
        {
            return context.VistaEstacionamientosOcupados.ToList();
        }
    }
}
