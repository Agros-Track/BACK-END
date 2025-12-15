# Database Migration Task List

## Priority 1: Core Location Entities (DONE ✓)
- [x] user.entity.ts - Table: user_app
- [x] farm.entity.ts - Table: farm  
- [x] lot.entity.ts - Table: lot
- [x] locations.module.ts - Import updates

## Priority 2: Locations Service & DTOs (TODO)
- [ ] locations.service.ts - Update all Finca/Lote references to Farm/Lot
- [ ] create-farm.dto.ts - Rename CreateFincaDto to CreateFarmDto + properties
- [ ] update-farm.dto.ts - Rename UpdateFincaDto to UpdateFarmDto
- [ ] create-lot.dto.ts - Rename CreateLoteDto to CreateLotDto + properties (fincaId → farmId)
- [ ] update-lot.dto.ts - Rename UpdateLoteDto to UpdateLotDto

## Priority 3: Locations Controller (TODO)
- [ ] locations.controller.ts - Update all method names and DTO references

## Priority 4: Animals Module (TODO)
- [ ] animals.entity.ts - Update column names (fincaId→farmId, loteId→lotId, codigo→code, etc.)
- [ ] animals.service.ts - Update references
- [ ] animals.controller.ts - Verify
- [ ] create-animal.dto.ts - Update property names
- [ ] update-animal.dto.ts - Verify
- [ ] animals.module.ts - Verify

## Priority 5: Weight Module (TODO)
- [ ] weight.entity.ts - Update table name to 'weight', columns (peso_id→weight_id, fecha→date, peso→weight)
- [ ] weight.service.ts - Verify
- [ ] weight.controller.ts - Verify
- [ ] create-weight.dto.ts - Verify

## Priority 6: Production Module (TODO)
- [ ] production.entity.ts - Update columns (produccion_id→production_id, fecha→date, tipo_producto→product_type, sala_origen→source_location)
- [ ] productions.service.ts - Verify
- [ ] productions.controller.ts - Verify
- [ ] create-production.dto.ts - Update properties

## Priority 7: Task Module (TODO)
- [ ] task.entity.ts - Update columns (tarea_id→task_id, titulo→title, descripcion→description, usuario_asignado_id→assigned_user_id, creado_en→created_at, actualizado_en→updated_at)
- [ ] tasks.service.ts - Verify
- [ ] tasks.controller.ts - Verify
- [ ] create-task.dto.ts - Update properties (titulo→title, descripcion→description)

## Priority 8: Feeding Module (TODO)
- [ ] feeding.entity.ts - Update table & columns (alimentacion→feeding, alimentacion_id→feeding_id, fecha_hora→date_time, aplica_a→applies_to, tipo_alimento→feed_type, unidad→unit, costo→cost)
- [ ] feeding.service.ts - Verify
- [ ] feeding.controller.ts - Verify
- [ ] create-feeding.dto.ts - Update properties

## Priority 9: Health Module (TODO)
- [ ] vaccine.entity.ts - Update table & columns (vacuna→vaccine, vacuna_id→vaccine_id, tipo→type, fecha_aplicacion→application_date, fecha_proxima→next_date, nota→note)
- [ ] disease.entity.ts - Update table & columns (enfermedad→disease, enfermedad_id→disease_id, sintomas→symptoms, diagnostico→diagnosis, gravedad→severity, fecha_registro→registration_date)
- [ ] treatment.entity.ts - Update table & columns (tratamiento→treatment, tratamiento_id→treatment_id, enfermedad_id→disease_id, medicamento→medication, dosis→dosage, duracion_dias→duration_days, fecha_inicio→start_date, fecha_fin→end_date, estado→status)
- [ ] health.service.ts - Update references
- [ ] health.controller.ts - Verify
- [ ] create-vaccine.dto.ts, create-disease.dto.ts, create-treatment.dto.ts - Update properties

## Priority 10: Movements Module (TODO)
- [ ] movement.entity.ts - Update table & columns (movimiento→lot_movement, movimiento_id→movement_id, lote_origen_id→source_lot_id, lote_destino_id→destination_lot_id, fecha→movement_date, nota→note)
- [ ] movements.service.ts - Update references
- [ ] movements.controller.ts - Verify
- [ ] create-movement.dto.ts - Update properties (loteDestinoId→destinationLotId, nota→note)
