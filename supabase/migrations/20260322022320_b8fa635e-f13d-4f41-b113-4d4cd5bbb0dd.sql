
-- User-created templates
CREATE TABLE public.templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT '📋',
  category text NOT NULL DEFAULT 'custom',
  pages_data jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Users can view own templates and public templates
CREATE POLICY "Users can view own templates" ON public.templates
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view public templates" ON public.templates
  FOR SELECT TO authenticated
  USING (is_public = true);

CREATE POLICY "Anon can view public templates" ON public.templates
  FOR SELECT TO anon
  USING (is_public = true);

CREATE POLICY "Users can create templates" ON public.templates
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own templates" ON public.templates
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own templates" ON public.templates
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Trigger for updated_at
CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON public.templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
