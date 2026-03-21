import { useRef, useCallback, useState } from "react";
import { Search, Upload, Trash2, Image, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMediaLibrary, type MediaItem } from "@/hooks/useMediaLibrary";

interface MediaLibraryProps {
  open: boolean;
  onClose: () => void;
  siteId: string | null;
  onSelect?: (url: string) => void;
}

function formatBytes(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const MediaLibrary = ({ open, onClose, siteId, onSelect }: MediaLibraryProps) => {
  const {
    media, isLoading, searchQuery, setSearchQuery,
    upload, isUploading, deleteMedia, isDeleting,
  } = useMediaLibrary(siteId);

  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      await upload(file);
    }
  }, [upload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-3 border-b border-border shrink-0">
          <DialogTitle className="text-base font-semibold">Медиабиблиотека</DialogTitle>
        </DialogHeader>

        {/* Toolbar */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-border shrink-0">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск файлов…"
              className="pl-8 h-9 text-sm"
            />
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Button
            size="sm"
            onClick={() => fileRef.current?.click()}
            disabled={isUploading || !siteId}
            className="gap-1.5"
          >
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Загрузить
          </Button>
        </div>

        {/* Grid */}
        <div
          className={`flex-1 overflow-y-auto p-5 ${dragOver ? "bg-primary/5 ring-2 ring-inset ring-primary/20" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {!siteId ? (
            <EmptyState text="Сначала создайте или выберите сайт" />
          ) : isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : media.length === 0 ? (
            <EmptyState text={searchQuery ? "Ничего не найдено" : "Перетащите изображения сюда или нажмите «Загрузить»"} />
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {media.map((item) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  onSelect={onSelect}
                  onDelete={deleteMedia}
                  isDeleting={isDeleting}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

function MediaCard({
  item, onSelect, onDelete, isDeleting,
}: {
  item: MediaItem;
  onSelect?: (url: string) => void;
  onDelete: (item: MediaItem) => void;
  isDeleting: boolean;
}) {
  return (
    <div
      className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-muted/30 cursor-pointer hover:ring-2 hover:ring-primary/30 transition-shadow"
      onClick={() => onSelect?.(item.url)}
    >
      <img
        src={item.url}
        alt={item.alt_text || item.filename}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[11px] text-white truncate">{item.filename}</p>
        <p className="text-[10px] text-white/70">{formatBytes(item.size_bytes)}</p>
      </div>
      <button
        className="absolute top-1.5 right-1.5 p-1 rounded bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-destructive transition-all"
        onClick={(e) => { e.stopPropagation(); onDelete(item); }}
        disabled={isDeleting}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
      <Image className="h-10 w-10 opacity-30" />
      <p className="text-sm">{text}</p>
    </div>
  );
}

export default MediaLibrary;
