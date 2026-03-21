import { useState, useRef, useEffect, useCallback } from "react";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  as?: "h2" | "h3" | "p" | "span" | "div";
  disabled?: boolean;
}

const EditableText = ({ value, onChange, className = "", as: Tag = "p", disabled = false }: EditableTextProps) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const startEditing = useCallback(() => {
    if (disabled) return;
    setEditing(true);
  }, [disabled]);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [editing]);

  const stopEditing = useCallback(() => {
    if (ref.current) {
      onChange(ref.current.textContent || "");
    }
    setEditing(false);
  }, [onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      stopEditing();
    }
    if (e.key === "Escape") {
      if (ref.current) ref.current.textContent = value;
      setEditing(false);
    }
  }, [stopEditing, value]);

  return (
    <Tag
      ref={ref as any}
      className={`${className} ${editing ? "outline outline-2 outline-brand/40 rounded px-1 -mx-1 bg-white/80" : disabled ? "" : "cursor-text"}`}
      contentEditable={editing}
      suppressContentEditableWarning
      onDoubleClick={(e) => {
        e.stopPropagation();
        startEditing();
      }}
      onBlur={stopEditing}
      onKeyDown={handleKeyDown}
      title={editing ? "" : disabled ? "" : "Двойной клик для редактирования"}
    >
      {!editing ? value : undefined}
    </Tag>
  );
};

export default EditableText;
