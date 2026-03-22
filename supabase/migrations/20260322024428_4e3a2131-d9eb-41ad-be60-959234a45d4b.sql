-- Unique constraint on site slug
ALTER TABLE public.sites ADD CONSTRAINT sites_slug_unique UNIQUE (slug);

-- Plan limits function
CREATE OR REPLACE FUNCTION public.check_plan_limits()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  site_plan text;
  site_count integer;
  page_count integer;
  max_sites integer;
  max_pages integer;
BEGIN
  IF TG_TABLE_NAME = 'sites' THEN
    SELECT count(*) INTO site_count FROM sites WHERE user_id = NEW.user_id;
    IF NEW.plan IS NULL OR NEW.plan = 'starter' THEN
      max_sites := 3;
    ELSE
      max_sites := 50;
    END IF;
    IF site_count >= max_sites THEN
      RAISE EXCEPTION 'Лимит тарифа: максимум % сайтов на плане %', max_sites, COALESCE(NEW.plan, 'starter');
    END IF;
  END IF;

  IF TG_TABLE_NAME = 'pages' THEN
    SELECT s.plan INTO site_plan FROM sites s WHERE s.id = NEW.site_id;
    SELECT count(*) INTO page_count FROM pages WHERE site_id = NEW.site_id;
    IF site_plan IS NULL OR site_plan = 'starter' THEN
      max_pages := 5;
    ELSE
      max_pages := 50;
    END IF;
    IF page_count >= max_pages THEN
      RAISE EXCEPTION 'Лимит тарифа: максимум % страниц на плане %', max_pages, COALESCE(site_plan, 'starter');
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER check_sites_limit
  BEFORE INSERT ON public.sites
  FOR EACH ROW
  EXECUTE FUNCTION public.check_plan_limits();

CREATE TRIGGER check_pages_limit
  BEFORE INSERT ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION public.check_plan_limits();