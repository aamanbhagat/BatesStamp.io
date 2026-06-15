import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Best Practices for Bates Numbering Confidential Legal Documents",
  description:
    "Protecting client privilege and confidentiality is a primary ethical duty. Learn why uploading PDFs to third-party servers for Bates stamping poses major security risks.",
  alternates: { canonical: "/articles/best-practices-confidential-documents/" },
};

export default function BestPracticesConfidentialDocuments() {
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
                name: "Best Practices for Confidential Documents",
                path: "/articles/best-practices-confidential-documents/",
              },
            ])
          ),
        }}
      />
      <article className="ed-content mx-auto max-w-2xl px-6 py-16 sm:py-24 md:max-w-3xl">
        <div className="ed-rise ed-rise-1">
          <span className="ed-kicker">Volume III · Article 02</span>
          <h1 className="ed-display mt-6 text-5xl sm:text-7xl">
            Bates-Stamping <em>Confidential</em> Documents.
          </h1>
        </div>

        <div className="ed-meta ed-rise ed-rise-2">
          <div>
            <strong>Filed</strong> · Practice Advisory
          </div>
          <div>
            <strong>Reading</strong> · 5 min
          </div>
          <div>
            <strong>Rule</strong> · ABA Model Rule 1.6
          </div>
        </div>

        <p className="ed-lead ed-rise ed-rise-3">
          Lawyers have an ethical duty to safeguard client data. Yet, during
          discovery, sensitive files are routinely uploaded to free, unvetted
          online PDF converters. Let&apos;s look at the security risks involved and
          best practices for protecting your client&apos;s privilege.
        </p>

        <section className="ed-section" data-num="§ 01">
          <h2 className="ed-h2">The Security Risk of Free Online Converters</h2>
          <div className="ed-prose mt-6">
            <p className="dropcap">
              When a paralegal or attorney needs to quickly stamp a set of PDFs and
              doesn&apos;t have Adobe Acrobat Pro handy, they often turn to search
              engines. Querying &quot;free online bates numbering&quot; yields dozen of
              tools. But there is a catch: almost all of them require uploading
              your files to their remote servers.
            </p>
            <p>
              Once your files leave your computer and travel across the internet
              to a third-party server:
            </p>
            <ul>
              <li>
                <strong>You lose control</strong>: You do not know how long the server stores your
                confidential litigation documents, who has access to them, or what security
                safeguards are active on their host servers.
              </li>
              <li>
                <strong>Metadata Exposure</strong>: PDFs can contain hidden metadata, comments, and revision
                histories that may be exposed to the server operator.
              </li>
              <li>
                <strong>Breach Risks</strong>: Third-party databases are high-value targets for hackers. A breach
                of a PDF converter platform could expose sensitive medical records, intellectual property, or trade secrets.
              </li>
            </ul>
          </div>
        </section>

        <section className="ed-section" data-num="§ 02">
          <h2 className="ed-h2">Model Rule 1.6 and the Duty of Technology Competence</h2>
          <div className="ed-prose mt-6">
            <p>
              The American Bar Association (ABA) Model Rule 1.6(c) states: &quot;A lawyer shall make
              reasonable efforts to prevent the inadvertent or unauthorized disclosure of, or
              unauthorized access to, information relating to the representation of a client.&quot;
            </p>
            <p>
              Under the Duty of Technology Competence, lawyers must understand the risks and benefits
              associated with relevant technology. Simply using whatever tool appears first on Google
              without evaluating its data transmission behavior does not satisfy this duty.
            </p>
          </div>

          <blockquote className="ed-pullquote">
            Uploading confidential discovery materials to an unverified web server is an avoidable compromise of client confidentiality.
          </blockquote>
        </section>

        <section className="ed-section" data-num="§ 03">
          <h2 className="ed-h2">A Modern Standard: Client-Side Processing</h2>
          <div className="ed-prose mt-6">
            <p>
              Fortunately, advances in modern browser capabilities have made remote file uploading
              obsolete for simple PDF utilities. Using client-side JavaScript, files can be manipulated,
              annotated, and stamped entirely within the sandbox of the browser tab.
            </p>
            <p>
              To ensure compliance:
            </p>
            <ol>
              <li>
                <strong>Verify Offline Support</strong>: A truly client-side application will continue to
                work even if you disconnect your internet connection entirely after loading the page.
              </li>
              <li>
                <strong>Check Network Logs</strong>: Using browser developer tools, verify that no PDF bytes
                or file content are being sent to external APIs during processing.
              </li>
              <li>
                <strong>Advocate for Institutional Compliance</strong>: Inform your firm&apos;s IT
                department about browser-only tools that require no local installation or administrative overhead.
              </li>
            </ol>
          </div>
        </section>

        <div className="ed-fleuron">
          <span>❦</span>
        </div>

        <p className="ed-colophon">
          BatesStamp is designed with a strict zero-upload architecture. Stamping is done entirely
          client-side, protecting client privilege and ensuring compliance with Model Rule 1.6.
        </p>

        <div className="mt-8 text-center flex flex-col items-center gap-4">
          <Link href="/" className="ed-back">
            → Add Private Bates Stamps Now
          </Link>
          <Link href="/articles/" className="text-xs text-neutral-500 hover:text-emerald-400 font-mono">
            ← Back to Articles
          </Link>
        </div>
      </article>
    </div>
  );
}
