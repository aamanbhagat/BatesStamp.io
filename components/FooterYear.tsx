"use client";

import { useEffect, useState } from "react";

export function FooterYear() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);
  return <>{year ?? "2026"}</>;
}
