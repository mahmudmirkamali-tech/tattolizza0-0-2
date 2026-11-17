import { create } from "zustand";
import type { Motif } from "./motifs";

export type { Motif };
export type Zone = "collar" | "wrist" | "rib" | "ankle" | "nape";

export const MOTIFS: { id: Motif; fa: string; complexity: number }[] = [
  { id: "bloom", fa: "شکوفه", complexity: 1.4 },
  { id: "moon", fa: "هلال", complexity: 1 },
  { id: "vine", fa: "تاک", complexity: 1.3 },
  { id: "seed", fa: "دانه", complexity: 0.9 },
  { id: "wave", fa: "موج", complexity: 1.15 },
];

export const ZONES: { id: Zone; fa: string; whisper: string; priceFactor: number }[] = [
  { id: "collar", fa: "ترقوه", whisper: "جایی که نفس دیده می‌شود", priceFactor: 1.25 },
  { id: "nape", fa: "پس‌گردن", whisper: "رازی فقط برای خودت", priceFactor: 1.35 },
  { id: "rib", fa: "پهلو", whisper: "زیر پارچه، کنار قلب", priceFactor: 1.4 },
  { id: "wrist", fa: "مچ", whisper: "خطی که هر روز می‌بینی", priceFactor: 1 },
  { id: "ankle", fa: "مچ پا", whisper: "قدمی که سبک‌تر می‌شود", priceFactor: 1.1 },
];

export const ENTRY_USD = 5;
export const PER_CM_USD = 1;

export function estimatePrice(sizeCm: number): number {
  return ENTRY_USD + sizeCm * PER_CM_USD;
}

export function formatPrice(usd: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(usd);
}

export type Placement = { x: number; y: number; scale: number; rotation: number };

type Booking = {
  name: string;
  handle: string;
  note: string;
  motif: Motif;
  zone: Zone;
  sizeCm: number;
  age: number | null;
  motherPresent: boolean;
  price: number;
  hasPhoto: boolean;
  at: string;
};

type Panel = "loom" | "reserve" | "done" | "essay" | "mirror" | "tryon" | "quote";

type State = {
  entered: boolean;
  motif: Motif;
  zone: Zone;
  panel: Panel;
  name: string;
  handle: string;
  note: string;
  sizeCm: number;
  age: number | null;
  motherPresent: boolean;
  ink: number;
  photoUrl: string | null;
  placement: Placement;
  enter: () => void;
  setMotif: (m: Motif) => void;
  setZone: (z: Zone) => void;
  setField: (k: "name" | "handle" | "note", v: string) => void;
  setSize: (n: number) => void;
  setAge: (n: number | null) => void;
  setMother: (v: boolean) => void;
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

const KEY = "tattolizza-waitlist";
const defaultPlacement: Placement = { x: 0.5, y: 0.45, scale: 1, rotation: 0 };

export const useAtelier = create<State>((set, get) => ({
  entered: false,
  motif: "bloom",
  zone: "collar",
  panel: "loom",
  name: "",
  handle: "",
  note: "",
  sizeCm: 4,
  age: null,
  motherPresent: false,
  ink: 0.85,
  photoUrl: null,
  placement: { ...defaultPlacement },
  enter: () => set({ entered: true }),
  setMotif: (motif) => set({ motif }),
  setZone: (zone) => set({ zone }),
  setField: (k, v) => set({ [k]: v }),
  setSize: (sizeCm) => set({ sizeCm }),
  setAge: (age) => set({ age, motherPresent: age !== null && age < 18 ? get().motherPresent : false }),
  setMother: (motherPresent) => set({ motherPresent }),
  setInk: (ink) => set({ ink }),
  setPhoto: (photoUrl) => {
    const prev = get().photoUrl;
    if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
    set({ photoUrl, placement: { ...defaultPlacement } });
  },
  setPlacement: (p) => set({ placement: { ...get().placement, ...p } }),
  resetPlacement: () => set({ placement: { ...defaultPlacement } }),
  openReserve: () => set({ panel: "reserve" }),
  openEssay: () => set({ panel: "essay" }),
  openMirror: () => set({ panel: "mirror" }),
  openTryon: () => set({ panel: "tryon" }),
  openQuote: () => set({ panel: "quote" }),
  backToLoom: () => set({ panel: "loom" }),
  price: () => estimatePrice(get().sizeCm),
  submit: () => {
    const s = get();
    if (s.age === null || s.age < 1) return;
    if (s.age < 18 && !s.motherPresent) return;
    const row: Booking = {
      name: s.name.trim() || "بی‌نام",
      handle: s.handle.trim(),
      note: s.note.trim(),
      motif: s.motif,
      zone: s.zone,
      sizeCm: s.sizeCm,
      age: s.age,
      motherPresent: s.motherPresent,
      price: s.price(),
      hasPhoto: Boolean(s.photoUrl),
      at: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem(KEY) || "[]") as Booking[];
      localStorage.setItem(KEY, JSON.stringify([row, ...prev].slice(0, 20)));
    } catch {
      /* quota */
    }
    set({ panel: "done" });
  },
}));
