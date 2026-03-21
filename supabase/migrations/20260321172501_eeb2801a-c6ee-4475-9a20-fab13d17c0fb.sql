
-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Sites table
CREATE TABLE public.sites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'starter',
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, slug)
);

-- Pages table
CREATE TABLE public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES public.sites(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.pages(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_draft BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(site_id, slug)
);

-- Sections table with JSON content
CREATE TABLE public.sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  label TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  responsive_settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Page version history
CREATE TABLE public.page_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  sections_snapshot JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_id, version_number)
);

-- Media library
CREATE TABLE public.media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES public.sites(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  mime_type TEXT,
  size_bytes INTEGER,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Sites policies
CREATE POLICY "Users can view own sites" ON public.sites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own sites" ON public.sites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sites" ON public.sites FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sites" ON public.sites FOR DELETE USING (auth.uid() = user_id);

-- Pages policies (through site ownership)
CREATE POLICY "Users can view pages of own sites" ON public.pages FOR SELECT USING (EXISTS (SELECT 1 FROM public.sites WHERE sites.id = pages.site_id AND sites.user_id = auth.uid()));
CREATE POLICY "Users can create pages in own sites" ON public.pages FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.sites WHERE sites.id = pages.site_id AND sites.user_id = auth.uid()));
CREATE POLICY "Users can update pages of own sites" ON public.pages FOR UPDATE USING (EXISTS (SELECT 1 FROM public.sites WHERE sites.id = pages.site_id AND sites.user_id = auth.uid()));
CREATE POLICY "Users can delete pages of own sites" ON public.pages FOR DELETE USING (EXISTS (SELECT 1 FROM public.sites WHERE sites.id = pages.site_id AND sites.user_id = auth.uid()));

-- Sections policies (through page -> site ownership)
CREATE POLICY "Users can view sections of own pages" ON public.sections FOR SELECT USING (EXISTS (SELECT 1 FROM public.pages JOIN public.sites ON sites.id = pages.site_id WHERE pages.id = sections.page_id AND sites.user_id = auth.uid()));
CREATE POLICY "Users can create sections in own pages" ON public.sections FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.pages JOIN public.sites ON sites.id = pages.site_id WHERE pages.id = sections.page_id AND sites.user_id = auth.uid()));
CREATE POLICY "Users can update sections of own pages" ON public.sections FOR UPDATE USING (EXISTS (SELECT 1 FROM public.pages JOIN public.sites ON sites.id = pages.site_id WHERE pages.id = sections.page_id AND sites.user_id = auth.uid()));
CREATE POLICY "Users can delete sections of own pages" ON public.sections FOR DELETE USING (EXISTS (SELECT 1 FROM public.pages JOIN public.sites ON sites.id = pages.site_id WHERE pages.id = sections.page_id AND sites.user_id = auth.uid()));

-- Page versions policies
CREATE POLICY "Users can view versions of own pages" ON public.page_versions FOR SELECT USING (EXISTS (SELECT 1 FROM public.pages JOIN public.sites ON sites.id = pages.site_id WHERE pages.id = page_versions.page_id AND sites.user_id = auth.uid()));
CREATE POLICY "Users can create versions of own pages" ON public.page_versions FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.pages JOIN public.sites ON sites.id = pages.site_id WHERE pages.id = page_versions.page_id AND sites.user_id = auth.uid()));

-- Media policies
CREATE POLICY "Users can view media of own sites" ON public.media FOR SELECT USING (EXISTS (SELECT 1 FROM public.sites WHERE sites.id = media.site_id AND sites.user_id = auth.uid()));
CREATE POLICY "Users can upload media to own sites" ON public.media FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.sites WHERE sites.id = media.site_id AND sites.user_id = auth.uid()));
CREATE POLICY "Users can delete media of own sites" ON public.media FOR DELETE USING (EXISTS (SELECT 1 FROM public.sites WHERE sites.id = media.site_id AND sites.user_id = auth.uid()));

-- Indexes
CREATE INDEX idx_pages_site_id ON public.pages(site_id);
CREATE INDEX idx_pages_parent_id ON public.pages(parent_id);
CREATE INDEX idx_sections_page_id ON public.sections(page_id);
CREATE INDEX idx_sections_sort_order ON public.sections(page_id, sort_order);
CREATE INDEX idx_page_versions_page_id ON public.page_versions(page_id);
CREATE INDEX idx_media_site_id ON public.media(site_id);

-- Triggers
CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON public.sites FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sections_updated_at BEFORE UPDATE ON public.sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
