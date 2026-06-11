import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Adobe Acrobat Alternative for Bates Numbering",
  description:
    "Need Bates numbering without an Acrobat Pro license? BatesStamp is a free, in-browser alternative that does Bates stamping without the subscription or install.",
  alternates: { canonical: "/alternatives/adobe-acrobat/" },
};

const COMPARISON: { feature: string; acrobat: string; bates: string; acrobatYes?: boolean; batesYes?: boolean }[] = [
  { feature: "Cost", acrobat: "≈ $240/yr", bates: "Free", batesYes: true },
  { feature: "Install required", acrobat: "Yes", bates: "No (browser-only)", batesYes: true },
  { feature: "Works on Citrix / VDI", acrobat: "Often blocked", bates: "Yes", batesYes: true },
  { feature: "Files leave your machine", acrobat: "No", bates: "No", acrobatYes: true, batesYes: true },
  { feature: "Batch multiple files", acrobat: "Yes", bates: "Yes", acrobatYes: true, batesYes: true },
  { feature: "Continuous numbering across files", acrobat: "Yes", bates: "Yes", acrobatYes: true, batesYes: true },
  { feature: "Custom prefix & padding", acrobat: "Yes", bates: "Yes", acrobatYes: true, batesYes: true },
  { feature: "OCR for scanned PDFs", acrobat: "Yes", bates: "No", acrobatYes: true },
  { feature: "Redaction", acrobat: "Yes", bates: "No", acrobatYes: true },
];

function Cell({ value, good }: { value: string; good?: boolean }) {
  return (
    <span className={good ? "yes" : "no"}>
      <span aria-hidden="true">{good ? "✓ " : "— "}</span>
      {value}
    </span>
  );
}

export default function AdobeAcrobatAlternative() {
  return (
    <div className="editorial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "vs Adobe Acrobat", path: "/alternatives/adobe-acrobat/" },
            ])
          ),
        }}
      />
      <article className="ed-content mx-auto max-w-2xl px-6 py-16 sm:py-24 md:max-w-3xl">
        <div className="ed-rise ed-rise-1">
          <span className="ed-kicker">Volume II · Comparison 01</span>
          <h1 className="ed-display mt-6 text-5xl sm:text-7xl">
            A free alternative to <em>Acrobat</em>, for Bates work alone.
          </h1>
        </div>

        <div className="ed-meta ed-rise ed-rise-2">
          <div>
            <strong>Filed</strong> · Tool Comparison
          </div>
          <div>
            <strong>Reading</strong> · 3 min
          </div>
          <div>
            <strong>Subject</strong> · Adobe Acrobat Pro
          </div>
        </div>

        <p className="ed-lead ed-rise ed-rise-3">
          Adobe Acrobat Pro can absolutely do Bates numbering — and quite a bit
          more. But it costs a subscription, requires installation, and
          isn&apos;t available on every workstation. When the only thing
          you need is the Bates job, the lighter tool wins.
        </p>

        <section className="ed-section" data-num="§ 01">
          <h2 className="ed-h2">Side by side</h2>
          <table className="ed-table">
            <thead>
              <tr>
                <th>Capability</th>
                <th>Acrobat Pro</th>
                <th>BatesStamp</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td>
                    <Cell value={row.acrobat} good={row.acrobatYes} />
                  </td>
                  <td>
                    <Cell value={row.bates} good={row.batesYes} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="ed-section" data-num="§ 02">
          <h2 className="ed-h2">When Acrobat is still the right tool</h2>
          <div className="ed-prose mt-6">
            <p className="dropcap">
              If your workflow needs OCR, redaction, form-building, or general
              PDF editing in addition to Bates numbering, you&apos;ll want
              Acrobat Pro. BatesStamp focuses on a single job and does that
              one job without the overhead. The two are not really
              competitors so much as differently scoped instruments.
            </p>
          </div>

          <blockquote className="ed-pullquote">
            Acrobat is a workshop. BatesStamp is a single, well-made plane.
          </blockquote>
        </section>

        <section className="ed-section" data-num="§ 03">
          <h2 className="ed-h2">When BatesStamp is the better fit</h2>
          <div className="ed-prose mt-6">
            <ul>
              <li>
                You need to stamp a production today and don&apos;t have a
                license waiting for you.
              </li>
              <li>
                You&apos;re on a locked-down workstation where Acrobat plugins
                don&apos;t run.
              </li>
              <li>
                You only need Bates numbering, not the full PDF editing suite.
              </li>
              <li>
                You want a workflow with absolutely no upload risk for a
                confidential matter.
              </li>
            </ul>
          </div>
        </section>

        <div className="ed-fleuron">
          <span>❦</span>
        </div>

        <p className="ed-colophon">
          Use the right tool for the job. For Bates work alone, the right tool
          is the smaller one.
        </p>

        <div className="mt-8 text-center">
          <Link href="/" className="ed-back">
            → Try BatesStamp now
          </Link>
        </div>
      </article>
    </div>
  );
}
