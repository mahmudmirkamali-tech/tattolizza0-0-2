import { useEffect, useState } from "react";
import { Dock } from "./Dock";
import { Mark } from "./Mark";
import { useAtelier } from "./store";

export function AtelierClient() {
  const entered = useAtelier((s) => s.entered);
  const enter = useAtelier((s) => s.enter);
  const [Scene, setScene] = useState<null | typeof import("./Scene").AtelierScene>(null);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setIntro(false), reduce ? 400 : 2600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!entered) return;
    let live = true;
    import("./Scene").then((m) => {
      if (live) setScene(() => m.AtelierScene);
    });
    return () => {
      live = false;
    };
  }, [entered]);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">{entered && Scene ? <Scene /> : null}</div>

      {intro && !entered && (
        <button
          type="button"
          onClick={() => setIntro(false)}
          className="absolute inset-0 z-20 flex items-center justify-center bg-ink"
        >
          <Mark />
          <span className="sr-only">رد شدن از نشان</span>
        </button>
      )}

      {!entered && !intro && (
        <div className="absolute inset-0 flex items-center justify-center px-5">
          <div className="max-w-md text-center">
            <Mark settled />
            <p className="mx-auto mt-6 text-sm text-blush">خط ظریف، توسط پرواز.</p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-mist">
              فرم را بچرخان، نقش را روی عکس خودت بگذار، و فاینال را برای آرتیست نگه دار. ورودی ۵ دلار، هر سانتی‌متر ۱ دلار.
              زیر ۱۸ سال فقط با حضور مادر.
            </p>
            <button
              type="button"
              onClick={enter}
              className="mt-8 min-h-12 rounded-full bg-paper px-8 text-sm font-medium text-ink"
            >
              وارد اتاق شو
            </button>
          </div>
        </div>
      )}

      {entered && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-3 sm:p-6">
          <Dock />
        </div>
      )}
    </main>
  );
}
