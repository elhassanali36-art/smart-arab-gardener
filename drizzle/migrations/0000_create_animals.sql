CREATE TABLE public.animals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  tag text NOT NULL,
  category text NOT NULL DEFAULT 'cattle',
  breed text NOT NULL DEFAULT '',
  gender text NOT NULL DEFAULT 'female',
  age_months integer NOT NULL DEFAULT 0,
  health text NOT NULL DEFAULT 'healthy',
  location text NOT NULL DEFAULT '',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.animals TO authenticated;
GRANT ALL ON public.animals TO service_role;

ALTER TABLE public.animals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own animals select" ON public.animals FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own animals insert" ON public.animals FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own animals update" ON public.animals FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own animals delete" ON public.animals FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX animals_user_idx ON public.animals (user_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER animals_touch_updated_at
BEFORE UPDATE ON public.animals
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.livestock_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, DELETE ON public.livestock_activities TO authenticated;
GRANT ALL ON public.livestock_activities TO service_role;

ALTER TABLE public.livestock_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own activities select" ON public.livestock_activities FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own activities insert" ON public.livestock_activities FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own activities delete" ON public.livestock_activities FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX livestock_activities_user_idx ON public.livestock_activities (user_id, created_at DESC);