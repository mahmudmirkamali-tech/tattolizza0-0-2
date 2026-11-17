import { i as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DW_UUq9m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var MOTIFS = [
	{
		id: "bloom",
		fa: "شکوفه",
		complexity: 1.4
	},
	{
		id: "moon",
		fa: "هلال",
		complexity: 1
	},
	{
		id: "vine",
		fa: "تاک",
		complexity: 1.3
	},
	{
		id: "seed",
		fa: "دانه",
		complexity: .9
	},
	{
		id: "wave",
		fa: "موج",
		complexity: 1.15
	}
];
var ZONES = [
	{
		id: "collar",
		fa: "ترقوه",
		whisper: "جایی که نفس دیده می‌شود",
		priceFactor: 1.25
	},
	{
		id: "nape",
		fa: "پس‌گردن",
		whisper: "رازی فقط برای خودت",
		priceFactor: 1.35
	},
	{
		id: "rib",
		fa: "پهلو",
		whisper: "زیر پارچه، کنار قلب",
		priceFactor: 1.4
	},
	{
		id: "wrist",
		fa: "مچ",
		whisper: "خطی که هر روز می‌بینی",
		priceFactor: 1
	},
	{
		id: "ankle",
		fa: "مچ پا",
		whisper: "قدمی که سبک‌تر می‌شود",
		priceFactor: 1.1
	}
];
var BASE_PRICE = 18e5;
function estimatePrice(sizeCm, motif, zone, ink) {
	const m = MOTIFS.find((x) => x.id === motif);
	const z = ZONES.find((x) => x.id === zone);
	const sizeFactor = .7 + sizeCm / 6;
	const inkFactor = .85 + ink * .3;
	const raw = BASE_PRICE * sizeFactor * m.complexity * z.priceFactor * inkFactor;
	return Math.round(raw / 5e4) * 5e4;
}
function formatPrice(toman) {
	return new Intl.NumberFormat("fa-IR").format(toman) + " تومان";
}
var KEY = "mehrkhat-waitlist";
var defaultPlacement = {
	x: .5,
	y: .45,
	scale: 1,
	rotation: 0
};
var useAtelier = create((set, get) => ({
	entered: false,
	motif: "bloom",
	zone: "collar",
	panel: "loom",
	name: "",
	handle: "",
	note: "",
	sizeCm: 4,
	ink: .85,
	photoUrl: null,
	placement: { ...defaultPlacement },
	enter: () => set({ entered: true }),
	setMotif: (motif) => set({ motif }),
	setZone: (zone) => set({ zone }),
	setField: (k, v) => set({ [k]: v }),
	setSize: (sizeCm) => set({ sizeCm }),
	setInk: (ink) => set({ ink }),
	setPhoto: (photoUrl) => {
		const prev = get().photoUrl;
		if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
		set({
			photoUrl,
			placement: { ...defaultPlacement }
		});
	},
	setPlacement: (p) => set({ placement: {
		...get().placement,
		...p
	} }),
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
		const row = {
			name: s.name.trim() || "بی‌نام",
			handle: s.handle.trim(),
			note: s.note.trim(),
			motif: s.motif,
			zone: s.zone,
			sizeCm: s.sizeCm,
			ink: s.ink,
			price: s.price(),
			hasPhoto: Boolean(s.photoUrl),
			at: (/* @__PURE__ */ new Date()).toISOString()
		};
		try {
			const prev = JSON.parse(localStorage.getItem(KEY) || "[]");
			localStorage.setItem(KEY, JSON.stringify([row, ...prev].slice(0, 20)));
		} catch {}
		set({ panel: "done" });
	}
}));
var PATHS = {
	bloom: "M12 13c2-4 6-4 6 0s-4 5-6 5-6-1-6-5 4-4 6 0z",
	moon: "M14 6a6 6 0 1 0 4 10 5 5 0 1 1-4-10z",
	vine: "M12 18c0-4 2-5 2-8a3 3 0 1 0-3 3c2 0 3-1 4-3",
	seed: "M12 6c3 3 3 9 0 12-3-3-3-9 0-12z",
	wave: "M4 13c2-3 4 3 6 0s4 3 6 0 4 3 4 0"
};
async function downloadFinal(opts) {
	const img = new Image();
	img.src = opts.photoUrl;
	await img.decode();
	const canvas = document.createElement("canvas");
	const scale = Math.min(1, 1400 / Math.max(img.naturalWidth, img.naturalHeight));
	canvas.width = Math.round(img.naturalWidth * scale);
	canvas.height = Math.round(img.naturalHeight * scale);
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	const s = (.18 + opts.sizeCm / 28) * opts.placement.scale * Math.min(canvas.width, canvas.height);
	const cx = opts.placement.x * canvas.width;
	const cy = opts.placement.y * canvas.height;
	ctx.save();
	ctx.translate(cx, cy);
	ctx.rotate(opts.placement.rotation * Math.PI / 180);
	ctx.scale(s / 24, s / 24);
	ctx.translate(-12, -12);
	const path = new Path2D(PATHS[opts.motif]);
	ctx.strokeStyle = `rgba(42,18,24,${.55 + opts.ink * .4})`;
	ctx.lineWidth = (.7 + opts.ink * 1.4) * (24 / s) * (s / 24) * 1.1;
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
function MotifGlyph({ id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "h-5 w-5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: PATHS[id],
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.2",
			className: "stitch-line"
		})
	});
}
function TryOnCanvas() {
	const motif = useAtelier((s) => s.motif);
	const sizeCm = useAtelier((s) => s.sizeCm);
	const ink = useAtelier((s) => s.ink);
	const photoUrl = useAtelier((s) => s.photoUrl);
	const placement = useAtelier((s) => s.placement);
	const setPlacement = useAtelier((s) => s.setPlacement);
	const setPhoto = useAtelier((s) => s.setPhoto);
	const resetPlacement = useAtelier((s) => s.resetPlacement);
	const containerRef = (0, import_react.useRef)(null);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const dragStart = (0, import_react.useRef)({
		x: 0,
		y: 0,
		px: 0,
		py: 0
	});
	const onFile = (0, import_react.useCallback)((e) => {
		const file = e.target.files?.[0];
		if (!file || !file.type.startsWith("image/")) return;
		setPhoto(URL.createObjectURL(file));
	}, [setPhoto]);
	const onPointerDown = (e) => {
		if (!photoUrl) return;
		e.currentTarget.setPointerCapture(e.pointerId);
		setDragging(true);
		dragStart.current = {
			x: e.clientX,
			y: e.clientY,
			px: placement.x,
			py: placement.y
		};
	};
	const onPointerMove = (e) => {
		if (!dragging || !containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const dx = (e.clientX - dragStart.current.x) / rect.width;
		const dy = (e.clientY - dragStart.current.y) / rect.height;
		setPlacement({
			x: Math.min(.92, Math.max(.08, dragStart.current.px + dx)),
			y: Math.min(.92, Math.max(.08, dragStart.current.py + dy))
		});
	};
	const finalScale = (.18 + sizeCm / 28) * placement.scale;
	const strokeW = .7 + ink * 1.4;
	if (!photoUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gold/40 bg-ink/60 px-4 py-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-2xl text-gold",
				children: "عکس خودت"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "max-w-xs text-xs leading-relaxed text-mist",
				children: "عکس واضح از محل تتو بگیر. فقط روی همین دستگاه می‌ماند و جایی آپلود نمی‌شود."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 min-h-11 rounded-full bg-paper px-5 py-2 text-sm font-medium text-ink",
				children: "انتخاب عکس"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept: "image/*",
				capture: "environment",
				className: "hidden",
				onChange: onFile
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: containerRef,
				className: "relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-wine",
				style: { touchAction: "none" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photoUrl,
						alt: "پوست شما",
						className: "absolute inset-0 h-full w-full object-cover",
						draggable: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute cursor-grab active:cursor-grabbing",
						style: {
							left: `${placement.x * 100}%`,
							top: `${placement.y * 100}%`,
							transform: `translate(-50%, -50%) rotate(${placement.rotation}deg) scale(${finalScale})`,
							width: 120,
							height: 120
						},
						onPointerDown,
						onPointerMove,
						onPointerUp: () => setDragging(false),
						onPointerCancel: () => setDragging(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 24 24",
							className: "h-full w-full",
							"aria-hidden": true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: PATHS[motif],
								fill: "none",
								stroke: "#2a1218",
								strokeWidth: strokeW,
								strokeLinecap: "round",
								strokeLinejoin: "round",
								opacity: .55 + ink * .4
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "absolute inset-x-2 bottom-2 rounded-lg bg-ink/70 px-2 py-1 text-center text-xs text-mist",
						children: "نقش را بکش تا جایش درست شود"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 text-xs text-mist",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["بزرگ‌نمایی", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: .5,
					max: 2.2,
					step: .05,
					value: placement.scale,
					onChange: (e) => setPlacement({ scale: Number(e.target.value) }),
					className: "mt-1 w-full"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["چرخش", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: -45,
					max: 45,
					step: 1,
					value: placement.rotation,
					onChange: (e) => setPlacement({ rotation: Number(e.target.value) }),
					className: "mt-1 w-full"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: resetPlacement,
					className: "min-h-11 flex-1 rounded-full border border-gold/40 text-xs",
					children: "ریست جایگذاری"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "min-h-11 flex-1 cursor-pointer rounded-full border border-gold/40 text-center text-xs leading-10",
					children: ["عوض کردن عکس", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: onFile
					})]
				})]
			})
		]
	});
}
function Dock() {
	const motif = useAtelier((s) => s.motif);
	const zone = useAtelier((s) => s.zone);
	const panel = useAtelier((s) => s.panel);
	const name = useAtelier((s) => s.name);
	const handle = useAtelier((s) => s.handle);
	const note = useAtelier((s) => s.note);
	const sizeCm = useAtelier((s) => s.sizeCm);
	const ink = useAtelier((s) => s.ink);
	const photoUrl = useAtelier((s) => s.photoUrl);
	const placement = useAtelier((s) => s.placement);
	const setMotif = useAtelier((s) => s.setMotif);
	const setZone = useAtelier((s) => s.setZone);
	const setField = useAtelier((s) => s.setField);
	const setSize = useAtelier((s) => s.setSize);
	const setInk = useAtelier((s) => s.setInk);
	const openReserve = useAtelier((s) => s.openReserve);
	const openEssay = useAtelier((s) => s.openEssay);
	const openMirror = useAtelier((s) => s.openMirror);
	const openTryon = useAtelier((s) => s.openTryon);
	const openQuote = useAtelier((s) => s.openQuote);
	const backToLoom = useAtelier((s) => s.backToLoom);
	const submit = useAtelier((s) => s.submit);
	const price = useAtelier((s) => s.price);
	const zoneMeta = ZONES.find((z) => z.id === zone);
	const motifMeta = MOTIFS.find((m) => m.id === motif);
	const currentPrice = price();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "pointer-events-auto max-h-[80dvh] w-full max-w-xl overflow-y-auto rounded-3xl border border-gold/30 bg-veil/90 p-4 text-paper shadow-2xl backdrop-blur-md sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-3 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm tracking-widest text-gold",
						children: "MEHRKHAT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-medium leading-tight",
						children: "مهرخط"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-blush",
						children: "استودیو خصوصی بانوان"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-36 text-left text-xs leading-relaxed text-mist",
					children: zoneMeta.whisper
				})]
			}),
			panel === "loom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm leading-relaxed text-paper/90",
					children: "نقطه طلایی را لمس کن، نقش را انتخاب کن، بعد روی پوست خودت ببین."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 flex flex-wrap gap-2",
					children: ZONES.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setZone(z.id),
						className: "min-h-11 rounded-full border px-3 text-sm " + (zone === z.id ? "border-blush bg-blush text-ink" : "border-gold/40 text-paper"),
						children: z.fa
					}, z.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 grid grid-cols-5 gap-2",
					children: MOTIFS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMotif(m.id),
						className: "flex min-h-14 flex-col items-center justify-center rounded-2xl border text-xs " + (motif === m.id ? "border-gold bg-gold/15 text-gold" : "border-paper/15 text-mist"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotifGlyph, { id: m.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1",
							children: m.fa
						})]
					}, m.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: openTryon,
						className: "min-h-11 rounded-full border border-gold/50 bg-gold/10 text-sm text-gold",
						children: "روی پوست خودم"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: openMirror,
						className: "min-h-11 rounded-full border border-gold/40 text-sm",
						children: "پیش‌نمایش ساده"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: openQuote,
						className: "min-h-11 flex-1 rounded-full border border-blush/60 text-sm text-blush",
						children: "قیمت و فاینال"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: openEssay,
						className: "min-h-11 flex-1 rounded-full border border-gold/40 text-sm",
						children: "فلسفه خط"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: openReserve,
					className: "min-h-12 w-full rounded-full bg-paper text-sm font-medium text-ink",
					children: "این نقش را برای جلسه نگه دار"
				})
			] }),
			panel === "tryon" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: "عکس محل تتو را بگذار و نقش را جابه‌جا کن."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TryOnCanvas, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: backToLoom,
							className: "min-h-11 flex-1 rounded-full border border-gold/40 text-sm",
							children: "برگشت"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: openQuote,
							className: "min-h-11 flex-1 rounded-full bg-blush text-sm font-medium text-ink",
							children: "ادامه به قیمت"
						})]
					})
				]
			}),
			panel === "mirror" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-sm text-mist",
					children: "اندازه و غلظت خط را تنظیم کن."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinMirror, {
					motif,
					sizeCm,
					ink,
					label: `${motifMeta.fa} · ${zoneMeta.fa}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block text-xs text-mist",
					children: [
						"اندازه تقریبی: ",
						sizeCm,
						" سانتی‌متر",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 1.5,
							max: 9,
							step: .5,
							value: sizeCm,
							onChange: (e) => setSize(Number(e.target.value)),
							className: "mt-1 w-full"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-2 block text-xs text-mist",
					children: ["غلظت خط", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: .35,
						max: 1,
						step: .05,
						value: ink,
						onChange: (e) => setInk(Number(e.target.value)),
						className: "mt-1 w-full"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: backToLoom,
						className: "min-h-11 flex-1 rounded-full border border-gold/40 text-sm",
						children: "برگشت"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: openTryon,
						className: "min-h-11 flex-1 rounded-full bg-gold/20 text-sm text-gold",
						children: "روی عکس خودم"
					})]
				})
			] }),
			panel === "quote" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-gold/30 bg-ink/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-gold",
								children: "فاینال برای تتوکار"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-1 font-display text-3xl text-paper",
								children: [
									motifMeta.fa,
									" · ",
									zoneMeta.fa
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-3 space-y-1 text-sm text-mist",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"اندازه تقریبی: ",
										sizeCm,
										" سانتی‌متر"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"غلظت خط: ",
										Math.round(ink * 100),
										"٪"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["محل: ", zoneMeta.fa] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: photoUrl ? "پیش‌نمایش روی عکس شخصی آماده است" : "هنوز عکسی نگذاشته‌ای" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 border-t border-gold/20 pt-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-mist",
										children: "برآورد قیمت"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-2xl text-gold",
										children: formatPrice(currentPrice)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs leading-relaxed text-mist",
										children: "قیمت نهایی بعد از دیدن پوست توسط هنرمند مشخص می‌شود."
									})
								]
							})
						]
					}),
					photoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 w-full rounded-full border border-gold/40 text-sm",
						onClick: () => void downloadFinal({
							photoUrl,
							motif,
							placement,
							sizeCm,
							ink,
							caption: `${motifMeta.fa} · ${zoneMeta.fa} · ${sizeCm}cm · ${formatPrice(currentPrice)}`
						}),
						children: "دانلود فاینال برای تتوکار"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: backToLoom,
							className: "min-h-11 flex-1 rounded-full border border-gold/40 text-sm",
							children: "برگشت"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: openReserve,
							className: "min-h-11 flex-1 rounded-full bg-paper text-sm font-medium text-ink",
							children: "ثبت در لیست انتظار"
						})]
					})
				]
			}),
			panel === "essay" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "text-sm leading-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-gold",
						children: "خط، به‌مثابه فرکانس"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: "در مهرخط تتو تزئین نیست. یک نقش ریز، اگر با نیت و جای درست بنشیند، مثل نتی است که بدن از قبل زمزمه می‌کرده."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: "هلال یاد یک دوره است، تاک رشد آرام، دانه چیزی که هنوز دیده نمی‌شود. شلوغی بصری نویز است؛ یک خط تمیز، سیگنال."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: backToLoom,
						className: "mt-3 min-h-12 w-full rounded-full border border-gold/40 text-sm",
						children: "برگشت"
					})
				]
			}),
			panel === "reserve" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: (e) => {
					e.preventDefault();
					submit();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: "اسم و راه ارتباطی فقط روی همین دستگاه ذخیره می‌شود."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-mist",
						children: ["اسم یا نام مستعار", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setField("name", e.target.value),
							className: "mt-1 w-full rounded-xl border border-gold/30 bg-ink px-3 py-2 text-sm text-paper outline-none",
							placeholder: "مثلاً سارا"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-mist",
						children: ["اینستاگرام یا شماره", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: handle,
							onChange: (e) => setField("handle", e.target.value),
							className: "mt-1 w-full rounded-xl border border-gold/30 bg-ink px-3 py-2 text-sm text-paper outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-mist",
						children: ["این خط باید چه حسی داشته باشد؟", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: note,
							onChange: (e) => setField("note", e.target.value),
							rows: 3,
							className: "mt-1 w-full rounded-xl border border-gold/30 bg-ink px-3 py-2 text-sm text-paper outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-gold/20 bg-ink/40 px-3 py-2 text-xs text-mist",
						children: [
							motifMeta.fa,
							" روی ",
							zoneMeta.fa,
							" · حدود ",
							sizeCm,
							"cm · ",
							formatPrice(currentPrice)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: backToLoom,
							className: "min-h-12 flex-1 rounded-full border border-gold/40 text-sm",
							children: "برگشت"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "min-h-12 flex-1 rounded-full bg-blush text-sm font-medium text-ink",
							children: "ثبت در لیست انتظار"
						})]
					})
				]
			}),
			panel === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl text-gold",
						children: "روی لیست نشستی."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: [
							name || "تو",
							"، نقش ",
							motifMeta.fa,
							" روی ",
							zoneMeta.fa,
							" ثبت شد. برآورد: ",
							formatPrice(currentPrice),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: backToLoom,
						className: "mt-4 min-h-12 w-full rounded-full bg-paper text-sm text-ink",
						children: "یک نقش دیگر"
					})
				]
			})
		]
	});
}
function SkinMirror({ motif, sizeCm, ink, label }) {
	const scale = .55 + sizeCm / 12;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-2xl bg-skin px-4 py-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs text-wine",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 24 24",
				className: "mx-auto h-28 w-28",
				style: { transform: `scale(${scale})` },
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: PATHS[motif],
					fill: "none",
					stroke: "currentColor",
					className: "text-inkline",
					strokeWidth: .6 + ink * 1.1,
					strokeLinecap: "round",
					opacity: .45 + ink * .55
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-wine",
				children: [
					"حدود ",
					sizeCm,
					" سانتی‌متر روی پوست"
				]
			})
		]
	});
}
function AtelierClient() {
	const entered = useAtelier((s) => s.entered);
	const enter = useAtelier((s) => s.enter);
	const [Scene, setScene] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!entered) return;
		let live = true;
		import("./Scene-B3QuCRhU.mjs").then((m) => {
			if (live) setScene(() => m.AtelierScene);
		});
		return () => {
			live = false;
		};
	}, [entered]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-ink text-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				children: entered && Scene ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {}) : null
			}),
			!entered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center px-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm tracking-widest text-gold",
							children: "ATELIER · WOMEN ONLY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-5xl leading-none text-paper sm:text-6xl",
							children: "مهرخط"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 text-sm text-blush",
							children: "اینجا تتو فروخته نمی‌شود. یک خط ظریف، روی پوست یک زن."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-sm text-sm leading-7 text-mist",
							children: "فرم را بچرخان، نقش را انتخاب کن، عکس خودت را بگذار و خط را روی پوست واقعی‌ات جانمایی کن. بعد فاینال و قیمت را برای تتوکار نگه دار."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: enter,
							className: "mt-8 min-h-12 rounded-full bg-paper px-8 text-sm font-medium text-ink",
							children: "وارد اتاقِ خط شو"
						})
					]
				})
			}),
			entered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-3 sm:p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dock, {})
			})
		]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => SplitComponent });
var SplitComponent = AtelierClient;
//#endregion
export { useAtelier as n, routes_exports as t };
