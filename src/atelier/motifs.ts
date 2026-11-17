export type Motif = "bloom" | "moon" | "vine" | "seed" | "wave";

export const PATHS: Record<Motif, string> = {
  bloom: "M12 13c2-4 6-4 6 0s-4 5-6 5-6-1-6-5 4-4 6 0z",
  moon: "M14 6a6 6 0 1 0 4 10 5 5 0 1 1-4-10z",
  vine: "M12 18c0-4 2-5 2-8a3 3 0 1 0-3 3c2 0 3-1 4-3",
  seed: "M12 6c3 3 3 9 0 12-3-3-3-9 0-12z",
  wave: "M4 13c2-3 4 3 6 0s4 3 6 0 4 3 4 0",
};
