import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import { computePosition, type StampPosition } from "./positions";

export interface StampOptions {
  prefix: string;
  startNumber: number;
  padding: number;
  position: StampPosition;
  fontSize: number;
  includeDate: boolean;
}

export const DEFAULT_OPTIONS: StampOptions = {
  prefix: "",
  startNumber: 1,
  padding: 6,
  position: "bottom-right",
  fontSize: 10,
  includeDate: false,
};

export function formatBatesLabel(
  prefix: string,
  number: number,
  padding: number,
): string {
  const padded = String(number).padStart(padding, "0");
  return prefix ? `${prefix} ${padded}` : padded;
}

function todayIsoDate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function toWinAnsiSafe(text: string): string {
  let out = "";
  const normalized = text.normalize("NFKD");
  for (let i = 0; i < normalized.length; i++) {
    const code = normalized.charCodeAt(i);
    const inAscii = code >= 0x20 && code <= 0x7e;
    const inLatin1 = code >= 0xa0 && code <= 0xff;
    out += inAscii || inLatin1 ? normalized[i] : "?";
  }
  return out;
}

export interface StampResult {
  bytes: Uint8Array;
  pagesStamped: number;
  nextNumber: number;
}

export async function stampPdf(
  fileBytes: ArrayBuffer | Uint8Array,
  options: StampOptions,
  startAt: number = options.startNumber,
): Promise<StampResult> {
  let pdfDoc: PDFDocument;
  try {
    pdfDoc = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Couldn't open this PDF: ${message}`);
  }

  if (pdfDoc.isEncrypted) {
    throw new Error(
      "This PDF is password-protected. Remove the password in your PDF reader before stamping.",
    );
  }

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  if (pages.length === 0) {
    throw new Error("This PDF has no pages.");
  }

  let current = startAt;
  for (const page of pages) {
    const label = formatBatesLabel(options.prefix, current, options.padding);
    const rawText = options.includeDate ? `${label}  ${todayIsoDate()}` : label;
    const text = toWinAnsiSafe(rawText);

    try {
      const textWidth = font.widthOfTextAtSize(text, options.fontSize);
      const textHeight = font.heightAtSize(options.fontSize);
      const { width: physWidth, height: physHeight } = page.getSize();
      
      const rotation = page.getRotation().angle;
      const isSwapped = rotation === 90 || rotation === 270;
      const visWidth = isSwapped ? physHeight : physWidth;
      const visHeight = isSwapped ? physWidth : physHeight;

      const { x: visX, y: visY } = computePosition(
        visWidth,
        visHeight,
        textWidth,
        textHeight,
        options.position,
      );

      let x = visX;
      let y = visY;
      if (rotation === 90) {
        x = physWidth - visY;
        y = visX;
      } else if (rotation === 180) {
        x = physWidth - visX;
        y = physHeight - visY;
      } else if (rotation === 270) {
        x = visY;
        y = physHeight - visX;
      }

      page.drawText(text, {
        x,
        y,
        size: options.fontSize,
        font,
        color: rgb(0, 0, 0),
        rotate: rotation ? degrees(rotation) : undefined,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(
        `Couldn't stamp page ${current - startAt + 1}: ${message}`,
      );
    }

    current += 1;
  }

  const bytes = await pdfDoc.save({ useObjectStreams: false });
  return {
    bytes,
    pagesStamped: pages.length,
    nextNumber: current,
  };
}
