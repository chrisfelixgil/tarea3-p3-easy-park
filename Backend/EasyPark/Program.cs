
using EasyPark.Contexto;
using EasyPark.Interfaces;
using EasyPark.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace EasyPark
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //Configuración servicio CORS para consumo API
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("PermitirCORS",
                    builder => builder.AllowAnyOrigin()
                                       .AllowAnyHeader()
                                       .AllowAnyMethod());
            });

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //Conección a la base de datos
            builder.Services.AddSqlServer<EasyParkContext>(builder.Configuration.GetConnectionString("AppConnection"));

            builder.Services.AddScoped<IUsuarios, UsuariosServices>();
            builder.Services.AddScoped<ITickets, TicketsService>();
            builder.Services.AddScoped<IEstacionamientos, EstacionamientosServices>();
            builder.Services.AddScoped<ITarifas, TarifasService>();
            

            //Configurando el servicio Repositorio generico
            builder.Services.AddScoped(typeof(IRepository<>), typeof(RepositoryService<>));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //Usar Politica CORS para consumo API
            app.UseCors("PermitirCORS");

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
