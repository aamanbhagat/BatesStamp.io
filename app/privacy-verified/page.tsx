import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Verified — Confirm BatesStamp Doesn't Upload",
  description:
    "Verify that BatesStamp processes PDFs entirely in your browser. Includes a printable one-pager for IT review and step-by-step instructions.",
  alternates: { canonical: "/privacy-verified/" },
};

const IT_REVIEW_ROWS: { k: string; v: string }[] = [
  {
    k: "Application type",
    v: "Static web application (HTML, JavaScript, WebAssembly).",
  },
  {
    k: "Runtime",
    v: "Web browser only. No installation, no executables, no plugins.",
  },
  {
    k: "Data flow",
    v: "User-selected PDFs are read into browser memory via the File API. Stamping is performed locally with the pdf-lib JavaScript library. The resulting PDF is offered to the user as a download via a browser-generated blob URL. No file content is transmitted.",
  },
  {
    k: "Network behavior",
    v: "Zero outbound requests once the application is loaded. Verifiable in browser DevTools.",
  },
  {
    k: "Third-party services",
    v: "None. No analytics, no telemetry, no fonts loaded from third-party CDNs at runtime, no error reporting.",
  },
  {
    k: "Open libraries",
    v: "pdf-lib (MIT), JSZip (MIT/GPL), file-saver (MIT).",
  },
  {
    k: "Storage",
    v: "Stamping options (e.g., last-used prefix) are stored in localStorage on the user's device. No file content is stored.",
  },
  {
    k: "Offline behavior",
    v: "The application caches itself via a service worker so it works fully offline after the first visit.",
  },
  {
    k: "Hosting",
    v: "Static files served from a CDN. The server has no access to user files because nothing is uploaded.",
  },
];

export default function PrivacyVerified() {
  return (
    <div className="editorial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Privacy Verified", path: "/privacy-verified/" },
            ])
          ),
        }}
      />
      <article className="ed-content mx-auto max-w-2xl px-6 py-16 sm:py-24 md:max-w-3xl">
        <div className="ed-rise ed-rise-1">
          <span className="ed-kicker">Volume I · Affidavit</span>
          <h1 className="ed-display mt-6 text-5xl sm:text-7xl">
            Privacy, <em>Verified</em>
          </h1>
        </div>

        <div className="ed-meta ed-rise ed-rise-2">
          <div>
            <strong>Filed</strong> · IT Review Document
          </div>
          <div>
            <strong>Reading</strong> · 3 min
          </div>
          <div>
            <strong>Status</strong> · Printable
          </div>
        </div>

        <p className="ed-lead ed-rise ed-rise-3">
          BatesStamp processes your PDFs entirely in your browser. This is not
          a policy. It is a property of the architecture — and you can verify
          it for yourself in thirty seconds.
        </p>

        <section className="ed-section" data-num="§ 01">
          <h2 className="ed-h2">Verify it in thirty seconds</h2>
          <div className="ed-prose mt-6">
            <ol>
              <li>Open this page.</li>
              <li>
                Press <code>F12</code> or <code>⌘ + ⌥ + I</code> to open
                DevTools.
              </li>
              <li>
                Navigate to the <strong>Network</strong> tab.
              </li>
              <li>Click the &quot;Clear&quot; button to empty the request log.</li>
              <li>Stamp a PDF.</li>
              <li>Watch the Network tab. You will see zero requests.</li>
            </ol>
            <p>
              For an even stronger demonstration, disconnect from the internet
              before stamping. The tool will still work because the page is
              cached locally and all processing is offline.
            </p>
          </div>

          <blockquote className="ed-pullquote">
            The strongest privacy claim is the one that survives disconnection.
          </blockquote>
        </section>

        <section className="ed-section" data-num="§ 02">
          <h2 className="ed-h2">For your IT department</h2>
          <p className="ed-prose mt-4">
            The summary below is suitable for forwarding to a security team or
            for attaching to a software-approval ticket. The page itself is
            printable.
          </p>

          <div className="ed-card mt-8">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--rule)] pb-3">
              <span className="ed-kicker !mt-0">IT Review Summary</span>
              <span className="font-mono text-[0.65rem] tracking-[0.2em] text-[var(--ink-faint)]">
                BS-IR-001
              </span>
            </div>
            <dl className="space-y-4">
              {IT_REVIEW_ROWS.map((row, i) => (
                <div
                  key={row.k}
                  className="grid grid-cols-1 gap-1 border-b border-[var(--rule)]/60 pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[180px_1fr] sm:gap-6"
                >
                  <dt className="flex items-baseline gap-2">
                    <span className="font-mono text-[0.6rem] tracking-[0.2em] text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="ed-h3 !text-[0.95rem]">{row.k}</span>
                  </dt>
                  <dd className="ed-prose !mt-0 !text-[0.98rem] !leading-[1.6]">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className="ed-fleuron">
          <span>❦</span>
        </div>

        <p className="ed-colophon">
          The architecture is the affidavit. Disconnect, stamp, observe.
        </p>

        <div className="mt-8 text-center">
          <Link href="/" className="ed-back">
            ← Return to the tool
          </Link>
        </div>
      </article>
    </div>
  );
}
