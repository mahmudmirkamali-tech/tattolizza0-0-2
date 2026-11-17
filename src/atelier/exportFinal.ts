import { PATHS, type Motif } from "./motifs";
import type { Placement } from "./store";

export async function downloadFinal(opts: {
  photoUrl: string;
  motif: Motif;
  placement: Placement;
  sizeCm: number;
  ink: number;
  caption: string;
}) {
  const img = new Image();
  img.src = opts.photoUrl;
  await img.decode();
  const canvas = document.createElement("canvas");
  const max = 1400;
  const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const base = 0.18 + opts.sizeCm / 28;
  const s = base * opts.placement.scale * Math.min(canvas.width, canvas.height);
  const cx = opts.placement.x * canvas.width;
  const cy = opts.placement.y * canvas.height;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((opts.placement.rotation * Math.PI) / 180);
  ctx.scale(s / 24, s / 24);
  ctx.translate(-12, -12);
  const path = new Path2D(PATHS[opts.motif]);
  ctx.strokeStyle = `rgba(42,18,24,${0.55 + opts.ink * 0.4})`;
  ctx.lineWidth = (0.7 + opts.ink * 1.4) * (24 / s) * (s / 24) * 1.1;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke(path);
  ctx.restore();

  ctx.fillStyle = "rgba(20,17,15,0.72)";
  ctx.fillRect(0, canvas.height - 64, canvas.width, 64);
  ctx.fillStyle = "#f4ebdf";
  ctx.font = "22px Vazirmatn, sans-serif";
  ctx.direction = "rtl";
  ctx.textAlign = "right";
  ctx.fillText(opts.caption, canvas.width - 20, canvas.height - 26);

  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "mehrkhat-final.png";
  a.click();
}
