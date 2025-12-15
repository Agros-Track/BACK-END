-- Schema: Livestock Farm Management (PostgreSQL)
-- Note: review privileges and tablespaces according to your environment.

-- -----------------------------
-- Table: tenant
-- -----------------------------
CREATE TABLE tenant (
    tenant_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(512),
    country VARCHAR(100),
    timezone VARCHAR(100),
    measurement_units VARCHAR(20),
    language VARCHAR(10),
    animal_limit INT DEFAULT 0,
    user_limit INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Table: roles
-- -----------------------------
CREATE TABLE roles (
    role_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Table: user_app
-- -----------------------------
CREATE TABLE user_app (
    user_id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT REFERENCES tenant(tenant_id) ON DELETE CASCADE,
    role_id BIGINT REFERENCES roles(role_id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(512) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Table: farm
-- -----------------------------
CREATE TABLE farm (
    farm_id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Table: lot
-- -----------------------------
CREATE TABLE lot (
    lot_id BIGSERIAL PRIMARY KEY,
    farm_id BIGINT NOT NULL REFERENCES farm(farm_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    description TEXT,
    coordinates VARCHAR(255),
    status VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Table: animal
-- -----------------------------
CREATE TABLE animal (
    animal_id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
    farm_id BIGINT NOT NULL REFERENCES farm(farm_id) ON DELETE CASCADE,
    lot_id BIGINT NOT NULL REFERENCES lot(lot_id) ON DELETE SET NULL,
    code VARCHAR(255) NOT NULL UNIQUE,
    type VARCHAR(50),
    breed VARCHAR(100),
    sex VARCHAR(20),
    birth_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    photo_url VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Table: lot_movement
-- -----------------------------
CREATE TABLE lot_movement (
    movement_id BIGSERIAL PRIMARY KEY,
    animal_id BIGINT NOT NULL REFERENCES animal(animal_id) ON DELETE CASCADE,
    source_lot_id BIGINT REFERENCES lot(lot_id) ON DELETE SET NULL,
    destination_lot_id BIGINT REFERENCES lot(lot_id) ON DELETE SET NULL,
    movement_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id BIGINT REFERENCES user_app(user_id) ON DELETE SET NULL,
    note TEXT
);

-- -----------------------------
-- Table: feeding
-- -----------------------------
CREATE TABLE feeding (
    feeding_id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
    date_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id BIGINT REFERENCES user_app(user_id) ON DELETE SET NULL,
    applies_to VARCHAR(20) CHECK (applies_to IN ('lot','animal')) DEFAULT 'lot',
    lot_id BIGINT REFERENCES lot(lot_id) ON DELETE SET NULL,
    animal_id BIGINT REFERENCES animal(animal_id) ON DELETE SET NULL,
    feed_type VARCHAR(255),
    quantity NUMERIC(12,3),
    unit VARCHAR(20),
    cost NUMERIC(14,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Table: vaccine
-- -----------------------------
CREATE TABLE vaccine (
    vaccine_id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
    animal_id BIGINT REFERENCES animal(animal_id) ON DELETE SET NULL,
    lot_id BIGINT REFERENCES lot(lot_id) ON DELETE SET NULL,
    type VARCHAR(255),
    application_date DATE,
    next_date DATE,
    user_id BIGINT REFERENCES user_app(user_id) ON DELETE SET NULL,
    note TEXT
);

-- -----------------------------
-- Table: disease
-- -----------------------------
CREATE TABLE disease (
    disease_id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
    animal_id BIGINT NOT NULL REFERENCES animal(animal_id) ON DELETE CASCADE,
    symptoms TEXT,
    diagnosis VARCHAR(255),
    severity VARCHAR(50),
    registration_date DATE DEFAULT CURRENT_DATE,
    user_id BIGINT REFERENCES user_app(user_id) ON DELETE SET NULL
);

-- -----------------------------
-- Table: treatment
-- -----------------------------
CREATE TABLE treatment (
    treatment_id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
    animal_id BIGINT NOT NULL REFERENCES animal(animal_id) ON DELETE CASCADE,
    disease_id BIGINT REFERENCES disease(disease_id) ON DELETE SET NULL,
    medication VARCHAR(255),
    dosage VARCHAR(255),
    duration_days INT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50),
    user_id BIGINT REFERENCES user_app(user_id) ON DELETE SET NULL
);

-- -----------------------------
-- Table: production
-- -----------------------------
CREATE TABLE production (
    production_id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
    animal_id BIGINT REFERENCES animal(animal_id) ON DELETE SET NULL,
    lot_id BIGINT REFERENCES lot(lot_id) ON DELETE SET NULL,
    date DATE NOT NULL,
    product_type VARCHAR(100) NOT NULL, -- e.g. 'milk', 'meat', 'eggs'
    quantity NUMERIC(14,4) NOT NULL,
    unit VARCHAR(50) NOT NULL,         -- e.g. 'liters', 'kg', 'units'
    source_location VARCHAR(255),
    user_id BIGINT REFERENCES user_app(user_id) ON DELETE SET NULL
);

-- -----------------------------
-- Table: weight
-- -----------------------------
CREATE TABLE weight (
    weight_id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
    animal_id BIGINT NOT NULL REFERENCES animal(animal_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    weight NUMERIC(12,3) NOT NULL,
    user_id BIGINT REFERENCES user_app(user_id) ON DELETE SET NULL
);

-- -----------------------------
-- Table: task
-- -----------------------------
CREATE TABLE task (
    task_id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(tenant_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_user_id BIGINT REFERENCES user_app(user_id) ON DELETE SET NULL,
    lot_id BIGINT REFERENCES lot(lot_id) ON DELETE SET NULL,
    animal_id BIGINT REFERENCES animal(animal_id) ON DELETE SET NULL,
    date DATE,
    time TIME,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- -----------------------------
-- Recommended indexes
-- -----------------------------
CREATE INDEX idx_animal_tenant ON animal(tenant_id);
CREATE INDEX idx_animal_lot ON animal(lot_id);
CREATE INDEX idx_feeding_tenant_date ON feeding(tenant_id, date_time);
CREATE INDEX idx_production_tenant_date ON production(tenant_id, date);
CREATE INDEX idx_weight_tenant_date ON weight(tenant_id, date);
CREATE INDEX idx_vaccine_tenant_date ON vaccine(tenant_id, application_date);
CREATE INDEX idx_disease_tenant_date ON disease(tenant_id, registration_date);
CREATE INDEX idx_task_tenant_date ON task(tenant_id, date);

-- -----------------------------
-- Triggers/updating updated_at (optional)
-- If you want to maintain `updated_at`, you can create triggers.
-- Simple example to update 'updated_at' in various tables:
-- -----------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger for tables with 'updated_at'
DO $$
BEGIN
    -- List of tables to apply trigger
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
    -- user
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_app') THEN
        CREATE TRIGGER trg_user_updated_at
            BEFORE UPDATE ON user_app
            FOR EACH ROW
            EXECUTE PROCEDURE set_updated_at();
        CREATE TRIGGER trg_farm_updated_at
            BEFORE UPDATE ON farm
            FOR EACH ROW
            EXECUTE PROCEDURE set_updated_at();
        CREATE TRIGGER trg_lot_updated_at
            BEFORE UPDATE ON lot
            FOR EACH ROW
            EXECUTE PROCEDURE set_updated_at();
        CREATE TRIGGER trg_animal_updated_at
            BEFORE UPDATE ON animal
            FOR EACH ROW
            EXECUTE PROCEDURE set_updated_at();
        CREATE TRIGGER trg_task_updated_at
            BEFORE UPDATE ON task
            FOR EACH ROW
            EXECUTE PROCEDURE set_updated_at();
    END IF;
END;
$$ LANGUAGE plpgsql;

-- End of script