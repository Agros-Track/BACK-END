## Respuesta sobre líneas comentadas en task.entity.ts Las líneas relacionadas con assignedUser (Usuario) están comentadas porque:

- Dependencia Circular Potencial: UsersModule suele ser un módulo base. Si importamos User en Task, y User (eventualmente) importara Task (para ver "mis tareas"),

- Módulo Users no verificado: Aunque existe la carpeta users, no he verificado si la entidad User está exportada correctamente o si está lista para ser usada en relaciones.