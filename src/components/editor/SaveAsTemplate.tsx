import { useState } from "react";
import { X, Save, Globe, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Section } from "./types";
import type { PageInfo } from "@/hooks/useEditorData";
import type { Json } from "@/integrations/supabase/types";

interface SaveAsTemplateProps {
  open: boolean;
  onClose: () => void;
  siteId: string | null;
  pages: PageInfo[];
  currentSections: Section[];
  currentPageId: string | null;
}

const icons = ["📋", "🚀", "🎨", "🏢", "📝", "💼", "🛒", "📱", "🎯", "⚡", "🌟", "🔥"];
const categories = [
  { value: "custom", label: "Мой шаблон" },
  { value: "landing", label: "Лендинг" },
  { value: "business", label: "Бизнес" },
  { value: "portfolio", label: "Портфолио" },
  { value: "blog", label: "Блог" },
  { value: "ecommerce", label: "Магазин" },
  { value: "other", label: "Другое" },
];

const SaveAsTemplate = ({ open, onClose, siteId, pages, currentSections, currentPageId }: SaveAsTemplateProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("📋");
  const [category, setCategory] = useState("custom");
  const [isPublic, setIsPublic] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleSave = async () => {
    if (!name.trim()) { toast.error("Введите название"); return; }
    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error("Необходима авторизация"); setSaving(false); return; }

      // Collect all pages with their sections
      const pagesData: { title: string; slug: string; sections: { type: string; label: string; content: unknown }[] }[] = [];

      for (const page of pages) {
        let secs: { type: string; label: string; content: unknown }[];
        if (page.id === currentPageId) {
          secs = currentSections.map(s => ({ type: s.type, label: s.label, content: s.content }));
        } else {
          const { data } = await supabase.from("sections").select("type, label, content").eq("page_id", page.id).order("sort_order");
          secs = (data ?? []).map(s => ({ type: s.type, label: s.label, content: s.content }));
        }
        pagesData.push({ title: page.title, slug: page.slug, sections: secs });
      }

      const { error } = await supabase.from("templates").insert({
        user_id: user.id,
        name: name.trim(),
        description: description.trim(),
        icon,
        category,
        is_public: isPublic,
        pages_data: pagesData as unknown as Json,
      });

      if (error) throw error;
      toast.success("Шаблон сохранён!");
      onClose();
      setName(""); setDescription("");
    } catch (err: any) {
      toast.error(err.message ?? "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Save className="h-4 w-4 text-primary" />
            <h2 className="text-[15px] font-bold">Сохранить как шаблон</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary"><X className="h-4 w-4" /></button>
        </div>

        <div className="p-5 space-y-4">
          {/* Name */}
          <div>
            <label className="text-[11px] font-medium text-muted-foreground mb-1 block">Название</label>
            <input
              value={name} onChange={e => setName(e.target.value)}
              placeholder="Мой лендинг"
              className="w-full h-9 rounded-lg border border-border bg-background px-3 text-[13px] focus:border-primary/40 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] font-medium text-muted-foreground mb-1 block">Описание</label>
            <textarea
              value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Краткое описание шаблона..."
              className="w-full h-16 rounded-lg border border-border bg-background px-3 py-2 text-[13px] resize-none focus:border-primary/40 focus:outline-none"
            />
          </div>

          {/* Icon picker */}
          <div>
            <label className="text-[11px] font-medium text-muted-foreground mb-1 block">Иконка</label>
            <div className="flex gap-1.5 flex-wrap">
              {icons.map(ic => (
                <button
                  key={ic}
                  onClick={() => setIcon(ic)}
                  className={`w-8 h-8 rounded-lg text-lg flex items-center justify-center transition-colors ${
                    icon === ic ? "bg-primary/10 border border-primary/30" : "border border-border hover:bg-secondary"
                  }`}
                >{ic}</button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-[11px] font-medium text-muted-foreground mb-1 block">Категория</label>
            <div className="flex gap-1.5 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors ${
                    category === cat.value ? "bg-primary/10 text-primary border border-primary/30 font-medium" : "border border-border text-muted-foreground hover:bg-secondary"
                  }`}
                >{cat.label}</button>
              ))}
            </div>
          </div>

          {/* Public toggle */}
          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] w-full transition-colors ${
              isPublic ? "bg-green-50 text-green-700 border border-green-200" : "border border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            {isPublic ? <Globe className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
            {isPublic ? "Публичный — виден всем пользователям" : "Приватный — только для вас"}
          </button>

          {/* Info */}
          <div className="text-[11px] text-muted-foreground bg-secondary/50 rounded-lg p-3">
            Будет сохранено: {pages.length} {pages.length === 1 ? "страница" : "страниц"} со всеми секциями
          </div>
        </div>

        <div className="flex gap-2 p-5 border-t border-border">
          <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-border text-[13px] text-muted-foreground hover:bg-secondary transition-colors">
            Отмена
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !name.trim()}
            className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-[13px] font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {saving ? "Сохранение…" : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveAsTemplate;
