using Microsoft.EntityFrameworkCore;
using EasyPark.Modelos;

namespace EasyPark.Contexto
{
    public class EasyParkContext : DbContext
    {
        public EasyParkContext(DbContextOptions<EasyParkContext> db): base(db) 
        {
            
        }

        public DbSet<Vehiculos> Vehiculos { get; set; }
        public DbSet<Estacionamientos> Estacionamientos { get; set; }
        public DbSet<Tickets> Tickets { get; set; }
        public DbSet<Tarifas> Tarifas { get; set; }
        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<VistaEstacionamientos> VistaEstacionamientos { get; set; }
        public DbSet<VistaDetalleEstacionamientos> VistaDetalleEstacionamientos { get; set; }

        public DbSet<VistaEstacionamientosOcupados> VistaEstacionamientosOcupados { get; set; }
        public DbSet<VistaDetalleTickets> VistaDetalleTickets { get; set; }

        // Mapear la vista como una entidad sin clave
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<VistaEstacionamientos>(entity =>
            {
                entity.HasNoKey(); // Indica que es una vista y no tiene clave primaria
                entity.ToView("VistaEstacionamientos");
            });

            modelBuilder.Entity<VistaDetalleEstacionamientos>(entity =>
            {
                entity.HasNoKey(); // Indica que es una vista y no tiene clave primaria
                entity.ToView("VistaDetalleEstacionamientos");
            });

            modelBuilder.Entity<VistaEstacionamientosOcupados>(entity =>
            {
                entity.HasNoKey(); // Indica que es una vista y no tiene clave primaria
                entity.ToView("VistaEstacionamientosOcupados");
            });

            modelBuilder.Entity<VistaDetalleTickets>(entity =>
            {
                entity.HasNoKey(); // Indica que es una vista y no tiene clave primaria
                entity.ToView("VistaDetalleTickets");
            });

            //si no asigno un valor explícito a Fecha_hora_ingreso en el código, SQL Server usará automáticamente GETDATE()
            modelBuilder.Entity<Tickets>().Property(t => t.Fecha_hora_ingreso).HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<TicketSalida>().HasNoKey();

            

        }

    }


}
