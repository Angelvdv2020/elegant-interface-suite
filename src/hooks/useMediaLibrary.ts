import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  mime_type: string | null;
  size_bytes: number | null;
  alt_text: string | null;
  created_at: string;
  site_id: string;
}

export function useMediaLibrary(siteId: string | null) {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: media = [], isLoading } = useQuery({
    queryKey: ["media", siteId],
    queryFn: async () => {
      if (!siteId) return [];
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .eq("site_id", siteId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as MediaItem[];
    },
    enabled: !!siteId,
  });

  const filteredMedia = media.filter((m) =>
    m.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Необходимо авторизоваться");
      if (!siteId) throw new Error("Сайт не выбран");

      const ext = file.name.split(".").pop();
      const path = `${user.id}/${siteId}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(path, file, { contentType: file.type });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(path);

      const { error: dbError } = await supabase.from("media").insert({
        site_id: siteId,
        filename: file.name,
        url: publicUrl,
        mime_type: file.type,
        size_bytes: file.size,
      });
      if (dbError) throw dbError;

      return publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media", siteId] });
      toast.success("Файл загружен");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (item: MediaItem) => {
      // Extract storage path from URL
      const urlObj = new URL(item.url);
      const pathMatch = urlObj.pathname.match(/\/storage\/v1\/object\/public\/media\/(.+)/);
      if (pathMatch) {
        await supabase.storage.from("media").remove([pathMatch[1]]);
      }
      const { error } = await supabase.from("media").delete().eq("id", item.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media", siteId] });
      toast.success("Файл удалён");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return {
    media: filteredMedia,
    isLoading,
    searchQuery,
    setSearchQuery,
    upload: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    deleteMedia: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
