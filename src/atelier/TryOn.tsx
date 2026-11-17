import { useCallback, useRef, useState } from "react";
import { PATHS, type Motif } from "./motifs";
import { useAtelier } from "./store";

export function MotifGlyph({ id }: { id: Motif }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d={PATHS[id]} fill="none" stroke="currentColor" strokeWidth="1.2" className="stitch-line" />
    </svg>
  );
}

export function TryOnCanvas() {
  const motif = useAtelier((s) => s.motif);
  const sizeCm = useAtelier((s) => s.sizeCm);
  const ink = useAtelier((s) => s.ink);
  const photoUrl = useAtelier((s) => s.photoUrl);
  const placement = useAtelier((s) => s.placement);
  const setPlacement = useAtelier((s) => s.setPlacement);
  const setPhoto = useAtelier((s) => s.setPhoto);
  const resetPlacement = useAtelier((s) => s.resetPlacement);

  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, px: 0, py: 0 });

  const onFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;
      setPhoto(URL.createObjectURL(file));
    },
    [setPhoto],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    if (!photoUrl) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, px: placement.x, py: placement.y };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = (e.clientX - dragStart.current.x) / rect.width;
    const dy = (e.clientY - dragStart.current.y) / rect.height;
    setPlacement({
      x: Math.min(0.92, Math.max(0.08, dragStart.current.px + dx)),
      y: Math.min(0.92, Math.max(0.08, dragStart.current.py + dy)),
    });
  };

  const baseScale = 0.18 + sizeCm / 28;
  const finalScale = baseScale * placement.scale;
  const strokeW = 0.7 + ink * 1.4;

  if (!photoUrl) {
    return (
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gold/40 bg-ink/60 px-4 py-10 text-center">
        <span className="font-display text-2xl text-gold">عکس خودت</span>
        <span className="max-w-xs text-xs leading-relaxed text-mist">
          عکس واضح از محل تتو بگیر. فقط روی همین دستگاه می‌ماند و جایی آپلود نمی‌شود.
        </span>
        <span className="mt-1 min-h-11 rounded-full bg-paper px-5 py-2 text-sm font-medium text-ink">
          انتخاب عکس
        </span>
        <input type="file" accept="image/*" capture="environment" className="hidden" onChange={onFile} />
      </label>
    );
  }

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-wine"
        style={{ touchAction: "none" }}
      >
        <img src={photoUrl} alt="پوست شما" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <div
          className="absolute cursor-grab active:cursor-grabbing"
          style={{
            left: `${placement.x * 100}%`,
            top: `${placement.y * 100}%`,
            transform: `translate(-50%, -50%) rotate(${placement.rotation}deg) scale(${finalScale})`,
            width: 120,
            height: 120,
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
        >
          <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
            <path
              d={PATHS[motif]}
              fill="none"
              stroke="#2a1218"
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.55 + ink * 0.4}
            />
          </svg>
        </div>
        <p className="absolute inset-x-2 bottom-2 rounded-lg bg-ink/70 px-2 py-1 text-center text-xs text-mist">
          نقش را بکش تا جایش درست شود
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-mist">
        <label>
          بزرگ‌نمایی
          <input
            type="range"
            min={0.5}
            max={2.2}
            step={0.05}
            value={placement.scale}
            onChange={(e) => setPlacement({ scale: Number(e.target.value) })}
            className="mt-1 w-full"
          />
        </label>
        <label>
          چرخش
          <input
            type="range"
            min={-45}
            max={45}
            step={1}
            value={placement.rotation}
            onChange={(e) => setPlacement({ rotation: Number(e.target.value) })}
            className="mt-1 w-full"
          />
        </label>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={resetPlacement} className="min-h-11 flex-1 rounded-full border border-gold/40 text-xs">
          ریست جایگذاری
        </button>
        <label className="min-h-11 flex-1 cursor-pointer rounded-full border border-gold/40 text-center text-xs leading-10">
          عوض کردن عکس
          <input type="file" accept="image/*" className="hidden" onChange={onFile} />
        </label>
      </div>
    </div>
  );
}
