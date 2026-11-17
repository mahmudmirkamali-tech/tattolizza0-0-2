import { i as __toESM } from "../_runtime.mjs";
import { a as useFrame, c as BufferGeometry, d as LineBasicMaterial, f as Vector2, g as require_react, h as require_jsx_runtime, i as Canvas, l as LatheGeometry, n as Float, p as Vector3, r as OrbitControls, s as BufferAttribute, t as ContactShadows, u as Line } from "../_libs/@react-three/drei+[...].mjs";
import { n as useAtelier } from "./routes-DW_UUq9m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Scene-B3QuCRhU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function curve(samples, fn) {
	const pts = [];
	for (let i = 0; i <= samples; i++) {
		const [x, y] = fn(i / samples);
		pts.push(new Vector3(x, y, .03));
	}
	return pts;
}
function motifPoints(kind) {
	if (kind === "bloom") return curve(220, (u) => {
		const t = u * Math.PI * 8;
		const r = .11 * Math.abs(Math.sin(4 * t));
		return [Math.cos(t) * r * 1.15, Math.sin(t) * r];
	});
	if (kind === "moon") return curve(140, (u) => {
		const t = Math.PI * .25 + u * Math.PI * 1.35;
		return [Math.cos(t) * .13, Math.sin(t) * .13 * 1.05];
	});
	if (kind === "vine") return curve(180, (u) => [Math.sin(u * Math.PI * 3.2) * .07, (u - .5) * .42]);
	if (kind === "seed") return curve(160, (u) => {
		const t = u * Math.PI * 2;
		const r = .05 + .07 * Math.pow(Math.sin(t / 2), 2);
		return [Math.cos(t) * r * .72, Math.sin(t) * r * 1.25];
	});
	return curve(160, (u) => [(u - .5) * .42, Math.sin(u * Math.PI * 3) * .06]);
}
function lineFrom(kind) {
	return new BufferGeometry().setFromPoints(motifPoints(kind));
}
var ZONE_POS = {
	collar: [
		.2,
		.78,
		.2
	],
	nape: [
		0,
		1.05,
		-.12
	],
	rib: [
		.32,
		.22,
		.14
	],
	wrist: [
		.58,
		.02,
		.26
	],
	ankle: [
		.16,
		-1.12,
		.2
	]
};
function Dust() {
	const ref = (0, import_react.useRef)(null);
	const geo = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		const n = 120;
		const arr = /* @__PURE__ */ new Float32Array(360);
		for (let i = 0; i < n; i++) {
			const a = Math.random() * Math.PI * 2;
			const r = .7 + Math.random() * 1.5;
			arr[i * 3] = Math.cos(a) * r;
			arr[i * 3 + 1] = (Math.random() - .5) * 3.1;
			arr[i * 3 + 2] = Math.sin(a) * r;
		}
		g.setAttribute("position", new BufferAttribute(arr, 3));
		return g;
	}, []);
	useFrame((_, dt) => {
		if (ref.current) ref.current.rotation.y += dt * .035;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
		ref,
		geometry: geo,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			color: "#c4a265",
			size: .012,
			transparent: true,
			opacity: .5,
			sizeAttenuation: true
		})
	});
}
function DressForm() {
	const geo = (0, import_react.useMemo)(() => {
		const pts = [
			new Vector2(.055, -1.62),
			new Vector2(.09, -1.42),
			new Vector2(.115, -1.05),
			new Vector2(.1, -.72),
			new Vector2(.15, -.38),
			new Vector2(.3, -.08),
			new Vector2(.2, .22),
			new Vector2(.16, .38),
			new Vector2(.28, .62),
			new Vector2(.2, .9),
			new Vector2(.09, 1.1),
			new Vector2(.05, 1.32)
		];
		return new LatheGeometry(pts, 48);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: geo,
			castShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#f3d2c4",
				roughness: .48,
				metalness: .04
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.34,
				.72,
				.02
			],
			rotation: [
				.2,
				0,
				.55
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
				.045,
				.55,
				6,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#f3d2c4",
				roughness: .5
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.34,
				.72,
				.02
			],
			rotation: [
				.2,
				0,
				-.55
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
				.045,
				.55,
				6,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#f3d2c4",
				roughness: .5
			})]
		})
	] });
}
function InkLine({ zone }) {
	const motif = useAtelier((s) => s.motif);
	const setZone = useAtelier((s) => s.setZone);
	const pos = ZONE_POS[zone];
	const lineObj = (0, import_react.useMemo)(() => {
		const line = new Line(lineFrom(motif), new LineBasicMaterial({ color: "#3a1820" }));
		line.position.set(pos[0], pos[1], pos[2]);
		return line;
	}, [motif, pos]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", { object: lineObj }), Object.keys(ZONE_POS).map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: ZONE_POS[z],
		onClick: (e) => {
			e.stopPropagation();
			setZone(z);
		},
		onPointerOver: () => {
			document.body.style.cursor = "pointer";
		},
		onPointerOut: () => {
			document.body.style.cursor = "";
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			z === zone ? .035 : .028,
			16,
			16
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: z === zone ? "#6e2e32" : "#c4a265",
			roughness: .35,
			metalness: .4
		})]
	}, z))] });
}
function Rig() {
	const controls = (0, import_react.useRef)(null);
	const idle = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
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
		c.setAzimuthalAngle(c.getAzimuthalAngle() + dt * .15);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
		ref: controls,
		enablePan: false,
		minDistance: 2.2,
		maxDistance: 5.2,
		minPolarAngle: .75,
		maxPolarAngle: 1.55,
		target: [
			0,
			.15,
			0
		]
	});
}
function World() {
	const zone = useAtelier((s) => s.zone);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#14110f"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#14110f",
				4.5,
				9
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .38 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				2.4,
				3.2,
				2
			],
			intensity: 1.4,
			color: "#fff4e6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				-1.6,
				1.2,
				-1
			],
			intensity: 5,
			color: "#c4897c",
			distance: 6
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Float, {
			speed: 1.1,
			rotationIntensity: .04,
			floatIntensity: .12,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DressForm, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InkLine, { zone })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dust, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-1.5,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [3.2, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1c1816",
				roughness: .92
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
			position: [
				0,
				-1.49,
				0
			],
			opacity: .42,
			scale: 6,
			blur: 2.4,
			far: 3
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rig, {})
	] });
}
function AtelierScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		camera: {
			position: [
				.95,
				.35,
				2.15
			],
			fov: 34
		},
		dpr: [1, 1.6],
		gl: { antialias: true },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(World, {})
	});
}
//#endregion
export { AtelierScene };
