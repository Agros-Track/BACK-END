# Database Migration Mapping: Spanish to English

## Table Name Changes
| Old (Spanish) | New (English) | Entity File |
|--------------|---------------|-------------|
| usuario | user_app | user.entity.ts |
| finca | farm | farm.entity.ts |
| lote | lot | lot.entity.ts |
| animal | animal | animals.entity.ts (no change) |
| movimiento | lot_movement | movement.entity.ts |
| alimentacion | feeding | feeding.entity.ts |
| vacuna | vaccine | vaccine.entity.ts |
| enfermedad | disease | disease.entity.ts |
| tratamiento | treatment | treatment.entity.ts |
| produccion | production | production.entity.ts |
| pesaje | weight | weight.entity.ts |
| tarea | task | task.entity.ts |

## Column Name Changes by Table

### user_app (was usuario)
- usuario_id → user_id
- tenant_id → tenant_id (no change)
- role_id → role_id (no change)
- nombre → name
- email → email (no change)
- password_hash → password_hash (no change)
- estado → status
- creado_en → created_at
- actualizado_en → updated_at

### farm (was finca)
- finca_id → farm_id
- tenant_id → tenant_id (no change)
- nombre → name
- descripcion → description
- creado_en → created_at
- actualizado_en → updated_at

### lot (was lote)
- lote_id → lot_id
- finca_id → farm_id
- nombre → name
- tipo → type
- descripcion → description
- coordenadas → coordinates
- estado → status
- creado_en → created_at
- actualizado_en → updated_at

### animal
- animal_id → animal_id (no change)
- tenant_id → tenant_id (no change)
- finca_id → farm_id
- lote_id → lot_id
- codigo → code
- tipo → type
- raza → breed
- sexo → sex
- fecha_nacimiento → birth_date
- estado → status
- foto_url → photo_url
- creado_en → created_at
- actualizado_en → updated_at

### lot_movement (was movimiento)
- movimiento_id → movement_id
- animal_id → animal_id (no change)
- lote_origen_id → source_lot_id
- lote_destino_id → destination_lot_id
- fecha → movement_date
- usuario_id → user_id
- nota → note

### feeding (was alimentacion)
- alimentacion_id → feeding_id
- tenant_id → tenant_id (no change)
- fecha_hora → date_time
- usuario_id → user_id
- aplica_a → applies_to
- lote_id → lot_id
- animal_id → animal_id (no change)
- tipo_alimento → feed_type
- cantidad → quantity (no change)
- unidad → unit
- costo → cost
- creado_en → created_at

### vaccine (was vacuna)
- vacuna_id → vaccine_id
- tenant_id → tenant_id (no change)
- animal_id → animal_id (no change)
- lote_id → lot_id
- tipo → type
- fecha_aplicacion → application_date
- fecha_proxima → next_date
- usuario_id → user_id
- nota → note

### disease (was enfermedad)
- enfermedad_id → disease_id
- tenant_id → tenant_id (no change)
- animal_id → animal_id (no change)
- sintomas → symptoms
- diagnostico → diagnosis
- gravedad → severity
- fecha_registro → registration_date
- usuario_id → user_id

### treatment (was tratamiento)
- tratamiento_id → treatment_id
- tenant_id → tenant_id (no change)
- animal_id → animal_id (no change)
- enfermedad_id → disease_id
- medicamento → medication
- dosis → dosage
- duracion_dias → duration_days
- fecha_inicio → start_date
- fecha_fin → end_date
- estado → status
- usuario_id → user_id

### production (was produccion)
- produccion_id → production_id
- tenant_id → tenant_id (no change)
- animal_id → animal_id (no change)
- lote_id → lot_id
- fecha → date
- tipo_producto → product_type
- cantidad → quantity (no change)
- unidad → unit
- sala_origen → source_location
- usuario_id → user_id

### weight (was pesaje)
- peso_id → weight_id
- tenant_id → tenant_id (no change)
- animal_id → animal_id (no change)
- fecha → date
- peso → weight
- usuario_id → user_id

### task (was tarea)
- tarea_id → task_id
- tenant_id → tenant_id (no change)
- titulo → title
- descripcion → description
- usuario_asignado_id → assigned_user_id
- lote_id → lot_id
- animal_id → animal_id (no change)
- fecha → date
- hora → time
- estado → status
- creado_en → created_at
- actualizado_en → updated_at
