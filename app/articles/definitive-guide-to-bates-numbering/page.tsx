import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "The Definitive Guide to Bates Numbering in Litigation Support",
  description:
    "Learn the history, best practices, and modern digital standards for Bates stamping legal documents in discovery and litigation.",
  alternates: { canonical: "/articles/definitive-guide-to-bates-numbering/" },
};

export default function DefinitiveGuideToBatesNumbering() {
  return (
    <div className="editorial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Articles", path: "/articles/" },
              {
                name: "The Definitive Guide to Bates Numbering",
                path: "/articles/definitive-guide-to-bates-numbering/",
              },
            ])
          ),
        }}
      />
      <article className="ed-content mx-auto max-w-2xl px-6 py-16 sm:py-24 md:max-w-3xl">
        <div className="ed-rise ed-rise-1">
          <span className="ed-kicker">Volume III · Article 01</span>
          <h1 className="ed-display mt-6 text-5xl sm:text-7xl">
            The Definitive Guide to <em>Bates</em> Numbering.
          </h1>
        </div>

        <div className="ed-meta ed-rise ed-rise-2">
          <div>
            <strong>Filed</strong> · Reference Guide
          </div>
          <div>
            <strong>Reading</strong> · 6 min
          </div>
          <div>
            <strong>Subject</strong> · Lit Support Standard
          </div>
        </div>

        <p className="ed-lead ed-rise ed-rise-3">
          Whether you are a seasoned paralegal or a first-year associate, Bates
          stamping is an unavoidable reality of litigation. Let&apos;s examine
          its history, legal significance, and how the standard holds up in
          the age of e-discovery.
        </p>

        <section className="ed-section" data-num="§ 01">
          <h2 className="ed-h2">What is Bates Numbering?</h2>
          <div className="ed-prose mt-6">
            <p className="dropcap">
              Bates numbering (also known as Bates stamping or Bates coding) is a
              method used in the legal industry to label and identify pages of
              documents during discovery and trial preparation. It involves
              assigning a unique, sequential number to each page of a production
              set.
            </p>
            <p>
              Its purpose is simple yet critical: it establishes a clear, shared
              reference system so that attorneys, judges, witnesses, and court
              reporters can refer to a specific page of evidence without
              ambiguity. If a lawyer says &quot;Look at page 45,&quot; it could
              mean anything. If they say &quot;Look at SMITH_0000045,&quot; everyone
              knows exactly which page is under discussion.
            </p>
          </div>

          <blockquote className="ed-pullquote">
            Without Bates numbers, the trial transcript would descend into
            chaos within minutes of the first exhibit introduction.
          </blockquote>
        </section>

        <section className="ed-section" data-num="§ 02">
          <h2 className="ed-h2">The Anatomy of a Modern Bates Stamp</h2>
          <div className="ed-prose mt-6">
            <p>
              In the digital age, a Bates stamp typically consists of three parts,
              carefully arranged to maximize legibility and prevent collision:
            </p>
            <ol>
              <li>
                <strong>The Prefix (Alphanumeric)</strong> — Usually indicates the
                party producing the documents (e.g., <code>PLTF</code> for Plaintiff, 
                <code>DEF</code> for Defendant) or the case name (e.g., <code>SMITH</code>).
              </li>
              <li>
                <strong>The Sequential Number (Numeric)</strong> — A padded number
                that increments with each page (e.g., <code>0000001</code>). Padding is
                essential so that sorting files alphabetically by their name matches the
                numerical order.
              </li>
              <li>
                <strong>The Position</strong> — Historically stamped on the physical page,
                it is now digitally burned into the PDF. The standard position is the
                bottom-right corner, though bottom-center and top-right are common alternatives.
              </li>
            </ol>
            <p>
              Example of a fully formatted Bates stamp: <code>ACME_0000234</code>.
            </p>
          </div>
        </section>

        <section className="ed-section" data-num="§ 03">
          <h2 className="ed-h2">The Rules of the Game</h2>
          <div className="ed-prose mt-6">
            <p>
              Different courts and discovery protocols have specific standards for how Bates
              numbers must be generated and formatted:
            </p>
            <ul>
              <li>
                <strong>Consistency</strong>: Once a numbering schema is chosen (e.g. 6-digit
                padding vs 8-digit padding), it must remain consistent across the entire
                production.
              </li>
              <li>
                <strong>Clarity</strong>: The font size, color (typically black or red), and position
                must not overlap with the original text or visual contents of the document.
              </li>
              <li>
                <strong>No Gaps</strong>: Skipping numbers in a sequence is highly discouraged and
                often requires a formal explanation or correction, as it raises questions about
                missing or hidden documents.
              </li>
            </ul>
          </div>
        </section>

        <div className="ed-fleuron">
          <span>❦</span>
        </div>

        <p className="ed-colophon">
          Need to Bates-stamp a production now? BatesStamp does it entirely in your
          browser — fast, secure, and 100% private.
        </p>

        <div className="mt-8 text-center flex flex-col items-center gap-4">
          <Link href="/" className="ed-back">
            → Try BatesStamp for Free
          </Link>
          <Link href="/articles/" className="text-xs text-neutral-500 hover:text-emerald-400 font-mono">
            ← Back to Articles
          </Link>
        </div>
      </article>
    </div>
  );
}
