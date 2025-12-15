# Contexto del Proyecto: Agro-Track

## 1. Descripción General
Agro-Track es una plataforma para la gestión de fincas ganaderas (Multi-Tenant). Permite a diferentes administradores (tenants) gestionar sus animales, ubicaciones (fincas/lotes), producción, salud, alimentación y tareas.

## 2. Pila Tecnológica
- **Backend**: NestJS (Node.js) con TypeScript.
- **Base de Datos**: PostgreSQL.
- **ORM**: Probablemente TypeORM o Prisma (A verificar en `package.json`, pero la estructura sugiere uso de Entidades).
- **Frontend**: (Referencia: React + Vite / Flutter propuesto).

## 3. Estructura de Base de Datos (SQL Reference)
El sistema se basa en las siguientes entidades principales:

### Tenancy & Usuarios
- **tenant**: Entidad principal que agrupa los recursos.
- **roles**: Roles definidos por tenant (Admin, Analista, Afiliado).
- **usuario**: Usuarios del sistema, asociados a un tenant y rol.

### Gestión Ganadera
- **finca**: Propiedad física del tenant.
- **lote**: Subdivisiones de la finca (potreros, corrales).
- **animal**: La unidad principal. *Nota: El código es UNIQUE globalmente según SQL, lo cual es una restricción fuerte.*
- **movimiento_lote**: Historial de traslados de animales entre lotes.

### Operaciones & Salud
- **alimentacion**: Registro de alimentación (por lote o animal).
- **vacuna**: Registro de vacunación con fechas de aplicación y próxima dosis.
- **enfermedad**: Registro de diagnósticos.
- **tratamiento**: Medicación y tratamientos asociados a enfermedades.
- **pesaje**: Historial de peso de los animales.
- **produccion**: Registro de producción (leche, carne, etc.).
- **tarea**: Tareas asignadas a usuarios sobre lotes o animales.

## 4. Estado Actual del Proyecto
### Módulos Implementados (Backend)
Basado en `app/src/modules`:
- **auth**: Manejo de autenticación (JWT).
- **users**: Gestión de usuarios.
- **roles**: Gestión de roles y permisos.
- **tenant**: Gestión de inquilinos.
- **animals**: Gestión completa de animales (entidad actualizada).
- **productions**: Registro de producción.
- **tasks**: Gestión de tareas.
- **locations**: Gestión de Fincas y Lotes.

### Módulos Faltantes / Por Implementar
Para cumplir con la propuesta y el esquema SQL, faltan los siguientes módulos o funcionalidades:

1.  **[IMPLEMENTADO] Gestión de Ubicaciones (Locations Module)**
    -   **Finca**: CRUD para crear fincas.
    -   **Lote**: CRUD para crear lotes dentro de fincas.
    -   *Necesario para asignar `lote_id` y `finca_id` a los animales.*

2.  **[IMPLEMENTADO] Salud (Health Module)**
    -   **Vacunas**: Registro y alertas.
    -   **Enfermedades**: Diagnósticos.
    -   **Tratamientos**: Seguimiento.

3.  **[IMPLEMENTADO] Alimentación (Feeding Module)**
    -   Registro de consumo (`aplica_a`: lote vs animal).
    -   Historial y costos.

4.  **[IMPLEMENTADO] Movimientos (Movements Module)**
    -   Registrar cambios de lote (`movimiento_lote`).
    -   Actualizar la ubicación actual del animal (`animal.lote_id`).
    -   *CRUD y lógica transaccional completada.*

5.  **Pesaje (Weight Module)**
    -   Historial de peso para reportes de ganancia diaria.

6.  **Dashboard & Reportes**
    -   Endpoints para consolidar datos (Total animales por estado, producción mensual, alertas sanitarias).

## 5. Reglas de Negocio Clave
1.  **Multi-Tenancy**: Toda consulta y creación de datos debe estar aislada por `tenant_id`. Un usuario no debe ver datos de otro tenant.
2.  **Integridad de Ubicación**:
    -   Un animal pertenece a una Finca y un Lote actual.
    -   Al mover un animal, se crea un registro en `movimiento_lote` y se actualiza `animal.lote_id`.
3.  **Seguridad**:
    -   Endpoints protegidos por JWT.
    -   Validación de Roles (Guard `RolesGuard`) para acciones sensibles.
4.  **Unicidad de Código**:
    -   El código del animal (`animal.codigo`) es único (cuidado con colisiones entre tenants si no es compuesto).
5.  **Eliminación en Cascada**:
    -   Borrar un tenant borra todo.
    -   Borrar una finca borra sus lotes.
    -   Borrar un animal borra su historial (según configuración SQL `ON DELETE CASCADE`), aunque idealmente se debería usar un *soft delete* (`estado: inactivo`) para preservar histórico.

## 6. Siguientes Pasos Recomendados
1.  Implementar el módulo **Locations** (Finca/Lote) urgentemente, ya que es dependencia para crear animales correctamente asignados.
2.  Implementar lógica de **Movimientos** para gestionar el flujo del ganado.
3.  Desarrollar módulos de **Salud** y **Alimentación**.
4.  Construir **Dashboard** de métricas.
