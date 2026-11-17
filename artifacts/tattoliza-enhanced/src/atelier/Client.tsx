import { useState } from "react";
import { AtelierScene } from "./Scene";
import { Dock } from "./Dock";
import { useAtelier } from "./store";

export function AtelierClient() {
  const entered = useAtelier((s) => s.entered);
  const enter = useAtelier((s) => s.enter);
  const [booting] = useState(false);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">{entered && !booting ? <AtelierScene /> : null}</div>

      {!entered && (
        <div className="absolute inset-0 flex items-center justify-center px-5">
          <div className="max-w-md text-center">
            <p className="font-display text-sm tracking-[0.35em] text-gold">ATELIER · WOMEN ONLY</p>
            <h1 className="mt-2 font-display text-5xl leading-none text-paper sm:text-6xl">مهرخط</h1>
            <p className="mx-auto mt-3 text-sm text-blush">اینجا تتو فروخته نمی‌شود. یک خط ظریف، روی پوست یک زن، توسط یک زن طراحی می‌شود.</p>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-mist">
              فرم را بچرخان و ببین خط چطور متولد می‌شود. بعد عکس خودت را بگذار، نقش را روی پوست واقعی‌ات جانمایی کن، قیمت بگیر و فاینال را به تتوکار نشان بده.
            </p>
            <button
              type="button"
              onClick={enter}
              className="mt-8 min-h-12 rounded-full bg-paper px-8 text-sm font-medium text-ink"
            >
              وارد اتاقِ خط شو
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
