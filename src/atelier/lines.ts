import * as THREE from "three";
import type { Motif } from "./motifs";

function curve(samples: number, fn: (t: number) => [number, number]): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= samples; i++) {
    const [x, y] = fn(i / samples);
    pts.push(new THREE.Vector3(x, y, 0.03));
  }
  return pts;
}

export function motifPoints(kind: Motif): THREE.Vector3[] {
  if (kind === "bloom") {
    return curve(220, (u) => {
      const t = u * Math.PI * 8;
      const r = 0.11 * Math.abs(Math.sin(4 * t));
      return [Math.cos(t) * r * 1.15, Math.sin(t) * r];
    });
  }
  if (kind === "moon") {
    return curve(140, (u) => {
      const t = Math.PI * 0.25 + u * Math.PI * 1.35;
      return [Math.cos(t) * 0.13, Math.sin(t) * 0.13 * 1.05];
    });
  }
  if (kind === "vine") {
    return curve(180, (u) => [(Math.sin(u * Math.PI * 3.2) * 0.07), (u - 0.5) * 0.42]);
  }
  if (kind === "seed") {
    return curve(160, (u) => {
      const t = u * Math.PI * 2;
      const r = 0.05 + 0.07 * Math.pow(Math.sin(t / 2), 2);
      return [Math.cos(t) * r * 0.72, Math.sin(t) * r * 1.25];
    });
  }
  return curve(160, (u) => [(u - 0.5) * 0.42, Math.sin(u * Math.PI * 3) * 0.06]);
}

export function lineFrom(kind: Motif) {
  return new THREE.BufferGeometry().setFromPoints(motifPoints(kind));
}
