# Agro-Track - Sistema de Gestión de Ganado

## 📋 Descripción
Agro-Track es una aplicación web diseñada para la gestión integral de ganado, permitiendo a granjas y administradores llevar un control detallado de su inventario de animales, historial médico, vacunación, y personal. La plataforma está desarrollada con tecnologías modernas para ofrecer una experiencia de usuario fluida y eficiente.

## 🚀 Características Principales

- **Gestión de Ganado**: Registro y seguimiento de animales individuales
- **Control de Vacunas**: Seguimiento de vacunación y calendario de próximas dosis
- **Historial Médico**: Registro de tratamientos y condiciones de salud
- **Gestión de Granjas**: Administración de múltiples ubicaciones de granjas
- **Roles de Usuario**: Diferentes niveles de acceso para administradores y empleados
- **Reportes**: Generación de informes y estadísticas

## 🛠️ Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior) o yarn

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Agros-Track/backend.git
   cd agro-track-api
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

## 🏃 Ejecutar el Proyecto

### Modo Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run start:dev

# O para desarrollo con recarga en caliente
npm run start:debug
```

### Modo Producción
```bash
# Compilar proyecto
npm run build

# Iniciar servidor en producción
npm run start:prod
```

## 🔧 Comandos Útiles

- `npm run start`: Inicia el servidor en modo producción
- `npm run start:dev`: Inicia el servidor en modo desarrollo
- `npm run test`: Ejecuta las pruebas unitarias
- `npm run test:e2e`: Ejecuta pruebas end-to-end
- `npm run lint`: Verifica la calidad del código
- `npm run format`: Formatea el código automáticamente

## 📁 Estructura del Proyecto

```
agro-track-api/
├── src/
│   ├── modules/          # Módulos de la aplicación
│   │   ├── auth/         # Autenticación y autorización
│   │   ├── cattle/       # Gestión de ganado
│   │   ├── farm/         # Gestión de granjas
│   │   └── users/        # Gestión de usuarios
│   ├── shared/           # Código compartido
│   └── main.ts           # Punto de entrada de la aplicación
├── test/                # Pruebas
└── .env                 # Variables de entorno
```

## 📚 Documentación de la API

La documentación de la API está disponible en `/api-docs` cuando el servidor está en ejecución en modo desarrollo.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
