import { create } from "zustand";

export type Motif = "bloom" | "moon" | "vine" | "seed" | "wave";
export type Zone = "collar" | "wrist" | "rib" | "ankle" | "nape";

export const MOTIFS: { id: Motif; fa: string; en: string; complexity: number }[] = [
  { id: "bloom", fa: "شکوفه", en: "Bloom", complexity: 1.4 },
  { id: "moon", fa: "هلال", en: "Crescent", complexity: 1.0 },
  { id: "vine", fa: "تاک", en: "Vine", complexity: 1.3 },
  { id: "seed", fa: "دانه", en: "Seed", complexity: 0.9 },
  { id: "wave", fa: "موج", en: "Wave", complexity: 1.15 },
];

export const ZONES: { id: Zone; fa: string; whisper: string; priceFactor: number }[] = [
  { id: "collar", fa: "ترقوه", whisper: "جایی که نفس دیده می‌شود", priceFactor: 1.25 },
  { id: "nape", fa: "پس‌گردن", whisper: "رازی فقط برای خودت", priceFactor: 1.35 },
  { id: "rib", fa: "پهلو", whisper: "زیر پارچه، کنار قلب", priceFactor: 1.4 },
  { id: "wrist", fa: "مچ", whisper: "خطی که هر روز می‌بینی", priceFactor: 1.0 },
  { id: "ankle", fa: "مچ پا", whisper: "قدمی که سبک‌تر می‌شود", priceFactor: 1.1 },
];

/** قیمت پایه به تومان (تقریبی بازار تهران برای خط ظریف) */
const BASE_PRICE = 1_800_000;

export function estimatePrice(sizeCm: number, motif: Motif, zone: Zone, ink: number): number {
  const m = MOTIFS.find((x) => x.id === motif)!;
  const z = ZONES.find((x) => x.id === zone)!;
  const sizeFactor = 0.7 + sizeCm / 6;
  const inkFactor = 0.85 + ink * 0.3;
  const raw = BASE_PRICE * sizeFactor * m.complexity * z.priceFactor * inkFactor;
  // گرد کردن به ۵۰ هزار
  return Math.round(raw / 50_000) * 50_000;
}

export function formatPrice(toman: number): string {
  return new Intl.NumberFormat("fa-IR").format(toman) + " تومان";
}

type Booking = {
  name: string;
  handle: string;
  note: string;
  motif: Motif;
  zone: Zone;
  sizeCm: number;
  ink: number;
  price: number;
  hasPhoto: boolean;
  at: string;
};

export type Placement = {
  x: number; // 0–1 relative
  y: number;
  scale: number;
  rotation: number; // degrees
};

type State = {
  entered: boolean;
  motif: Motif;
  zone: Zone;
  stitch: number;
  panel: "loom" | "reserve" | "done" | "essay" | "mirror" | "tryon" | "quote";
  name: string;
  handle: string;
  note: string;
  sizeCm: number;
  ink: number;
  // photo try-on
  photoUrl: string | null;
  placement: Placement;
  // actions
  enter: () => void;
  setMotif: (m: Motif) => void;
  setZone: (z: Zone) => void;
  setField: (k: "name" | "handle" | "note", v: string) => void;
  setSize: (n: number) => void;
  setInk: (n: number) => void;
  setPhoto: (url: string | null) => void;
  setPlacement: (p: Partial<Placement>) => void;
  resetPlacement: () => void;
  openReserve: () => void;
  openEssay: () => void;
  openMirror: () => void;
  openTryon: () => void;
  openQuote: () => void;
  backToLoom: () => void;
  submit: () => void;
  price: () => number;
};

const KEY = "tattoolizza-waitlist";

const defaultPlacement: Placement = {
  x: 0.5,
  y: 0.45,
  scale: 1,
  rotation: 0,
};

export const useAtelier = create<State>((set, get) => ({
  entered: false,
  motif: "bloom",
  zone: "collar",
  stitch: 0,
  panel: "loom",
  name: "",
  handle: "",
  note: "",
  sizeCm: 4,
  ink: 0.85,
  photoUrl: null,
  placement: { ...defaultPlacement },

  enter: () => set({ entered: true, stitch: 1 }),
  setMotif: (motif) => set({ motif, stitch: get().stitch + 1 }),
  setZone: (zone) => set({ zone, stitch: get().stitch + 1 }),
  setField: (k, v) => set({ [k]: v }),
  setSize: (sizeCm) => set({ sizeCm }),
  setInk: (ink) => set({ ink }),
  setPhoto: (photoUrl) => set({ photoUrl, placement: { ...defaultPlacement } }),
  setPlacement: (p) => set({ placement: { ...get().placement, ...p } }),
  resetPlacement: () => set({ placement: { ...defaultPlacement } }),
  openReserve: () => set({ panel: "reserve" }),
  openEssay: () => set({ panel: "essay" }),
  openMirror: () => set({ panel: "mirror" }),
  openTryon: () => set({ panel: "tryon" }),
  openQuote: () => set({ panel: "quote" }),
  backToLoom: () => set({ panel: "loom" }),
  price: () => {
    const s = get();
    return estimatePrice(s.sizeCm, s.motif, s.zone, s.ink);
  },
  submit: () => {
    const s = get();
    const row: Booking = {
      name: s.name.trim() || "بی‌نام",
      handle: s.handle.trim(),
      note: s.note.trim(),
      motif: s.motif,
      zone: s.zone,
      sizeCm: s.sizeCm,
      ink: s.ink,
      price: s.price(),
      hasPhoto: !!s.photoUrl,
      at: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem(KEY) || "[]") as Booking[];
      localStorage.setItem(KEY, JSON.stringify([row, ...prev].slice(0, 20)));
    } catch {
      /* ignore */
    }
    set({ panel: "done" });
  },
}));
