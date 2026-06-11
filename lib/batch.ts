import JSZip from "jszip";
import { saveAs } from "file-saver";
import { stampPdf, type StampOptions } from "./stamp";

export type BatchMode = "continuous" | "restart";

export interface BatchProgress {
  fileIndex: number;
  fileName: string;
  totalFiles: number;
  pagesStampedSoFar: number;
}

export interface BatchResult {
  totalFiles: number;
  totalPagesStamped: number;
  finalNumber: number;
  zipBlob: Blob;
}

function deriveStampedName(name: string): string {
  const lower = name.toLowerCase();
  const base = lower.endsWith(".pdf") ? name.slice(0, -4) : name;
  return `${base}-bates.pdf`;
}

export async function stampBatch(
  files: File[],
  options: StampOptions,
  mode: BatchMode,
  onProgress?: (p: BatchProgress) => void,
): Promise<BatchResult> {
  if (files.length === 0) throw new Error("No files provided.");

  const zip = new JSZip();
  let counter = options.startNumber;
  let totalPages = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const startAt = mode === "restart" ? options.startNumber : counter;
    const arrayBuffer = await file.arrayBuffer();

    let result;
    try {
      result = await stampPdf(arrayBuffer, options, startAt);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`Failed to stamp "${file.name}": ${message}`);
    }

    zip.file(deriveStampedName(file.name), result.bytes);
    totalPages += result.pagesStamped;
    if (mode === "continuous") counter = result.nextNumber;

    onProgress?.({
      fileIndex: i + 1,
      fileName: file.name,
      totalFiles: files.length,
      pagesStampedSoFar: totalPages,
    });
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  return {
    totalFiles: files.length,
    totalPagesStamped: totalPages,
    finalNumber: counter,
    zipBlob,
  };
}

export function downloadResult(blob: Blob, filename = "bates-stamped.zip"): void {
  saveAs(blob, filename);
}

export async function stampSingleAndDownload(
  file: File,
  options: StampOptions,
): Promise<{ pagesStamped: number; nextNumber: number }> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await stampPdf(arrayBuffer, options, options.startNumber);
  const blob = new Blob([result.bytes as BlobPart], { type: "application/pdf" });
  saveAs(blob, deriveStampedName(file.name));
  return { pagesStamped: result.pagesStamped, nextNumber: result.nextNumber };
}
