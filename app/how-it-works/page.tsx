import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How BatesStamp Works — In-Browser PDF Bates Numbering",
  description:
    "Technical explanation of how BatesStamp adds Bates numbers to PDFs entirely in your browser using WebAssembly. No uploads, no servers — verifiable.",
  alternates: { canonical: "/how-it-works/" },
};

export default function HowItWorks() {
  return (
    <div className="editorial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "How It Works", path: "/how-it-works/" },
            ])
          ),
        }}
      />
      <article className="ed-content mx-auto max-w-2xl px-6 py-16 sm:py-24 md:max-w-3xl">
        <div className="ed-rise ed-rise-1">
          <span className="ed-kicker">Volume I · Article 01</span>
          <h1 className="ed-display mt-6 text-5xl sm:text-7xl">
            How <em>BatesStamp</em> Works
          </h1>
        </div>

        <div className="ed-meta ed-rise ed-rise-2">
          <div>
            <strong>Filed</strong> · Technical Explainer
          </div>
          <div>
            <strong>Reading</strong> · 4 min
          </div>
          <div>
            <strong>Audience</strong> · Curious Users &amp; IT Reviewers
          </div>
        </div>

        <p className="ed-lead ed-rise ed-rise-3">
          BatesStamp adds Bates numbers to PDFs without ever uploading them.
          Below, the architecture in plain English — and the steps you can take
          to verify the privacy promise for yourself.
        </p>

        <div className="ed-toc ed-rise ed-rise-4">
          <div className="ed-toc-label">Table of Contents</div>
          <ul className="ed-toc-list">
            <li>
              <span className="num">§ 01</span>
              <a href="#thirty-second">The thirty-second version</a>
              <span className="dots" />
              <span className="num">P.1</span>
            </li>
            <li>
              <span className="num">§ 02</span>
              <a href="#verify">How to verify it yourself</a>
              <span className="dots" />
              <span className="num">P.2</span>
            </li>
            <li>
              <span className="num">§ 03</span>
              <a href="#stack">What runs in your browser</a>
              <span className="dots" />
              <span className="num">P.2</span>
            </li>
            <li>
              <span className="num">§ 04</span>
              <a href="#numbering">Sequential numbering across files</a>
              <span className="dots" />
              <span className="num">P.3</span>
            </li>
            <li>
              <span className="num">§ 05</span>
              <a href="#limits">Limits</a>
              <span className="dots" />
              <span className="num">P.3</span>
            </li>
          </ul>
        </div>

        <section
          id="thirty-second"
          className="ed-section"
          data-num="§ 01"
        >
          <h2 className="ed-h2">The thirty-second version</h2>
          <div className="ed-prose mt-6">
            <p className="dropcap">
              You drop a PDF onto the page. Your browser loads the file into
              memory using the standard File API. A WebAssembly-backed PDF
              library — <code>pdf-lib</code> — opens the document, draws the
              Bates number on each page, and re-saves it. The stamped PDF is
              offered to you as a download.
            </p>
            <p>
              At no point does the file leave your computer. The browser&apos;s
              sandbox and the absence of any upload code make this technically
              verifiable, not merely a promise.
            </p>
          </div>

          <blockquote className="ed-pullquote">
            The privacy isn&apos;t a policy. It&apos;s a property of the
            architecture.
          </blockquote>
        </section>

        <section id="verify" className="ed-section" data-num="§ 02">
          <h2 className="ed-h2">How to verify it yourself</h2>
          <div className="ed-prose mt-6">
            <p>
              Open your browser&apos;s DevTools (<code>F12</code> on Windows,{" "}
              <code>⌘ + ⌥ + I</code> on Mac), navigate to the Network tab, and
              stamp a file. You will observe the following.
            </p>
            <ul>
              <li>
                <strong>Initial page load:</strong> the HTML, JavaScript, and
                font files load — these are the application itself.
              </li>
              <li>
                <strong>During stamping:</strong> precisely zero requests.
              </li>
            </ul>
            <p>
              For an even stronger demonstration, disconnect from the internet
              after the page loads. The tool keeps working — that is the
              strongest possible proof that nothing is being uploaded, because
              there is no network on which to upload anything.
            </p>
          </div>
        </section>

        <section id="stack" className="ed-section" data-num="§ 03">
          <h2 className="ed-h2">What runs in your browser</h2>
          <div className="ed-prose mt-6">
            <ul>
              <li>
                <strong>pdf-lib</strong> — an MIT-licensed JavaScript library
                that reads, edits, and writes PDF files. Used in production by
                thousands of applications.
              </li>
              <li>
                <strong>JSZip</strong> — bundles multiple stamped PDFs into a
                single archive for batch downloads.
              </li>
              <li>
                <strong>Service Worker</strong> — caches the application shell
                so the page loads instantly on repeat visits and continues to
                function with no internet at all.
              </li>
            </ul>
          </div>
        </section>

        <section id="numbering" className="ed-section" data-num="§ 04">
          <h2 className="ed-h2">Sequential numbering across files</h2>
          <div className="ed-prose mt-6">
            <p>
              For discovery production, Bates numbers must run sequentially
              across an entire production set, never restarting at one. This is
              the default behavior: drop multiple files, and numbering continues
              from where the previous file left off.
            </p>
            <p>
              When you need per-document sequences instead — for instance, when
              producing exhibits that each begin at <code>EX 0001</code> —
              switch to the &quot;restart per file&quot; mode in the options
              panel.
            </p>
          </div>
        </section>

        <section id="limits" className="ed-section" data-num="§ 05">
          <h2 className="ed-h2">Limits</h2>
          <div className="ed-prose mt-6">
            <p>
              Because everything runs in your browser, the practical limit is
              your computer&apos;s available memory. Files up to a few hundred
              pages stamp in seconds on a modern laptop. Multi-thousand-page
              PDFs may slow your tab; if you encounter a memory wall, split the
              document with a tool such as Acrobat first, then stamp the parts
              in order.
            </p>
          </div>
        </section>

        <div className="ed-fleuron">
          <span>❦</span>
        </div>

        <p className="ed-colophon">
          BatesStamp is published as a static site. No analytics. No telemetry.
          No third-party scripts at runtime.
          <br />
          Composed in <em>Fraunces</em> &amp; <em>JetBrains Mono</em>.
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
