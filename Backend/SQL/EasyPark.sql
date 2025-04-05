CREATE DATABASE EasyPark;

USE EasyPark;

CREATE TABLE Vehiculos (
    Id INT PRIMARY KEY IDENTITY(1,1),
    TipoVehiculo VARCHAR(50) NOT NULL
);

CREATE TABLE Estacionamientos (
    Id INT PRIMARY KEY IDENTITY(1,1),
    id_vehiculo INT NOT NULL,
    CapacidadTotal INT NOT NULL,
    EspacioOcupado INT NOT NULL DEFAULT 0,
    CONSTRAINT FK_Estacionamiento_Vehiculos FOREIGN KEY (id_vehiculo) REFERENCES Vehiculos(Id)
);

CREATE TABLE Tickets (
    Id INT PRIMARY KEY IDENTITY(1,1),
    CodigoTicket VARCHAR(50) UNIQUE NOT NULL,
    id_vehiculo INT NOT NULL,
    id_estacionamientos INT NOT NULL,
    Fecha_hora_ingreso DATETIME NOT NULL DEFAULT GETDATE(),
    Fecha_hora_salida DATETIME NULL,
    TiempoTotal INT NULL,
    Total_por_pagar DECIMAL(10, 2) NULL,
    CONSTRAINT FK_Tickets_Vehiculos FOREIGN KEY (id_vehiculo) REFERENCES Vehiculos(Id),
    CONSTRAINT FK_Tickets_Estacionamientos FOREIGN KEY (id_estacionamientos) REFERENCES Estacionamientos(Id)
);

CREATE TABLE Tarifas (
    Id INT PRIMARY KEY IDENTITY(1,1),
    id_vehiculo INT NOT NULL,
    Tarifa_por_hora DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_Tarifas_Vehiculos FOREIGN KEY (id_vehiculo) REFERENCES Vehiculos(Id)
);

CREATE TABLE Usuarios (
    Id INT PRIMARY KEY IDENTITY(1,1),
    nombreUsuario VARCHAR(50) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL 
);


INSERT INTO Vehiculos (TipoVehiculo)
VALUES 
('Motocicleta'),
('Carro / Jeepeta'),
('Camión');

INSERT INTO Estacionamientos (id_vehiculo, CapacidadTotal, EspacioOcupado)
VALUES 
(1, 10, 0),
(2, 5, 0),
(3, 2, 0);

INSERT INTO Tickets (CodigoTicket, id_vehiculo, id_estacionamientos)
VALUES 
('TCK002', 1, 1),
('TCK003', 1, 1),
('TCK004', 2, 2),
('TCK005', 2, 2),
('TCK006', 3, 3),
('TCK007', 3, 3);

INSERT INTO Tarifas (id_vehiculo, Tarifa_por_hora)
VALUES
(1, 25.0),
(2, 50.0),
(3, 100.0);

INSERT INTO Usuarios (nombreUsuario, contrasena)
VALUES
('admin', 'admin'),
('pedro', '123#eRdro');



-- Vista para todos los estacionamientos

CREATE VIEW VistaEstacionamientos AS
SELECT 
    e.Id AS IdEstacionamiento,
    v.TipoVehiculo,
    e.CapacidadTotal,
    e.EspacioOcupado
FROM 
    Estacionamientos e
JOIN 
    Vehiculos v ON e.id_vehiculo = v.Id;


SELECT * FROM VistaEstacionamientos;

-- Ver todos los estacionamientos disponibles por tipo de vehículo.
SELECT Id, id_vehiculo, CapacidadTotal
FROM Estacionamientos;


-- Ver el detalle de un estacionamiento ocupado (fecha de ingreso, tiempo transcurrido, código, tipo de vehículo).
CREATE VIEW VistaDetalleEstacionamientos AS
SELECT 
    t.Id AS IdEstacionamiento,
    v.TipoVehiculo,
    t.CodigoTicket AS Codigo,
    t.Fecha_hora_ingreso AS FechaHoraIngreso,
    CONCAT(
        FLOOR(CASE 
            WHEN t.Fecha_hora_salida IS NULL THEN DATEDIFF(MINUTE, t.Fecha_hora_ingreso, GETDATE())
            ELSE DATEDIFF(MINUTE, t.Fecha_hora_ingreso, t.Fecha_hora_salida)
        END / 60), 'h ',
        CASE 
            WHEN t.Fecha_hora_salida IS NULL THEN DATEDIFF(MINUTE, t.Fecha_hora_ingreso, GETDATE())
            ELSE DATEDIFF(MINUTE, t.Fecha_hora_ingreso, t.Fecha_hora_salida)
        END % 60, 'm'
    ) AS TiempoTranscurrido
FROM 
    Tickets t
JOIN 
    Estacionamientos e ON t.id_estacionamientos = e.Id
JOIN 
    Vehiculos v ON t.id_vehiculo = v.Id;

SELECT * FROM VistaDetalleEstacionamientos where IdEstacionamiento=12;
SELECT * FROM VistaDetalleEstacionamientos;



--Ver todos los estacionamientos ocupados por tipo de vehículo.
CREATE VIEW VistaEstacionamientosOcupados AS
SELECT 
    t.Id AS IdEstacionamiento, 
    v.TipoVehiculo,
    t.Fecha_hora_ingreso AS FechaHoraIngreso
FROM 
    Tickets t
JOIN 
    Estacionamientos e ON t.id_estacionamientos = e.Id
JOIN 
    Vehiculos v ON t.id_vehiculo = v.Id
WHERE 
    t.Fecha_hora_salida IS NULL;


select * from VistaEstacionamientosOcupados;


-----------------------------------------------------------

CREATE PROCEDURE CalcularPago (
    @CodigoTicket VARCHAR(50) 
)
AS
BEGIN
    
    DECLARE @FechaIngreso DATETIME;
    DECLARE @id_vehiculo INT;
    DECLARE @TarifaPorHora DECIMAL(10, 2);
    DECLARE @TiempoTotalMinutos INT;
    DECLARE @TiempoTotalHorasYMinutos VARCHAR(10); -- Variable para el tiempo formateado
    DECLARE @TotalPorPagar DECIMAL(10, 2);
    DECLARE @FechaSalida DATETIME = GETDATE();

    
    SELECT 
        @FechaIngreso = Fecha_hora_ingreso,
        @id_vehiculo = id_vehiculo
    FROM 
        Tickets
    WHERE 
        CodigoTicket = @CodigoTicket;

    
    SELECT 
        @TarifaPorHora = Tarifa_por_hora
    FROM 
        Tarifas
    WHERE 
        id_vehiculo = @id_vehiculo;

    -- Calcular tiempo total en minutos
    SET @TiempoTotalMinutos = DATEDIFF(MINUTE, @FechaIngreso, @FechaSalida);

    -- Convertir tiempo total en formato horas y minutos
    SET @TiempoTotalHorasYMinutos = CONCAT(
        FLOOR(@TiempoTotalMinutos / 60), 'h ', -- Horas 
        @TiempoTotalMinutos % 60, 'm'         -- Minutos
    );

    IF @TiempoTotalMinutos <= 15
    BEGIN
        SET @TotalPorPagar = 0;
    END
    ELSE
    BEGIN
        
        SET @TotalPorPagar = CEILING((@TiempoTotalMinutos - 15) / 60.0) * @TarifaPorHora;
    END;

    -- Actualizar el ticket con los datos calculados
    UPDATE Tickets
    SET 
        Fecha_hora_salida = @FechaSalida,
        TiempoTotal = @TiempoTotalMinutos,
        Total_por_pagar = @TotalPorPagar
    WHERE 
        CodigoTicket = @CodigoTicket;

    -- Retornar los datos calculados
    SELECT 
        @CodigoTicket AS CodigoTicket,
        @FechaIngreso AS FechaIngreso,
        @FechaSalida AS FechaSalida,
        @TiempoTotalHorasYMinutos AS TiempoTotal,
        @TotalPorPagar AS TotalPorPagar;
END;



EXEC CalcularPago @CodigoTicket = 'TCK021';


----- ----------------------------------------------------------
-- Ver los tickets cerrados
CREATE VIEW VistaDetalleTickets AS
SELECT 
    t.Id AS IdEstacionamiento,
    v.TipoVehiculo,
    t.CodigoTicket AS Codigo,
    t.Fecha_hora_ingreso AS FechaHoraIngreso,
    t.Fecha_hora_salida AS FechaHoraSalida,
    CONCAT(
        FLOOR(DATEDIFF(MINUTE, t.Fecha_hora_ingreso, t.Fecha_hora_salida) / 60), 'h ',
        DATEDIFF(MINUTE, t.Fecha_hora_ingreso, t.Fecha_hora_salida) % 60, 'm'
    ) AS TiempoTranscurrido,
    t.Total_por_pagar AS MontoTotal
FROM 
    Tickets t
JOIN 
    Estacionamientos e ON t.id_estacionamientos = e.Id
JOIN 
    Vehiculos v ON t.id_vehiculo = v.Id
WHERE 
    t.Fecha_hora_salida IS NOT NULL; 

select * from VistaDetalleTickets;



------------------------------------------------------------------------



select * from Vehiculos;
select * from Estacionamientos;
select * from Tickets;
select * from Tarifas;
select * from Usuarios;

