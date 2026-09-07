CREATE TABLE public.poultry_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  species text NOT NULL DEFAULT 'chicken_layer',
  breed text NOT NULL DEFAULT '',
  purpose text NOT NULL DEFAULT 'eggs',
  quantity integer NOT NULL DEFAULT 0,
  start_date date NOT NULL DEFAULT current_date,
  location text NOT NULL DEFAULT '',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.poultry_groups TO authenticated;
GRANT ALL ON public.poultry_groups TO service_role;
ALTER TABLE public.poultry_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own poultry groups select" ON public.poultry_groups FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own poultry groups insert" ON public.poultry_groups FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own poultry groups update" ON public.poultry_groups FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own poultry groups delete" ON public.poultry_groups FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER poultry_groups_touch_updated_at BEFORE UPDATE ON public.poultry_groups
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.poultry_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  group_id uuid NOT NULL REFERENCES public.poultry_groups(id) ON DELETE CASCADE,
  kind text NOT NULL,
  quantity numeric NOT NULL DEFAULT 0,
  unit text NOT NULL DEFAULT '',
  amount numeric NOT NULL DEFAULT 0,
  record_date date NOT NULL DEFAULT current_date,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX poultry_records_group_idx ON public.poultry_records (group_id, record_date DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.poultry_records TO authenticated;
GRANT ALL ON public.poultry_records TO service_role;
ALTER TABLE public.poultry_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own poultry records select" ON public.poultry_records FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own poultry records insert" ON public.poultry_records FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own poultry records update" ON public.poultry_records FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own poultry records delete" ON public.poultry_records FOR DELETE TO authenticated USING (auth.uid() = user_id);
