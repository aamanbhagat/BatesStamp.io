import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bates Numbering Software for Paralegals — Free, No Upload",
  description:
    "Free Bates numbering tool built for paralegals. Works on Citrix and locked-down corporate browsers. No installs, no admin rights, no uploads.",
  alternates: { canonical: "/for-paralegals/" },
};

export default function ForParalegals() {
  return (
    <div className="editorial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "For Paralegals", path: "/for-paralegals/" },
            ])
          ),
        }}
      />
      <article className="ed-content mx-auto max-w-2xl px-6 py-16 sm:py-24 md:max-w-3xl">
        <div className="ed-rise ed-rise-1">
          <span className="ed-kicker">Volume I · Article 02</span>
          <h1 className="ed-display mt-6 text-5xl sm:text-7xl">
            For the <em>Paralegal</em> at 4&nbsp;p.m.
          </h1>
        </div>

        <div className="ed-meta ed-rise ed-rise-2">
          <div>
            <strong>Filed</strong> · Practitioner&apos;s Guide
          </div>
          <div>
            <strong>Reading</strong> · 5 min
          </div>
          <div>
            <strong>Audience</strong> · Litigation Support
          </div>
        </div>

        <p className="ed-lead ed-rise ed-rise-3">
          You need to Bates-stamp a discovery production today. IT won&apos;t
          install Acrobat Pro. The cloud tools insist on uploading client
          documents. Your firm runs on Citrix. This article is for that
          afternoon.
        </p>

        <section className="ed-section" data-num="§ 01">
          <h2 className="ed-h2">Why a free in-browser tool exists at all</h2>
          <div className="ed-prose mt-6">
            <p className="dropcap">
              Most Bates numbering tools fall into one of three categories, each
              with a different friction point that lands on the paralegal
              rather than the partner who chose it.
            </p>
            <ul>
              <li>
                <strong>Adobe Acrobat Pro</strong> — works perfectly, but it
                requires a license, IT approval, and isn&apos;t available on
                every workstation in the firm.
              </li>
              <li>
                <strong>Cloud Bates tools</strong> — fast and capable, but they
                require uploading the PDFs to a third party. For
                client-confidential or privileged documents that&apos;s a
                non-starter, even when the vendor is reputable.
              </li>
              <li>
                <strong>Desktop applications</strong> — Bates Express, BatesPro,
                and others. Often dated, often paid, and routinely blocked by
                corporate IT policies the moment you try to install one.
              </li>
            </ul>
            <p>
              BatesStamp lives in the browser tab you already have open. No
              install. No admin rights. No upload.
            </p>
          </div>

          <blockquote className="ed-pullquote">
            The Bates job is small. The friction surrounding it is enormous.
            That asymmetry is the entire reason this tool exists.
          </blockquote>
        </section>

        <section className="ed-section" data-num="§ 02">
          <h2 className="ed-h2">Why your IT department will be okay with it</h2>
          <div className="ed-prose mt-6">
            <ul>
              <li>It is a webpage. There are no executables to whitelist.</li>
              <li>
                During processing, there are zero outbound network requests.
                You can verify this in DevTools or, if your IT team prefers,
                with Wireshark.
              </li>
              <li>
                The tool functions with no internet connection at all after the
                first load.
              </li>
              <li>
                Forward your IT team to{" "}
                <Link href="/privacy-verified/">the privacy verification page</Link>
                {" "}
                — a printable one-pager designed to satisfy a software approval
                ticket.
              </li>
            </ul>
          </div>
        </section>

        <section className="ed-section" data-num="§ 03">
          <h2 className="ed-h2">The features that matter for production</h2>
          <div className="ed-prose mt-6">
            <ul>
              <li>
                <strong>Custom prefix</strong> — typically the matter or party
                identifier (e.g., <code>SMITH 0000001</code>).
              </li>
              <li>
                <strong>Configurable padding</strong> — one to ten digits, to
                match firm convention or a specific court order.
              </li>
              <li>
                <strong>Continuous numbering across files</strong> — drop your
                whole production set in order and receive a single sequential
                numbering across the entire collection.
              </li>
              <li>
                <strong>Position presets</strong> — bottom-right is the default
                and the universal standard, but all four corners and the top
                and bottom centers are available.
              </li>
              <li>
                <strong>Optional date suffix</strong> — production date inline
                with the Bates number when needed.
              </li>
            </ul>
          </div>
        </section>

        <section className="ed-section" data-num="§ 04">
          <h2 className="ed-h2">What this tool does not do — yet</h2>
          <div className="ed-card mt-6">
            <div className="ed-prose">
              <ul>
                <li>OCR for scanned PDFs. Bring already-text PDFs.</li>
                <li>Redaction. Use a redaction-specific tool first.</li>
                <li>
                  Production logs and load files. You will need a separate
                  workflow for those.
                </li>
                <li>
                  Native (non-PDF) document conversion. Convert to PDF first.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <div className="ed-fleuron">
          <span>❦</span>
        </div>

        <p className="ed-colophon">
          Built for the paralegal who needs the production out before the
          courier arrives. Honest about its scope, ruthless about its privacy.
        </p>

        <div className="mt-8 text-center">
          <Link href="/" className="ed-back">
            ← Stamp your first PDF
          </Link>
        </div>
      </article>
    </div>
  );
}
