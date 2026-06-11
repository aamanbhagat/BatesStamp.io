import { writeFileSync, readFileSync } from "node:fs";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { stampPdf, DEFAULT_OPTIONS } from "../lib/stamp";

async function makeSamplePdf(): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  for (let i = 1; i <= 5; i++) {
    const page = pdf.addPage([612, 792]);
    page.drawText(`Sample document page ${i}`, {
      x: 72,
      y: 720,
      size: 16,
      font,
    });
  }
  return pdf.save();
}

async function main() {
  console.log("Creating sample PDF...");
  const sample = await makeSamplePdf();
  writeFileSync("/tmp/sample.pdf", sample);

  console.log("Stamping...");
  const result = await stampPdf(sample, {
    ...DEFAULT_OPTIONS,
    prefix: "SMOKE",
    padding: 6,
    position: "bottom-right",
  });

  writeFileSync("/tmp/sample-stamped.pdf", result.bytes);
  console.log(`Stamped ${result.pagesStamped} pages, next=${result.nextNumber}`);

  const verify = await PDFDocument.load(readFileSync("/tmp/sample-stamped.pdf"));
  console.log(`Verification: ${verify.getPageCount()} pages in output.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
