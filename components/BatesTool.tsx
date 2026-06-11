"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DropZone } from "./DropZone";
import { OptionsPanel } from "./OptionsPanel";
import {
  DEFAULT_OPTIONS,
  formatBatesLabel,
  type StampOptions,
} from "@/lib/stamp";
import {
  stampBatch,
  stampSingleAndDownload,
  downloadResult,
  type BatchMode,
  type BatchProgress,
} from "@/lib/batch";

const STORAGE_KEY = "batesstamp:options:v1";

interface QueuedFile {
  id: string;
  file: File;
}

function loadStoredOptions(): StampOptions {
  if (typeof window === "undefined") return DEFAULT_OPTIONS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_OPTIONS;
    const parsed = JSON.parse(raw) as Partial<StampOptions>;
    return { ...DEFAULT_OPTIONS, ...parsed };
  } catch {
    return DEFAULT_OPTIONS;
  }
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Math.random().toString(36).slice(2)}-${performance.now().toString(36)}`;
}

export function BatesTool() {
  const [options, setOptions] = useState<StampOptions>(DEFAULT_OPTIONS);
  const [queued, setQueued] = useState<QueuedFile[]>([]);
  const [batchMode, setBatchMode] = useState<BatchMode>("continuous");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<BatchProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastResultMessage, setLastResultMessage] = useState<string | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOptions(loadStoredOptions());
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
    } catch {
      // localStorage can fail in private mode; non-fatal.
    }
  }, [options]);

  const samplePreview = useMemo(() => {
    const label = formatBatesLabel(
      options.prefix,
      options.startNumber,
      options.padding,
    );
    return options.includeDate ? `${label}  YYYY-MM-DD` : label;
  }, [options.prefix, options.startNumber, options.padding, options.includeDate]);

  const handleFiles = (incoming: File[]) => {
    setError(null);
    setLastResultMessage(null);
    setQueued((prev) => [
      ...prev,
      ...incoming.map((file) => ({ id: makeId(), file })),
    ]);
  };

  const handleRemoveFile = (id: string) => {
    setQueued((prev) => prev.filter((q) => q.id !== id));
  };

  const handleClear = () => {
    setQueued([]);
    setProgress(null);
    setError(null);
    setLastResultMessage(null);
  };

  const handleStamp = async () => {
    if (queued.length === 0 || busy) return;
    setBusy(true);
    setError(null);
    setProgress(null);
    setLastResultMessage(null);

    const files = queued.map((q) => q.file);

    try {
      if (files.length === 1) {
        const result = await stampSingleAndDownload(files[0], options);
        setLastResultMessage(
          `Stamped ${result.pagesStamped} page${result.pagesStamped === 1 ? "" : "s"}. Next number: ${result.nextNumber}.`,
        );
      } else {
        const result = await stampBatch(files, options, batchMode, setProgress);
        downloadResult(result.zipBlob);
        setLastResultMessage(
          `Stamped ${result.totalPagesStamped} page${result.totalPagesStamped === 1 ? "" : "s"} across ${result.totalFiles} files. Next number: ${result.finalNumber}. ZIP downloaded.`,
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-xl"
      aria-labelledby="bates-tool-heading"
    >
      <h2 id="bates-tool-heading" className="sr-only">
        Bates numbering tool
      </h2>
      <DropZone onFiles={handleFiles} disabled={busy} />

      {queued.length > 0 && (
        <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium text-neutral-200">
              {queued.length} file{queued.length === 1 ? "" : "s"} queued
            </h3>
            <button
              type="button"
              onClick={handleClear}
              disabled={busy}
              className="rounded text-xs text-neutral-300 hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:opacity-50"
            >
              Clear all
            </button>
          </div>
          <ul className="space-y-1.5">
            {queued.map((q, i) => (
              <li
                key={q.id}
                className="flex items-center justify-between text-sm text-neutral-200"
              >
                <span className="truncate">
                  <span className="text-neutral-400">{i + 1}.</span> {q.file.name}{" "}
                  <span className="text-neutral-400">
                    ({Math.round(q.file.size / 1024)} KB)
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(q.id)}
                  disabled={busy}
                  aria-label={`Remove ${q.file.name}`}
                  className="ml-2 rounded text-neutral-400 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:opacity-50"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <OptionsPanel
          options={options}
          onChange={setOptions}
          batchMode={batchMode}
          onBatchModeChange={setBatchMode}
          hasMultipleFiles={queued.length > 1}
          disabled={busy}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-neutral-300">
          Preview:{" "}
          <span className="rounded bg-neutral-800 px-2 py-1 font-mono text-neutral-100">
            {samplePreview}
          </span>
        </div>
        <button
          type="button"
          onClick={handleStamp}
          disabled={queued.length === 0 || busy}
          className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-400"
        >
          {busy
            ? "Stamping…"
            : queued.length === 0
              ? "Add a PDF to stamp"
              : queued.length === 1
                ? "Stamp & download PDF"
                : `Stamp ${queued.length} files & download ZIP`}
        </button>
      </div>

      <div role="status" aria-live="polite" aria-atomic="true">
        {progress && busy && (
          <div className="mt-4 text-sm text-neutral-300">
            Processing {progress.fileIndex} / {progress.totalFiles}:{" "}
            <span className="text-neutral-100">{progress.fileName}</span>
            <div
              className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-800"
              role="progressbar"
              aria-valuenow={progress.fileIndex}
              aria-valuemin={0}
              aria-valuemax={progress.totalFiles}
              aria-label={`Stamping file ${progress.fileIndex} of ${progress.totalFiles}`}
            >
              <div
                className="h-full bg-emerald-500 transition-all"
                style={{
                  width: `${(progress.fileIndex / progress.totalFiles) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
        {lastResultMessage && !busy && (
          <div className="mt-4 rounded-lg border border-emerald-700 bg-emerald-950/40 p-3 text-sm text-emerald-200">
            <span className="font-semibold" aria-hidden="true">✓ </span>
            {lastResultMessage}
          </div>
        )}
      </div>

      <div role="alert" aria-live="assertive">
        {error && (
          <div className="mt-4 rounded-lg border border-red-700 bg-red-950/40 p-3 text-sm text-red-200">
            <span className="font-semibold" aria-hidden="true">✕ </span>
            {error}
          </div>
        )}
      </div>
    </section>
  );
}
