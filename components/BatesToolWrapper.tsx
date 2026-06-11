"use client";

import dynamic from "next/dynamic";

const BatesTool = dynamic(
  () => import("./BatesTool").then((mod) => mod.BatesTool),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 rounded-2xl border border-neutral-800 bg-neutral-950/40 animate-pulse flex items-center justify-center text-neutral-400">
        Loading tool...
      </div>
    ),
  }
);

export function BatesToolWrapper() {
  return <BatesTool />;
}
