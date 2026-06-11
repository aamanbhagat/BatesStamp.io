"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";

interface DropZoneProps {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
}

export function DropZone({ onFiles, disabled }: DropZoneProps) {
  const [isOver, setIsOver] = useState(false);
  const enterCount = useRef(0);

  const handleDragEnter = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    enterCount.current += 1;
    setIsOver(true);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    enterCount.current = Math.max(0, enterCount.current - 1);
    if (enterCount.current === 0) setIsOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      enterCount.current = 0;
      setIsOver(false);
      if (disabled) return;
      const files = Array.from(e.dataTransfer.files).filter(
        (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"),
      );
      if (files.length > 0) onFiles(files);
    },
    [onFiles, disabled],
  );

  return (
    <label
      htmlFor="bates-file-input"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={[
        "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 focus-within:ring-offset-neutral-950",
        isOver
          ? "border-emerald-500 bg-emerald-500/10"
          : "border-neutral-700 bg-neutral-900/40 hover:border-neutral-500",
        disabled ? "opacity-50 pointer-events-none" : "",
      ].join(" ")}
    >
      <svg
        className="h-10 w-10 text-neutral-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 16V4m0 0l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" />
      </svg>
      <div>
        <div className="text-base font-medium text-neutral-100">
          Drop PDFs here or click to browse
        </div>
        <div className="mt-1 text-xs text-neutral-300">
          Files never leave your browser. Processed entirely on your device.
        </div>
      </div>
      <input
        id="bates-file-input"
        type="file"
        accept="application/pdf,.pdf"
        multiple
        className="sr-only"
        disabled={disabled}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length > 0) onFiles(files);
          e.target.value = "";
        }}
      />
    </label>
  );
}
