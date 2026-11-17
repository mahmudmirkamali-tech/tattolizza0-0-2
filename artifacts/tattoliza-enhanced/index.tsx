import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [View, setView] = useState<null | typeof import("@/atelier/Client").AtelierClient>(null);

  useEffect(() => {
    let live = true;
    import("@/atelier/Client").then((m) => {
      if (live) setView(() => m.AtelierClient);
    });
    return () => {
      live = false;
    };
  }, []);

  if (!View) {
    return (
      <main className="flex h-dvh items-center justify-center bg-ink text-paper">
        <p className="font-display text-3xl">مهرخط</p>
      </main>
    );
  }

  return <View />;
}
