import { PATHS, type Motif } from "./motifs";
import { ENTRY_USD, MOTIFS, PER_CM_USD, ZONES, formatPrice, useAtelier } from "./store";
import { downloadFinal } from "./exportFinal";
import { MotifGlyph, TryOnCanvas } from "./TryOn";

export function Dock() {
  const motif = useAtelier((s) => s.motif);
  const zone = useAtelier((s) => s.zone);
  const panel = useAtelier((s) => s.panel);
  const name = useAtelier((s) => s.name);
  const handle = useAtelier((s) => s.handle);
  const note = useAtelier((s) => s.note);
  const sizeCm = useAtelier((s) => s.sizeCm);
  const ink = useAtelier((s) => s.ink);
  const photoUrl = useAtelier((s) => s.photoUrl);
  const age = useAtelier((s) => s.age);
  const motherPresent = useAtelier((s) => s.motherPresent);
  const setAge = useAtelier((s) => s.setAge);
  const setMother = useAtelier((s) => s.setMother);
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

  const zoneMeta = ZONES.find((z) => z.id === zone)!;
  const motifMeta = MOTIFS.find((m) => m.id === motif)!;
  const currentPrice = price();

  return (
    <section className="pointer-events-auto max-h-[80dvh] w-full max-w-xl overflow-y-auto rounded-3xl border border-gold/30 bg-veil/90 p-4 text-paper shadow-2xl backdrop-blur-md sm:p-5">
      <header className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="font-display text-sm tracking-widest text-gold">PARVAZ</p>
          <h1 className="text-2xl font-medium leading-tight">Tattolizza</h1>
          <p className="text-xs text-blush">ورودی ۵$ · هر سانتی‌متر ۱$</p>
        </div>
        <p className="max-w-36 text-left text-xs leading-relaxed text-mist">{zoneMeta.whisper}</p>
      </header>

      {panel === "loom" && (
        <>
          <p className="mb-3 text-sm leading-relaxed text-paper/90">
            نقطه طلایی را لمس کن، نقش را انتخاب کن، بعد روی پوست خودت ببین.
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
            {ZONES.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setZone(z.id)}
                className={
                  "min-h-11 rounded-full border px-3 text-sm " +
                  (zone === z.id ? "border-blush bg-blush text-ink" : "border-gold/40 text-paper")
                }
              >
                {z.fa}
              </button>
            ))}
          </div>
          <div className="mb-4 grid grid-cols-5 gap-2">
            {MOTIFS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMotif(m.id)}
                className={
                  "flex min-h-14 flex-col items-center justify-center rounded-2xl border text-xs " +
                  (motif === m.id ? "border-gold bg-gold/15 text-gold" : "border-paper/15 text-mist")
                }
              >
                <MotifGlyph id={m.id} />
                <span className="mt-1">{m.fa}</span>
              </button>
            ))}
          </div>
          <div className="mb-3 grid grid-cols-2 gap-2">
            <button type="button" onClick={openTryon} className="min-h-11 rounded-full border border-gold/50 bg-gold/10 text-sm text-gold">
              روی پوست خودم
            </button>
            <button type="button" onClick={openMirror} className="min-h-11 rounded-full border border-gold/40 text-sm">
              پیش‌نمایش ساده
            </button>
          </div>
          <div className="mb-3 flex gap-2">
            <button type="button" onClick={openQuote} className="min-h-11 flex-1 rounded-full border border-blush/60 text-sm text-blush">
              قیمت و فاینال
            </button>
            <button type="button" onClick={openEssay} className="min-h-11 flex-1 rounded-full border border-gold/40 text-sm">
              فلسفه خط
            </button>
          </div>
          <button type="button" onClick={openReserve} className="min-h-12 w-full rounded-full bg-paper text-sm font-medium text-ink">
            این نقش را برای جلسه نگه دار
          </button>
        </>
      )}

      {panel === "tryon" && (
        <div className="space-y-3">
          <p className="text-sm text-mist">عکس محل تتو را بگذار و نقش را جابه‌جا کن.</p>
          <TryOnCanvas />
          <div className="flex gap-2">
            <button type="button" onClick={backToLoom} className="min-h-11 flex-1 rounded-full border border-gold/40 text-sm">
              برگشت
            </button>
            <button type="button" onClick={openQuote} className="min-h-11 flex-1 rounded-full bg-blush text-sm font-medium text-ink">
              ادامه به قیمت
            </button>
          </div>
        </div>
      )}

      {panel === "mirror" && (
        <div>
          <p className="mb-2 text-sm text-mist">اندازه و غلظت خط را تنظیم کن.</p>
          <SkinMirror motif={motif} sizeCm={sizeCm} ink={ink} label={`${motifMeta.fa} · ${zoneMeta.fa}`} />
          <label className="mt-3 block text-xs text-mist">
            اندازه تقریبی: {sizeCm} سانتی‌متر
            <input type="range" min={1.5} max={9} step={0.5} value={sizeCm} onChange={(e) => setSize(Number(e.target.value))} className="mt-1 w-full" />
          </label>
          <label className="mt-2 block text-xs text-mist">
            غلظت خط
            <input type="range" min={0.35} max={1} step={0.05} value={ink} onChange={(e) => setInk(Number(e.target.value))} className="mt-1 w-full" />
          </label>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={backToLoom} className="min-h-11 flex-1 rounded-full border border-gold/40 text-sm">
              برگشت
            </button>
            <button type="button" onClick={openTryon} className="min-h-11 flex-1 rounded-full bg-gold/20 text-sm text-gold">
              روی عکس خودم
            </button>
          </div>
        </div>
      )}

      {panel === "quote" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-gold/30 bg-ink/50 p-4">
            <p className="text-xs tracking-widest text-gold">فاینال برای تتوکار</p>
            <h2 className="mt-1 font-display text-3xl text-paper">
              {motifMeta.fa} · {zoneMeta.fa}
            </h2>
            <ul className="mt-3 space-y-1 text-sm text-mist">
              <li>اندازه تقریبی: {sizeCm} سانتی‌متر</li>
              <li>غلظت خط: {Math.round(ink * 100)}٪</li>
              <li>محل: {zoneMeta.fa}</li>
              <li>{photoUrl ? "پیش‌نمایش روی عکس شخصی آماده است" : "هنوز عکسی نگذاشته‌ای"}</li>
            </ul>
            <div className="mt-4 border-t border-gold/20 pt-3 text-sm">
              <div className="flex justify-between text-mist">
                <span>ورودی استودیو</span>
                <span>{formatPrice(ENTRY_USD)}</span>
              </div>
              <div className="mt-1 flex justify-between text-mist">
                <span>{sizeCm} سانتی‌متر × {formatPrice(PER_CM_USD)}</span>
                <span>{formatPrice(sizeCm * PER_CM_USD)}</span>
              </div>
              <p className="mt-3 font-display text-2xl text-gold">{formatPrice(currentPrice)}</p>
              <p className="mt-2 text-xs leading-relaxed text-blush">
                زیر ۱۸ سال تتو زده نمی‌شود، مگر با حضور مادر.
              </p>
            </div>
          </div>
          {photoUrl && (
            <button
              type="button"
              className="min-h-11 w-full rounded-full border border-gold/40 text-sm"
              onClick={() =>
                void downloadFinal({
                  photoUrl,
                  motif,
                  placement,
                  sizeCm,
                  ink,
                  caption: `${motifMeta.fa} · ${zoneMeta.fa} · ${sizeCm}cm · ${formatPrice(currentPrice)}`,
                })
              }
            >
              دانلود فاینال برای تتوکار
            </button>
          )}
          <div className="flex gap-2">
            <button type="button" onClick={backToLoom} className="min-h-11 flex-1 rounded-full border border-gold/40 text-sm">
              برگشت
            </button>
            <button type="button" onClick={openReserve} className="min-h-11 flex-1 rounded-full bg-paper text-sm font-medium text-ink">
              ثبت در لیست انتظار
            </button>
          </div>
        </div>
      )}

      {panel === "essay" && (
        <article className="text-sm leading-7">
          <h2 className="font-display text-2xl text-gold">خط، به‌مثابه فرکانس</h2>
          <p className="mt-2">
            در Tattolizza تتو تزئین نیست. یک نقش ریز، اگر با نیت و جای درست بنشیند، مثل نتی است که بدن از قبل زمزمه می‌کرده. خط را پرواز می‌کشد.
          </p>
          <p className="mt-2">
            هلال یاد یک دوره است، تاک رشد آرام، دانه چیزی که هنوز دیده نمی‌شود. شلوغی بصری نویز است؛ یک خط تمیز، سیگنال.
          </p>
          <button type="button" onClick={backToLoom} className="mt-3 min-h-12 w-full rounded-full border border-gold/40 text-sm">
            برگشت
          </button>
        </article>
      )}

      {panel === "reserve" && (
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <p className="text-sm text-mist">اسم و راه ارتباطی فقط روی همین دستگاه ذخیره می‌شود.</p>
          <label className="text-xs text-mist">
            اسم یا نام مستعار
            <input
              value={name}
              onChange={(e) => setField("name", e.target.value)}
              className="mt-1 w-full rounded-xl border border-gold/30 bg-ink px-3 py-2 text-sm text-paper outline-none"
              placeholder="مثلاً سارا"
            />
          </label>
          <label className="text-xs text-mist">
            اینستاگرام یا شماره
            <input
              value={handle}
              onChange={(e) => setField("handle", e.target.value)}
              className="mt-1 w-full rounded-xl border border-gold/30 bg-ink px-3 py-2 text-sm text-paper outline-none"
            />
          </label>
          <label className="text-xs text-mist">
            این خط باید چه حسی داشته باشد؟
            <textarea
              value={note}
              onChange={(e) => setField("note", e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-xl border border-gold/30 bg-ink px-3 py-2 text-sm text-paper outline-none"
            />
          </label>
          <label className="text-xs text-mist">
            سن
            <input
              type="number"
              min={1}
              max={99}
              value={age ?? ""}
              onChange={(e) => setAge(e.target.value === "" ? null : Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-gold/30 bg-ink px-3 py-2 text-sm text-paper outline-none"
            />
          </label>
          {age !== null && age < 18 && (
            <label className="flex items-start gap-2 rounded-xl border border-blush/50 bg-ink/50 px-3 py-2 text-xs leading-6 text-blush">
              <input
                type="checkbox"
                checked={motherPresent}
                onChange={(e) => setMother(e.target.checked)}
                className="mt-1"
              />
              <span>زیر ۱۸ سال هستم و مادر در جلسه حاضر است. بدون حضور مادر تتو انجام نمی‌شود.</span>
            </label>
          )}
          <div className="rounded-xl border border-gold/20 bg-ink/40 px-3 py-2 text-xs text-mist">
            {motifMeta.fa} روی {zoneMeta.fa} · {sizeCm}cm · ورودی {formatPrice(ENTRY_USD)} + {formatPrice(sizeCm * PER_CM_USD)} = {formatPrice(currentPrice)}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={backToLoom} className="min-h-12 flex-1 rounded-full border border-gold/40 text-sm">
              برگشت
            </button>
            <button
              type="submit"
              disabled={age === null || age < 1 || (age < 18 && !motherPresent)}
              className="min-h-12 flex-1 rounded-full bg-blush text-sm font-medium text-ink disabled:opacity-40"
            >
              ثبت در لیست انتظار
            </button>
          </div>
        </form>
      )}

      {panel === "done" && (
        <div className="py-2">
          <p className="font-display text-3xl text-gold">روی لیست نشستی.</p>
          <p className="mt-2 text-sm leading-relaxed">
            {name || "تو"}، نقش {motifMeta.fa} روی {zoneMeta.fa} ثبت شد. برآورد: {formatPrice(currentPrice)}.
          </p>
          <button type="button" onClick={backToLoom} className="mt-4 min-h-12 w-full rounded-full bg-paper text-sm text-ink">
            یک نقش دیگر
          </button>
        </div>
      )}
    </section>
  );
}

function SkinMirror({ motif, sizeCm, ink, label }: { motif: Motif; sizeCm: number; ink: number; label: string }) {
  const scale = 0.55 + sizeCm / 12;
  return (
    <div className="relative overflow-hidden rounded-2xl bg-skin px-4 py-6 text-center">
      <p className="mb-2 text-xs text-wine">{label}</p>
      <svg viewBox="0 0 24 24" className="mx-auto h-28 w-28" style={{ transform: `scale(${scale})` }} aria-hidden>
        <path
          d={PATHS[motif]}
          fill="none"
          stroke="currentColor"
          className="text-inkline"
          strokeWidth={0.6 + ink * 1.1}
          strokeLinecap="round"
          opacity={0.45 + ink * 0.55}
        />
      </svg>
      <p className="text-xs text-wine">حدود {sizeCm} سانتی‌متر روی پوست</p>
    </div>
  );
}
