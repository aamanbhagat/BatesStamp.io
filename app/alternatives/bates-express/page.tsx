import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Bates Express Alternative — In-Browser Bates Numbering",
  description:
    "Looking for a free Bates Express alternative? BatesStamp adds Bates numbers to PDFs in your browser. No install, no upload, no cost.",
  alternates: { canonical: "/alternatives/bates-express/" },
};

export default function BatesExpressAlternative() {
  return (
    <div className="editorial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Alternatives", path: "/alternatives/bates-express/" },
              { name: "vs Bates Express", path: "/alternatives/bates-express/" },
            ])
          ),
        }}
      />
      <article className="ed-content mx-auto max-w-2xl px-6 py-16 sm:py-24 md:max-w-3xl">
        <div className="ed-rise ed-rise-1">
          <span className="ed-kicker">Volume II · Comparison 02</span>
          <h1 className="ed-display mt-6 text-5xl sm:text-7xl">
            A modern alternative to <em>Bates Express</em>.
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
            <strong>Subject</strong> · Bates Express
          </div>
        </div>

        <p className="ed-lead ed-rise ed-rise-3">
          Bates Express is a long-standing Windows desktop tool. If you need a
          modern, free, cross-platform alternative that runs anywhere a
          browser does, this article is for you.
        </p>

        <section className="ed-section" data-num="§ 01">
          <h2 className="ed-h2">Why look for an alternative</h2>
          <div className="ed-prose mt-6">
            <p className="dropcap">
              Bates Express has served paralegals well for years, but the world
              around it has changed. The four most common frustrations:
            </p>
            <ul>
              <li>
                Windows-only — useless on Mac or Chromebook, and increasingly on
                managed cloud workstations.
              </li>
              <li>
                Requires an install — often blocked outright by IT.
              </li>
              <li>
                The free version is meaningfully limited; the paid version
                begins at around <code>$79</code>.
              </li>
              <li>
                The interface dates from another decade.
              </li>
            </ul>
          </div>

          <blockquote className="ed-pullquote">
            A tool people first installed in 2009 is being asked to work on a
            Chromebook in 2026.
          </blockquote>
        </section>

        <section className="ed-section" data-num="§ 02">
          <h2 className="ed-h2">What BatesStamp does differently</h2>
          <div className="ed-prose mt-6">
            <ul>
              <li>
                Runs in any modern browser — Chrome, Firefox, Safari, Edge.
              </li>
              <li>No install, no admin rights, no purchase.</li>
              <li>
                Files never leave your computer. Genuinely safer for
                confidential matters than any tool that uploads.
              </li>
              <li>Works offline once loaded.</li>
              <li>
                Continuous numbering across multiple files for production sets.
              </li>
            </ul>
          </div>
        </section>

        <section className="ed-section" data-num="§ 03">
          <h2 className="ed-h2">What Bates Express still does, and we don&apos;t</h2>
          <div className="ed-card mt-6">
            <div className="ed-prose">
              <ul>
                <li>OCR for scanned-image PDFs.</li>
                <li>Splitting and merging PDFs in the same workflow.</li>
                <li>Production logs and load-file generation.</li>
              </ul>
              <p>
                For Bates numbering alone, BatesStamp is faster, simpler, and
                free. For everything else on that list, look elsewhere — and
                that&apos;s an honest answer.
              </p>
            </div>
          </div>
        </section>

        <div className="ed-fleuron">
          <span>❦</span>
        </div>

        <p className="ed-colophon">
          Honest scope. Modern browser. No license key.
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
