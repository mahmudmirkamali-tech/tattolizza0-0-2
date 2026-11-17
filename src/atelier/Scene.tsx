import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { lineFrom } from "./lines";
import { useAtelier, type Zone } from "./store";

const ZONE_POS: Record<Zone, [number, number, number]> = {
  collar: [0.2, 0.78, 0.2],
  nape: [0, 1.05, -0.12],
  rib: [0.32, 0.22, 0.14],
  wrist: [0.58, 0.02, 0.26],
  ankle: [0.16, -1.12, 0.2],
};

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = 120;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.7 + Math.random() * 1.5;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 3.1;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.035;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#c4a265" size={0.012} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function DressForm() {
  const geo = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.055, -1.62),
      new THREE.Vector2(0.09, -1.42),
      new THREE.Vector2(0.115, -1.05),
      new THREE.Vector2(0.1, -0.72),
      new THREE.Vector2(0.15, -0.38),
      new THREE.Vector2(0.3, -0.08),
      new THREE.Vector2(0.2, 0.22),
      new THREE.Vector2(0.16, 0.38),
      new THREE.Vector2(0.28, 0.62),
      new THREE.Vector2(0.2, 0.9),
      new THREE.Vector2(0.09, 1.1),
      new THREE.Vector2(0.05, 1.32),
    ];
    return new THREE.LatheGeometry(pts, 48);
  }, []);

  return (
    <group>
      <mesh geometry={geo} castShadow>
        <meshStandardMaterial color="#f3d2c4" roughness={0.48} metalness={0.04} />
      </mesh>
      <mesh position={[-0.34, 0.72, 0.02]} rotation={[0.2, 0, 0.55]}>
        <capsuleGeometry args={[0.045, 0.55, 6, 12]} />
        <meshStandardMaterial color="#f3d2c4" roughness={0.5} />
      </mesh>
      <mesh position={[0.34, 0.72, 0.02]} rotation={[0.2, 0, -0.55]}>
        <capsuleGeometry args={[0.045, 0.55, 6, 12]} />
        <meshStandardMaterial color="#f3d2c4" roughness={0.5} />
      </mesh>
    </group>
  );
}

function InkLine({ zone }: { zone: Zone }) {
  const motif = useAtelier((s) => s.motif);
  const setZone = useAtelier((s) => s.setZone);
  const pos = ZONE_POS[zone];
  const lineObj = useMemo(() => {
    const line = new THREE.Line(lineFrom(motif), new THREE.LineBasicMaterial({ color: "#3a1820" }));
    line.position.set(pos[0], pos[1], pos[2]);
    return line;
  }, [motif, pos]);

  return (
    <>
      <primitive object={lineObj} />
      {(Object.keys(ZONE_POS) as Zone[]).map((z) => (
        <mesh
          key={z}
          position={ZONE_POS[z]}
          onClick={(e) => {
            e.stopPropagation();
            setZone(z);
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
          }}
        >
          <sphereGeometry args={[z === zone ? 0.035 : 0.028, 16, 16]} />
          <meshStandardMaterial
            color={z === zone ? "#6e2e32" : "#c4a265"}
            roughness={0.35}
            metalness={0.4}
          />
        </mesh>
      ))}
    </>
  );
}

function Rig() {
  const controls = useRef<OrbitControlsImpl>(null);
  const idle = useRef(true);

  useEffect(() => {
    const stop = () => {
      idle.current = false;
    };
    window.addEventListener("pointerdown", stop, { once: true });
    return () => window.removeEventListener("pointerdown", stop);
  }, []);

  useFrame((_, dt) => {
    const c = controls.current;
    if (!c || !idle.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    c.setAzimuthalAngle(c.getAzimuthalAngle() + dt * 0.15);
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      minDistance={2.2}
      maxDistance={5.2}
      minPolarAngle={0.75}
      maxPolarAngle={1.55}
      target={[0, 0.15, 0]}
    />
  );
}

function World() {
  const zone = useAtelier((s) => s.zone);
  return (
    <>
      <color attach="background" args={["#14110f"]} />
      <fog attach="fog" args={["#14110f", 4.5, 9]} />
      <ambientLight intensity={0.38} />
      <directionalLight position={[2.4, 3.2, 2]} intensity={1.4} color="#fff4e6" />
      <pointLight position={[-1.6, 1.2, -1]} intensity={5} color="#c4897c" distance={6} />
      <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.12}>
        <group>
          <DressForm />
          <InkLine zone={zone} />
        </group>
      </Float>
      <Dust />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <circleGeometry args={[3.2, 48]} />
        <meshStandardMaterial color="#1c1816" roughness={0.92} />
      </mesh>
      <ContactShadows position={[0, -1.49, 0]} opacity={0.42} scale={6} blur={2.4} far={3} />
      <Rig />
    </>
  );
}

export function AtelierScene() {
  return (
    <Canvas camera={{ position: [0.95, 0.35, 2.15], fov: 34 }} dpr={[1, 1.6]} gl={{ antialias: true }}>
      <World />
    </Canvas>
  );
}
