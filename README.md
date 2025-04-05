# 🚗 Easy Park - Sistema de Gestión de Parqueo

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Índice
- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## 🎯 Descripción
Easy Park es un sistema integral de gestión de parqueo diseñado para facilitar el control y administración de espacios de estacionamiento. El sistema permite gestionar entradas, salidas, tarifas y reportes de manera eficiente.

## ✨ Características
- 🔐 Sistema de autenticación seguro
- 📊 Dashboard administrativo
- 💰 Gestión de tarifas
- 📝 Registro de entradas y salidas
- 📈 Generación de reportes
- 👥 Gestión de usuarios
- 🎨 Interfaz intuitiva y responsive

## 🛠 Tecnologías Utilizadas
### Frontend
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend
- ![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-512BD4?style=for-the-badge&logo=.net&logoColor=white)
- ![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)

## 📁 Estructura del Proyecto
```
easy-park/
├── Frontend/
│   ├── admin/         # Panel de administración
│   ├── login/         # Sistema de autenticación
│   ├── salida/        # Gestión de salidas
│   ├── img/           # Recursos gráficos
│   ├── style.css      # Estilos globales
│   ├── script.js      # Funcionalidades JavaScript
│   └── entrada.html   # Gestión de entradas
│
├── Backend/
│   ├── SQL/           # Scripts de base de datos
│   └── EasyPark/      # Código fuente
│
└── LICENSE            # Licencia del proyecto
```

## ⚙️ Instalación
1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/easy-park.git
```

2. Configurar la base de datos:
   - Importar el script SQL ubicado en `Backend/SQL/`
   - Configurar las credenciales en el archivo de propiedades

3. Compilar el proyecto:
```bash
cd Backend/EasyPark
mvn clean install
```

## 🔧 Configuración
1. Configurar variables de entorno:
   - `DB_URL`: URL de la base de datos
   - `DB_USER`: Usuario de la base de datos
   - `DB_PASSWORD`: Contraseña de la base de datos

2. Configurar el servidor:
   - Puerto: 8080 (por defecto)
   - Contexto: /api

## 🚀 Uso
1. Iniciar el servidor backend:
```bash
cd Backend/EasyPark
dotnet run
```

2. Acceder a la aplicación:
   - Frontend: `https://localhost:5001`
   - API: `https://localhost:5001/api`

3. Para desarrollo:
```bash
dotnet watch run
```

4. Para publicar la aplicación:
```bash
dotnet publish -c Release
```

## 📸 Evidencias de Uso

### 🖥️ Interfaz Principal
![Interfaz Principal](Frontend/img/main-interface.png)
*Vista principal del sistema de gestión de parqueo*

### 🔐 Panel de Administración
![Panel de Administración](Frontend/img/admin-panel.png)
*Dashboard administrativo con estadísticas y controles*

### 📝 Registro de Entradas
![Registro de Entradas](Frontend/img/entrada.png)
*Formulario para registrar la entrada de vehículos*

### 💰 Gestión de Tarifas
![Gestión de Tarifas](Frontend/img/tarifas.png)
*Configuración de tarifas por tipo de vehículo*

### 📊 Reportes
![Reportes](Frontend/img/reportes.png)
*Generación de reportes y estadísticas*

### 🚗 Control de Salidas
![Control de Salidas](Frontend/img/salida.png)
*Proceso de registro de salida y facturación*

## 👥 Contribución
1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---
⌨️ con ❤️ por Christian Gil