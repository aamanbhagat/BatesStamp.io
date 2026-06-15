import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "A History of the Bates Stamp: From Mechanical Inventions to Digital e-Discovery",
  description:
    "Explore the origins of the Bates Automatic Numbering Machine patented in 1891 by Edwin G. Bates, and how it evolved into the digital standard for e-discovery.",
  alternates: { canonical: "/articles/history-of-bates-stamp/" },
};

export default function HistoryOfBatesStamp() {
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
                name: "A History of the Bates Stamp",
                path: "/articles/history-of-bates-stamp/",
              },
            ])
          ),
        }}
      />
      <article className="ed-content mx-auto max-w-2xl px-6 py-16 sm:py-24 md:max-w-3xl">
        <div className="ed-rise ed-rise-1">
          <span className="ed-kicker">Volume III · Article 05</span>
          <h1 className="ed-display mt-6 text-5xl sm:text-7xl">
            A History of the <em>Bates</em> Stamp.
          </h1>
        </div>

        <div className="ed-meta ed-rise ed-rise-2">
          <div>
            <strong>Filed</strong> · Legal History
          </div>
          <div>
            <strong>Reading</strong> · 5 min
          </div>
          <div>
            <strong>Inventor</strong> · Edwin G. Bates
          </div>
        </div>

        <p className="ed-lead ed-rise ed-rise-3">
          Long before PDF libraries and serverless web tools, legal practitioners organized
          evidence using heavy iron, ink wells, and mechanical gears. Let&apos;s trace the origin
          of the Bates stamp from its 1891 mechanical patent to its digital evolution.
        </p>

        <section className="ed-section" data-num="§ 01">
          <h2 className="ed-h2">Edwin G. Bates and the 1891 Patent</h2>
          <div className="ed-prose mt-6">
            <p className="dropcap">
              In the late 19th century, keeping track of business ledgers, receipts, and legal records
              was a laborious task. While number stamping devices existed, they required manual
              rotation of number wheels between each stamp—a slow process prone to clerical error.
            </p>
            <p>
              In 1891, a New York inventor named Edwin G. Bates patented the **Bates Automatic Numbering Machine**.
              His design featured a internal mechanism of rotating metal wheels and advanced gears. Every time the
              operator pressed down on the handle to ink a page, the machine automatically incremented the numerical wheel
              by one digit.
            </p>
            <p>
              This simple, automatic incrementation eliminated the possibility of duplicate numbers and revolutionized
              recordkeeping across law offices, banks, and corporate entities.
            </p>
          </div>
        </section>

        <section className="ed-section" data-num="§ 02">
          <h2 className="ed-h2">The Mechanical Anatomy</h2>
          <div className="ed-prose mt-6">
            <p>
              The classic mechanical Bates stamp was a marvel of industrial design. Encased in a heavy iron frame,
              it contained:
            </p>
            <ul>
              <li>
                <strong>Rotating Metal Wheels</strong>: Engraved with numbers 0 through 9, typically configured
                with six to eight wheels (representing thousands or millions of pages).
              </li>
              <li>
                <strong>A Dial Settings Lever</strong>: Allowed the operator to choose between continuous numbering,
                duplicate stamping (stamping the same number twice before advancing, ideal for filing carbon copies), or
                repeating the same number indefinitely.
              </li>
              <li>
                <strong>Felt Ink Pad</strong>: Positioned at the bottom, the metal wheels rested on this pad before
                being pressed against paper.
              </li>
            </ul>
          </div>

          <blockquote className="ed-pullquote">
            The distinct metallic click of the mechanical Bates stamp was the background noise of the 20th-century litigation firm.
          </blockquote>
        </section>

        <section className="ed-section" data-num="§ 03">
          <h2 className="ed-h2">The Digital Migration</h2>
          <div className="ed-prose mt-6">
            <p>
              As law firms transitioned from physical files to computers in the late 1990s and early 2000s,
              the need for Bates numbering did not vanish. It grew.
            </p>
            <p>
              Litigants now produce gigabytes of emails, chat logs, and digital PDFs. Instead of stamping paper,
              modern legal tech uses software to &quot;burn&quot; Bates stamps onto digital PDF pages.
            </p>
            <p>
              While the physical iron stamp has become a collector&apos;s item, Edwin Bates&apos; name lives on.
              The terminology and formatting principles he established remain the absolute bedrock of e-discovery standards today.
            </p>
          </div>
        </section>

        <div className="ed-fleuron">
          <span>❦</span>
        </div>

        <p className="ed-colophon">
          At BatesStamp.io, we honor the legacy of Edwin G. Bates by making the digital equivalent of his machine
          accessible, secure, and completely free for the next generation of legal practitioners.
        </p>

        <div className="mt-8 text-center flex flex-col items-center gap-4">
          <Link href="/" className="ed-back">
            → Try the Digital Bates Machine
          </Link>
          <Link href="/articles/" className="text-xs text-neutral-500 hover:text-emerald-400 font-mono">
            ← Back to Articles
          </Link>
        </div>
      </article>
    </div>
  );
}
