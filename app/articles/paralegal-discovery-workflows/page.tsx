import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How Paralegals Can Streamline Discovery with Bates Stamping Workflows",
  description:
    "A practical guide for paralegals and litigation support specialists to organize, format, and execute Bates stamping for discovery productions.",
  alternates: { canonical: "/articles/paralegal-discovery-workflows/" },
};

export default function ParalegalDiscoveryWorkflows() {
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
                name: "How Paralegals Streamline Discovery Workflows",
                path: "/articles/paralegal-discovery-workflows/",
              },
            ])
          ),
        }}
      />
      <article className="ed-content mx-auto max-w-2xl px-6 py-16 sm:py-24 md:max-w-3xl">
        <div className="ed-rise ed-rise-1">
          <span className="ed-kicker">Volume III · Article 03</span>
          <h1 className="ed-display mt-6 text-5xl sm:text-7xl">
            Streamlining <em>Discovery</em> Workflows.
          </h1>
        </div>

        <div className="ed-meta ed-rise ed-rise-2">
          <div>
            <strong>Filed</strong> · Practitioner&apos;s Handbook
          </div>
          <div>
            <strong>Reading</strong> · 6 min
          </div>
          <div>
            <strong>Topic</strong> · Litigation Support
          </div>
        </div>

        <p className="ed-lead ed-rise ed-rise-3">
          As a paralegal, you are the final line of defense before a production leaves
          the office. When deadlines loom and thousands of pages need ordering, a structured
          Bates stamping workflow is your best insurance against costly errors.
        </p>

        <section className="ed-section" data-num="§ 01">
          <h2 className="ed-h2">Step 1: Document Collection and Pre-Sorting</h2>
          <div className="ed-prose mt-6">
            <p className="dropcap">
              Never stamp documents directly from a raw source folder. The first rule of a
              reliable legal workflow is to create a clean, dedicated &quot;production sandbox&quot;
              directory on your machine.
            </p>
            <p>
              Before running any stamping script or opening a browser tool:
            </p>
            <ul>
              <li>
                <strong>Convert Non-PDFs First</strong>: Ensure all emails, spreadsheets, and text
                transcripts are converted to standard PDF format.
              </li>
              <li>
                <strong>Set File Order</strong>: Sort files alphabetically or by date according to the
                discovery protocol. A standard naming convention (e.g., <code>001_Contract.pdf</code>,
                <code>002_EmailChain.pdf</code>) guarantees they load in the correct sequence.
              </li>
              <li>
                <strong>Verify Password Locks</strong>: Open any restricted documents and strip their passwords.
                Locked documents will fail or cause errors in the batch stamping process.
              </li>
            </ul>
          </div>
        </section>

        <section className="ed-section" data-num="§ 02">
          <h2 className="ed-h2">Step 2: Choosing Your Prefix Strategy</h2>
          <div className="ed-prose mt-6">
            <p>
              Your Bates prefix is your calling card. It should clearly identify the producing party and prevent
              any naming conflicts with opposing counsel:
            </p>
            <ul>
              <li>
                <strong>Party Identifiers</strong>: If you represent the plaintiff, use a prefix like
                <code>PLTF</code> or <code>P_SMITH</code>. If the defendant, use <code>DEF</code> or <code>D_SMITH</code>.
              </li>
              <li>
                <strong>Avoid Special Characters</strong>: Stick to letters, numbers, and underscores. Characters like
                hyphens, slashes, or symbols can break sorting systems or folder hierarchies down the road.
              </li>
              <li>
                <strong>Coordinate Padding</strong>: Use at least 6 digits of padding (e.g., <code>000001</code>). If
                the production could exceed 100,000 pages, opt for 8-digit padding. This ensures chronological alignment.
              </li>
            </ul>
          </div>

          <blockquote className="ed-pullquote">
            Consistency in prefixes prevents document databases from misfiling records during trial preparation.
          </blockquote>
        </section>

        <section className="ed-section" data-num="§ 03">
          <h2 className="ed-h2">Step 3: Stamping and Sanity Checks</h2>
          <div className="ed-prose mt-6">
            <p>
              Once files are ordered and prefixes are chosen, you are ready to stamp. Drop your PDFs
              into a local offline tool like BatesStamp. Use these quality control steps:
            </p>
            <ol>
              <li>
                <strong>Verify Multi-File Sequence</strong>: If you are dropping multiple files, verify that
                the tool runs sequentially across the entire batch (e.g., File A ends at 000050, File B starts
                at 000051).
              </li>
              <li>
                <strong>Spot Check Margin Overlaps</strong>: Check the first, middle, and last pages of the output.
                Ensure the stamp does not overlap signatures, footers, or important text.
              </li>
              <li>
                <strong>Confirm Privacy Verification</strong>: If working on sensitive corporate matters, double-check
                that you are using a client-side environment that processes files within your local sandbox.
              </li>
            </ol>
          </div>
        </section>

        <div className="ed-fleuron">
          <span>❦</span>
        </div>

        <p className="ed-colophon">
          BatesStamp is designed with a lightweight, browser-based, offline architecture to let paralegals
          efficiently stamp batches of files securely without leaving their desk or waiting for software approvals.
        </p>

        <div className="mt-8 text-center flex flex-col items-center gap-4">
          <Link href="/" className="ed-back">
            → Try BatesStamp on Your Production
          </Link>
          <Link href="/articles/" className="text-xs text-neutral-500 hover:text-emerald-400 font-mono">
            ← Back to Articles
          </Link>
        </div>
      </article>
    </div>
  );
}
