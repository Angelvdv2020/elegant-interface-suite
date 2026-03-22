-- Allow anonymous users to read published sites by slug
CREATE POLICY "Public can view published sites"
ON public.sites
FOR SELECT
TO anon
USING (is_published = true);

-- Allow anonymous users to read pages of published sites
CREATE POLICY "Public can view pages of published sites"
ON public.pages
FOR SELECT
TO anon
USING (EXISTS (
  SELECT 1 FROM sites
  WHERE sites.id = pages.site_id AND sites.is_published = true
));

-- Allow anonymous users to read sections of published sites
CREATE POLICY "Public can view sections of published sites"
ON public.sections
FOR SELECT
TO anon
USING (EXISTS (
  SELECT 1 FROM pages
  JOIN sites ON sites.id = pages.site_id
  WHERE pages.id = sections.page_id AND sites.is_published = true
));