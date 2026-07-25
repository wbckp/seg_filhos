-- Migration: Bloqueio de Sites e Apps
-- Execute este SQL no Supabase SQL Editor

-- Tabela: sites bloqueados por filho
CREATE TABLE IF NOT EXISTS blocked_sites (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id    uuid REFERENCES children(id) ON DELETE CASCADE,
    domain      text NOT NULL,
    created_at  timestamptz DEFAULT now(),
    UNIQUE (child_id, domain)
);

-- Tabela: apps bloqueados por filho
CREATE TABLE IF NOT EXISTS blocked_apps (
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id     uuid REFERENCES children(id) ON DELETE CASCADE,
    package_name text NOT NULL,
    app_name     text NOT NULL,
    created_at   timestamptz DEFAULT now(),
    UNIQUE (child_id, package_name)
);

-- RLS: habilitar
ALTER TABLE blocked_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_apps  ENABLE ROW LEVEL SECURITY;

-- Políticas: só o pai dono pode ver/editar
CREATE POLICY "owner_sites" ON blocked_sites
    FOR ALL USING (
        child_id IN (
            SELECT id FROM children WHERE parent_id = auth.uid()
        )
    );

CREATE POLICY "owner_apps" ON blocked_apps
    FOR ALL USING (
        child_id IN (
            SELECT id FROM children WHERE parent_id = auth.uid()
        )
    );

-- Índices
CREATE INDEX IF NOT EXISTS idx_blocked_sites_child ON blocked_sites(child_id);
CREATE INDEX IF NOT EXISTS idx_blocked_apps_child  ON blocked_apps(child_id);
