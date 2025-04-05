using EasyPark.Contexto;
using Microsoft.EntityFrameworkCore;
using EasyPark.Interfaces;
using EasyPark.Modelos;

namespace EasyPark.Services
{
    public class RepositoryService<T> : IRepository<T> where T : class
    {
        private readonly EasyParkContext contexto;
        DbSet<T> dbSet;

        public RepositoryService(EasyParkContext contexto)
        {
            this.contexto = contexto;
            dbSet = contexto.Set<T>();
        }

        public string agregar(T entidad)
        {
            dbSet.Add(entidad);
            contexto.SaveChanges();

            return "Vehiculo agregado correctamente";
        }

        public string delete(int id)
        {
            var entidad = dbSet.Find(id);
            dbSet.Remove(entidad);
            contexto.SaveChanges();

            return "Vehiculo borrado correctamente";
        }

        public List<T> obtenerTodo()
        {
            return dbSet.ToList();
        }

        public string update(T entidad)
        {
            dbSet.Attach(entidad);
            contexto.Entry(entidad).State = EntityState.Modified;
            contexto.SaveChanges();

            return "Vehiculo actualizado";
        }
    }
}
