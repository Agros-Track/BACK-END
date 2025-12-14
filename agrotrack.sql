-- Schema: Gestión de Fincas Ganaderas (PostgreSQL)
-- Nota: revisa privileges y tablespaces según tu entorno.

-- -----------------------------
-- Tabla: tenant
-- -----------------------------
CREATE TABLE tenant (
  tenant_id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  logo VARCHAR(512),
  pais VARCHAR(100),
  zona_horaria VARCHAR(100),
  unidades_medida VARCHAR(20),
  idioma VARCHAR(10),
  plan VARCHAR(50),
  limite_animales INT DEFAULT 0,
  limite_usuarios INT DEFAULT 0,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT now(),
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Tabla: roles
-- -----------------------------
CREATE TABLE roles (
  role_id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  nombre VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE,
  descripcion TEXT,
  permisos JSONB DEFAULT '{}'::jsonb,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT now(),
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Tabla: usuario
-- -----------------------------
CREATE TABLE usuario (
  usuario_id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  role_id BIGINT REFERENCES roles(role_id) ON DELETE SET NULL,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(512) NOT NULL,
  estado VARCHAR(50) DEFAULT 'activo',
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT now(),
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Tabla: finca
-- -----------------------------
CREATE TABLE finca (
  finca_id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT now(),
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Tabla: lote
-- -----------------------------
CREATE TABLE lote (
  lote_id BIGSERIAL PRIMARY KEY,
  finca_id BIGINT NOT NULL REFERENCES finca(finca_id) ON DELETE CASCADE,
  nombre VARCHAR(255) NOT NULL,
  tipo VARCHAR(100),
  descripcion TEXT,
  coordenadas VARCHAR(255),
  estado VARCHAR(100),
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT now(),
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Tabla: animal
-- -----------------------------
CREATE TABLE animal (
  animal_id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  finca_id BIGINT NOT NULL REFERENCES finca(finca_id) ON DELETE CASCADE,
  lote_id BIGINT NOT NULL REFERENCES lote(lote_id) ON DELETE SET NULL,
  codigo VARCHAR(255) NOT NULL UNIQUE,
  tipo VARCHAR(50),
  raza VARCHAR(100),
  sexo VARCHAR(20),
  fecha_nacimiento DATE,
  estado VARCHAR(50) DEFAULT 'activo',
  foto_url VARCHAR(512),
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT now(),
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Tabla: movimiento_lote
-- -----------------------------
CREATE TABLE movimiento_lote (
  movimiento_id BIGSERIAL PRIMARY KEY,
  animal_id BIGINT NOT NULL REFERENCES animal(animal_id) ON DELETE CASCADE,
  lote_origen_id BIGINT REFERENCES lote(lote_id) ON DELETE SET NULL,
  lote_destino_id BIGINT REFERENCES lote(lote_id) ON DELETE SET NULL,
  fecha_movimiento TIMESTAMP WITH TIME ZONE DEFAULT now(),
  usuario_id BIGINT REFERENCES usuario(usuario_id) ON DELETE SET NULL,
  nota TEXT
);

-- -----------------------------
-- Tabla: alimentacion
-- -----------------------------
CREATE TABLE alimentacion (
  alimentacion_id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  fecha_hora TIMESTAMP WITH TIME ZONE DEFAULT now(),
  usuario_id BIGINT REFERENCES usuario(usuario_id) ON DELETE SET NULL,
  aplica_a VARCHAR(20) CHECK (aplica_a IN ('lote','animal')) DEFAULT 'lote',
  lote_id BIGINT REFERENCES lote(lote_id) ON DELETE SET NULL,
  animal_id BIGINT REFERENCES animal(animal_id) ON DELETE SET NULL,
  tipo_alimento VARCHAR(255),
  cantidad NUMERIC(12,3),
  unidad VARCHAR(20),
  costo NUMERIC(14,2),
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Tabla: vacuna
-- -----------------------------
CREATE TABLE vacuna (
  vacuna_id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  animal_id BIGINT REFERENCES animal(animal_id) ON DELETE SET NULL,
  lote_id BIGINT REFERENCES lote(lote_id) ON DELETE SET NULL,
  tipo VARCHAR(255),
  fecha_aplicacion DATE,
  fecha_proxima DATE,
  usuario_id BIGINT REFERENCES usuario(usuario_id) ON DELETE SET NULL,
  nota TEXT
);

-- -----------------------------
-- Tabla: enfermedad
-- -----------------------------
CREATE TABLE enfermedad (
  enfermedad_id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  animal_id BIGINT NOT NULL REFERENCES animal(animal_id) ON DELETE CASCADE,
  sintomas TEXT,
  diagnostico VARCHAR(255),
  gravedad VARCHAR(50),
  fecha_registro DATE DEFAULT CURRENT_DATE,
  usuario_id BIGINT REFERENCES usuario(usuario_id) ON DELETE SET NULL
);

-- -----------------------------
-- Tabla: tratamiento
-- -----------------------------
CREATE TABLE tratamiento (
  tratamiento_id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  animal_id BIGINT NOT NULL REFERENCES animal(animal_id) ON DELETE CASCADE,
  enfermedad_id BIGINT REFERENCES enfermedad(enfermedad_id) ON DELETE SET NULL,
  medicamento VARCHAR(255),
  dosis VARCHAR(255),
  duracion_dias INT,
  fecha_inicio DATE,
  fecha_fin DATE,
  estado VARCHAR(50),
  usuario_id BIGINT REFERENCES usuario(usuario_id) ON DELETE SET NULL
);

-- -----------------------------
-- Tabla: produccion
-- -----------------------------
CREATE TABLE produccion (
  produccion_id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  animal_id BIGINT REFERENCES animal(animal_id) ON DELETE SET NULL,
  lote_id BIGINT REFERENCES lote(lote_id) ON DELETE SET NULL,
  fecha DATE NOT NULL,
  producto_tipo VARCHAR(100) NOT NULL, -- e.g. 'leche', 'carne', 'huevos'
  cantidad NUMERIC(14,4) NOT NULL,
  unidad VARCHAR(50) NOT NULL,         -- e.g. 'litros', 'kg', 'unidades'
  sala_origen VARCHAR(255),
  usuario_id BIGINT REFERENCES usuario(usuario_id) ON DELETE SET NULL
);

-- -----------------------------
-- Tabla: pesaje
-- -----------------------------
CREATE TABLE pesaje (
  peso_id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  animal_id BIGINT NOT NULL REFERENCES animal(animal_id) ON DELETE CASCADE,
  fecha DATE NOT NULL,
  peso NUMERIC(12,3) NOT NULL,
  usuario_id BIGINT REFERENCES usuario(usuario_id) ON DELETE SET NULL
);

-- -----------------------------
-- Tabla: tarea
-- -----------------------------
CREATE TABLE tarea (
  tarea_id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  usuario_asignado_id BIGINT REFERENCES usuario(usuario_id) ON DELETE SET NULL,
  lote_id BIGINT REFERENCES lote(lote_id) ON DELETE SET NULL,
  animal_id BIGINT REFERENCES animal(animal_id) ON DELETE SET NULL,
  fecha DATE,
  hora TIME,
  estado VARCHAR(50) DEFAULT 'pendiente',
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT now(),
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Índices recomendados
-- -----------------------------
CREATE INDEX idx_animal_tenant ON animal(tenant_id);
CREATE INDEX idx_animal_lote ON animal(lote_id);
CREATE INDEX idx_alimentacion_tenant_fecha ON alimentacion(tenant_id, fecha_hora);
CREATE INDEX idx_produccion_tenant_fecha ON produccion(tenant_id, fecha);
CREATE INDEX idx_pesaje_tenant_fecha ON pesaje(tenant_id, fecha);
CREATE INDEX idx_vacuna_tenant_fecha ON vacuna(tenant_id, fecha_aplicacion);
CREATE INDEX idx_enfermedad_tenant_fecha ON enfermedad(tenant_id, fecha_registro);
CREATE INDEX idx_tarea_tenant_fecha ON tarea(tenant_id, fecha);

-- -----------------------------
-- Triggers/actualización de actualizado_en (opcional)
-- Si quieres mantener actualizado `actualizado_en`, puedes crear triggers.
-- Ejemplo simple para actualizar 'actualizado_en' en varias tablas:
-- -----------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.actualizado_en = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplica trigger para tablas con 'actualizado_en'
DO $$
BEGIN
  -- Lista de tablas a las que aplicar trigger
  PERFORM 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'tenant';
  -- tenant
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'tenant') THEN
    CREATE TRIGGER trg_tenant_updated_at
      BEFORE UPDATE ON tenant
      FOR EACH ROW
      EXECUTE PROCEDURE set_updated_at();
  END IF;
  -- roles
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'roles') THEN
    CREATE TRIGGER trg_roles_updated_at
      BEFORE UPDATE ON roles
      FOR EACH ROW
      EXECUTE PROCEDURE set_updated_at();
  END IF;
  -- usuario
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'usuario') THEN
    CREATE TRIGGER trg_usuario_updated_at
      BEFORE UPDATE ON usuario
      FOR EACH ROW
      EXECUTE PROCEDURE set_updated_at();
    CREATE TRIGGER trg_finca_updated_at
      BEFORE UPDATE ON finca
      FOR EACH ROW
      EXECUTE PROCEDURE set_updated_at();
    CREATE TRIGGER trg_lote_updated_at
      BEFORE UPDATE ON lote
      FOR EACH ROW
      EXECUTE PROCEDURE set_updated_at();
    CREATE TRIGGER trg_animal_updated_at
      BEFORE UPDATE ON animal
      FOR EACH ROW
      EXECUTE PROCEDURE set_updated_at();
    CREATE TRIGGER trg_tarea_updated_at
      BEFORE UPDATE ON tarea
      FOR EACH ROW
      EXECUTE PROCEDURE set_updated_at();
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Fin del script
