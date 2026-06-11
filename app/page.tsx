import type { Metadata } from "next";
import { BatesTool } from "@/components/BatesTool";
import Link from "next/link";
import { faqPageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Bates Numbering for PDFs — In-Browser, No Upload",
  description:
    "Add Bates numbers to PDFs entirely in your browser. No uploads, no accounts, no cost — built for paralegals handling discovery production.",
  alternates: { canonical: "/" },
};

const HOME_FAQ = [
  {
    q: "Are my PDFs uploaded anywhere?",
    a: "No. Stamping happens entirely in your browser using WebAssembly. Open DevTools → Network and you'll see zero requests during processing.",
  },
  {
    q: "Will this work on a confidential matter?",
    a: "Yes. Because nothing is uploaded, BatesStamp doesn't create the data-handling concerns that cloud-based tools do. See our privacy verification page for IT review materials.",
  },
  {
    q: "Can I batch-stamp many files?",
    a: "Yes. Drop multiple PDFs, choose continuous or restart-per-file numbering, and download the whole set as a ZIP.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(HOME_FAQ)) }}
      />
      <section className="mb-10 text-center">
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">
          Free Bates Numbering for PDFs.{" "}
          <span className="text-emerald-500">No upload required.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-neutral-300 sm:text-lg">
          Add Bates numbers to discovery documents in seconds. Everything runs
          in your browser — files never leave your device. No accounts, no
          subscriptions, no ads.
        </p>
        <ul className="mx-auto mt-6 flex max-w-2xl flex-col items-center justify-center gap-2 text-sm text-neutral-300 sm:flex-row sm:gap-6">
          <li className="flex items-center gap-2">
            <Dot /> 100% client-side
          </li>
          <li className="flex items-center gap-2">
            <Dot /> Batch unlimited PDFs
          </li>
          <li className="flex items-center gap-2">
            <Dot /> Works offline
          </li>
        </ul>
      </section>

      <BatesTool />

      <section className="mt-12 grid gap-6 sm:grid-cols-3">
        <Feature
          title="Privacy-first by design"
          body="Your PDFs are stamped locally with WebAssembly. Nothing leaves your computer. We can't see your files even if we wanted to."
        />
        <Feature
          title="Works on locked-down systems"
          body="Pure browser tool — no installs, no admin rights. Runs on Citrix, VDI, and corporate browsers where Acrobat plugins are blocked."
        />
        <Feature
          title="Built for discovery production"
          body="Sequential numbering across files, custom prefixes, configurable padding. Defaults match Adobe Acrobat conventions."
        />
      </section>

      <section className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
        <h2 className="text-xl font-semibold">Common questions</h2>
        <div className="mt-4 space-y-4 text-sm text-neutral-200">
          <Q
            q="Are my PDFs uploaded anywhere?"
            a="No. Stamping happens entirely in your browser using WebAssembly. Open DevTools → Network and you'll see zero requests during processing."
          />
          <Q
            q="Will this work on a confidential matter?"
            a="Yes. Because nothing is uploaded, BatesStamp doesn't create the data-handling concerns that cloud-based tools do. See our privacy verification page for IT review materials."
          />
          <Q
            q="Can I batch-stamp many files?"
            a="Yes. Drop multiple PDFs, choose continuous or restart-per-file numbering, and download the whole set as a ZIP."
          />
        </div>
        <p className="mt-4 text-sm">
          <Link href="/faq/" className="text-emerald-400 hover:underline">
            Read the full FAQ →
          </Link>
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Read more</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          <ExploreLink
            href="/how-it-works/"
            title="How BatesStamp works"
            body="The architecture in plain English, plus how to verify the privacy promise yourself."
          />
          <ExploreLink
            href="/for-paralegals/"
            title="A guide for paralegals"
            body="Why this exists, what IT will accept, and what features matter for production."
          />
          <ExploreLink
            href="/alternatives/adobe-acrobat/"
            title="Free Adobe Acrobat alternative"
            body="Side-by-side comparison for Bates work alone — and when to keep Acrobat."
          />
          <ExploreLink
            href="/alternatives/bates-express/"
            title="Modern Bates Express alternative"
            body="Cross-platform, browser-based, and free — what changes and what doesn't."
          />
        </ul>
      </section>
    </div>
  );
}

function Dot() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />;
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
      <h3 className="text-base font-semibold text-neutral-100">{title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{body}</p>
    </div>
  );
}

function Q({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <p className="font-medium text-neutral-100">{q}</p>
      <p className="mt-1 text-neutral-300">{a}</p>
    </div>
  );
}

function ExploreLink({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 transition hover:border-emerald-500/50 hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
      >
        <h3 className="text-base font-semibold text-neutral-100">{title}</h3>
        <p className="mt-2 text-sm text-neutral-300">{body}</p>
        <span className="mt-3 inline-block text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
          Read article →
        </span>
      </Link>
    </li>
  );
}
