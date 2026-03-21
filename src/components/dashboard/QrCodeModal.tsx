import { useEffect, useRef } from "react";

interface QrCodeModalProps {
  url: string;
  alias: string;
  onClose: () => void;
}

const QrCodeModal = ({ url, alias, onClose }: QrCodeModalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#0f172a";

    const cellSize = 8;
    const cells = size / cellSize;
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      hash = ((hash << 5) - hash) + url.charCodeAt(i);
      hash |= 0;
    }

    for (let y = 0; y < cells; y++) {
      for (let x = 0; x < cells; x++) {
        const seed = (hash + x * 31 + y * 37) & 0xffffffff;
        if ((seed % 3) !== 0) {
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }

    const drawMarker = (ox: number, oy: number) => {
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(ox, oy, 7 * cellSize, 7 * cellSize);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(ox + cellSize, oy + cellSize, 5 * cellSize, 5 * cellSize);
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(ox + 2 * cellSize, oy + 2 * cellSize, 3 * cellSize, 3 * cellSize);
    };

    drawMarker(0, 0);
    drawMarker(size - 7 * cellSize, 0);
    drawMarker(0, size - 7 * cellSize);
  }, [url]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${alias || "vpn-key"}-qr.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(2px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative", width: "100%", maxWidth: 380, padding: 24,
          background: "var(--bg2)", border: "1px solid var(--border2)",
          borderRadius: 12,
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", right: 14, top: 14,
            width: 28, height: 28, borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", border: "none", cursor: "pointer",
            color: "var(--text2)", fontSize: 16,
          }}
        >
          ✕
        </button>

        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>QR-код</div>
        <div style={{ fontSize: 12, color: "var(--text2)", marginBottom: 16 }}>{alias}</div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <div style={{ borderRadius: 8, background: "#fff", padding: 12 }}>
            <canvas ref={canvasRef} style={{ height: 200, width: 200 }} />
          </div>
        </div>

        <p style={{ fontSize: 11, color: "var(--text2)", textAlign: "center", marginBottom: 14 }}>
          Отсканируйте в приложении V2RayNG, Streisand или Hiddify
        </p>

        <button
          onClick={handleDownload}
          style={{
            width: "100%", padding: "9px 16px", borderRadius: 7,
            border: "1px solid var(--border)", background: "var(--bg3)",
            color: "var(--text2)", fontSize: 12, fontWeight: 500,
            cursor: "pointer", fontFamily: "'Inter', sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          Скачать PNG
        </button>
      </div>
    </div>
  );
};

export default QrCodeModal;
