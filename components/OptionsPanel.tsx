"use client";

import { useId } from "react";
import type { StampOptions } from "@/lib/stamp";
import { POSITION_OPTIONS } from "@/lib/positions";

interface OptionsPanelProps {
  options: StampOptions;
  onChange: (next: StampOptions) => void;
  batchMode: "continuous" | "restart";
  onBatchModeChange: (mode: "continuous" | "restart") => void;
  hasMultipleFiles: boolean;
  disabled?: boolean;
}

const inputClass =
  "w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950";

export function OptionsPanel({
  options,
  onChange,
  batchMode,
  onBatchModeChange,
  hasMultipleFiles,
  disabled,
}: OptionsPanelProps) {
  const id = useId();
  const set = <K extends keyof StampOptions>(k: K, v: StampOptions[K]) =>
    onChange({ ...options, [k]: v });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Field label="Prefix" hint="e.g. SMITH" htmlFor={`${id}-prefix`}>
        <input
          id={`${id}-prefix`}
          type="text"
          maxLength={30}
          value={options.prefix}
          onChange={(e) => set("prefix", e.target.value)}
          disabled={disabled}
          className={inputClass}
          placeholder="(none)"
        />
      </Field>

      <Field label="Start number" htmlFor={`${id}-start`}>
        <input
          id={`${id}-start`}
          type="number"
          min={0}
          max={9999999999}
          value={options.startNumber}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") return set("startNumber", 0);
            const n = Number(raw);
            if (!Number.isFinite(n) || n < 0) return;
            set("startNumber", Math.floor(n));
          }}
          disabled={disabled}
          className={inputClass}
        />
      </Field>

      <Field label="Padding (digits)" htmlFor={`${id}-padding`}>
        <input
          id={`${id}-padding`}
          type="number"
          min={1}
          max={10}
          value={options.padding}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isFinite(n)) return;
            set("padding", Math.min(10, Math.max(1, Math.floor(n) || 1)));
          }}
          disabled={disabled}
          className={inputClass}
        />
      </Field>

      <Field label="Position" htmlFor={`${id}-position`}>
        <select
          id={`${id}-position`}
          value={options.position}
          onChange={(e) => set("position", e.target.value as StampOptions["position"])}
          disabled={disabled}
          className={inputClass}
        >
          {POSITION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label={`Font size (${options.fontSize}pt)`} htmlFor={`${id}-font`}>
        <input
          id={`${id}-font`}
          type="range"
          min={8}
          max={24}
          value={options.fontSize}
          onChange={(e) => set("fontSize", Number(e.target.value))}
          disabled={disabled}
          className="w-full accent-emerald-500"
        />
      </Field>

      <Field label="Date suffix">
        <label className="flex h-9 items-center gap-2 text-sm text-neutral-200">
          <input
            type="checkbox"
            checked={options.includeDate}
            onChange={(e) => set("includeDate", e.target.checked)}
            disabled={disabled}
            className="h-4 w-4 accent-emerald-500"
          />
          Include today&apos;s date
        </label>
      </Field>

      {hasMultipleFiles && (
        <fieldset
          className="sm:col-span-2 lg:col-span-3"
          disabled={disabled}
        >
          <legend className="mb-1.5 text-xs font-medium uppercase tracking-wide text-neutral-300">
            Multi-file numbering
          </legend>
          <div className="flex flex-col gap-2 text-sm text-neutral-200 sm:flex-row sm:gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="batchMode"
                checked={batchMode === "continuous"}
                onChange={() => onBatchModeChange("continuous")}
                className="accent-emerald-500"
              />
              Continuous across files (default)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="batchMode"
                checked={batchMode === "restart"}
                onChange={() => onBatchModeChange("restart")}
                className="accent-emerald-500"
              />
              Restart per file
            </label>
          </div>
          <p className="mt-1 text-xs text-neutral-300">
            How numbering flows across multiple files.
          </p>
        </fieldset>
      )}
    </div>
  );
}

function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-300"
      >
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-neutral-400">{hint}</p>}
    </div>
  );
}
