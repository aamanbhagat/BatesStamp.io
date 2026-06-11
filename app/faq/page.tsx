import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "BatesStamp FAQ — Free Bates Numbering Questions Answered",
  description:
    "Frequently asked questions about BatesStamp: privacy, file size limits, batch processing, multi-file numbering, and IT review.",
  alternates: { canonical: "/faq/" },
};

const FAQ_SECTIONS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "On Privacy & Trust",
    items: [
      {
        q: "Are my PDFs uploaded anywhere?",
        a: "No. All processing happens locally in your browser using WebAssembly. Open DevTools → Network and you will see zero outbound requests during stamping. You can also disconnect from the internet entirely — the tool keeps working.",
      },
      {
        q: "Can I use it on a confidential matter?",
        a: "Yes. Because there is no upload, BatesStamp doesn't create the data-handling concerns that cloud tools introduce. Many users on locked-down corporate networks run it where Acrobat or paid desktop tools are blocked.",
      },
      {
        q: "Can my IT department review this before approval?",
        a: "Yes. The privacy-verified page contains a printable one-pager explaining the architecture, the third-party libraries used, and how to verify no data leaves the browser.",
      },
    ],
  },
  {
    title: "On Cost & Access",
    items: [
      {
        q: "Is BatesStamp really free?",
        a: "Yes. No subscription, no trial, no credit card. The site is static and runs in your browser, so the cost to host it is negligible.",
      },
      {
        q: "Does it work on Citrix or VDI?",
        a: "Yes — that's a primary design goal. A pure browser tool with no installs and no plugins.",
      },
      {
        q: "Does it work offline?",
        a: "Yes. After the first load, a service worker caches the application. You can refresh, close the tab, disconnect from Wi-Fi, and the tool will still work.",
      },
    ],
  },
  {
    title: "On the Mechanics of Stamping",
    items: [
      {
        q: "How large of a PDF can it handle?",
        a: "It depends on your computer's memory. PDFs up to a few hundred pages stamp in seconds. Multi-thousand-page documents may slow your browser; if you encounter a memory wall, split the document first.",
      },
      {
        q: "Can I batch-stamp many files at once?",
        a: "Yes. Drop multiple PDFs and the tool processes them sequentially with continuous Bates numbering across the whole set. The result is a ZIP of all stamped files.",
      },
      {
        q: "Does it handle continuous numbering across files?",
        a: "Yes. Drop the files in the order you want them numbered. By default, numbering continues from one file to the next. You may switch to 'restart per file' if each file should start at the same number.",
      },
      {
        q: "What is the standard Bates format?",
        a: "Most law firms use a prefix (matter name or party identifier) followed by a zero-padded number — e.g., SMITH 0000001. BatesStamp defaults to 6-digit padding without a prefix; both are configurable.",
      },
      {
        q: "Where does the stamp appear?",
        a: "Bottom-right by default — the most common convention. You may choose any of the four corners or the top/bottom center. Stamps sit at a 0.5-inch margin to match Adobe Acrobat defaults.",
      },
      {
        q: "Will the stamps be visible on every PDF reader?",
        a: "Yes. The stamps are drawn into the PDF as standard text content, not as annotations. They render in Adobe Reader, PDF.js, Preview, court e-filing portals, and any other PDF reader.",
      },
      {
        q: "Can I undo a stamp?",
        a: "Not from a stamped PDF — once the text is drawn, it is part of the PDF content. Always keep your originals; stamping always produces a new file with '-bates' suffixed to the name.",
      },
    ],
  },
];

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_SECTIONS.flatMap((s) =>
      s.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    ),
  };

  return (
    <div className="editorial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "FAQ", path: "/faq/" },
            ])
          ),
        }}
      />
      <article className="ed-content mx-auto max-w-2xl px-6 py-16 sm:py-24 md:max-w-3xl">
        <div className="ed-rise ed-rise-1">
          <span className="ed-kicker">Volume I · Reference</span>
          <h1 className="ed-display mt-6 text-5xl sm:text-7xl">
            Questions, <em>Answered</em>
          </h1>
        </div>

        <div className="ed-meta ed-rise ed-rise-2">
          <div>
            <strong>Catalogued</strong> · {FAQ_SECTIONS.reduce((n, s) => n + s.items.length, 0)} entries
          </div>
          <div>
            <strong>Sections</strong> · {FAQ_SECTIONS.length}
          </div>
          <div>
            <strong>Last revised</strong> · <time dateTime="2026-05">2026.05</time>
          </div>
        </div>

        <p className="ed-lead ed-rise ed-rise-3">
          Everything you might reasonably wonder before placing a Bates stamp on
          a privileged document — privacy, mechanics, edge cases, and the
          things this tool does not pretend to do.
        </p>

        {FAQ_SECTIONS.map((section, idx) => (
          <section
            key={section.title}
            className="ed-section"
            data-num={`§ 0${idx + 1}`}
          >
            <h2 className="ed-h2">{section.title}</h2>
            <div className="mt-8 space-y-6">
              {section.items.map((item, j) => (
                <FaqEntry
                  key={item.q}
                  num={`${String(idx + 1).padStart(2, "0")}.${String(j + 1).padStart(2, "0")}`}
                  q={item.q}
                  a={item.a}
                />
              ))}
            </div>
          </section>
        ))}

        <div className="ed-fleuron">
          <span>❦</span>
        </div>

        <p className="ed-colophon">
          Have a question that isn&apos;t here?{" "}
          The source is open and the architecture is small enough to read in an
          afternoon.
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

function FaqEntry({ num, q, a }: { num: string; q: string; a: string }) {
  return (
    <div className="grid grid-cols-[3.2rem_1fr] gap-2 sm:grid-cols-[4rem_1fr]">
      <div className="pt-1 font-mono text-[0.65rem] tracking-[0.2em] text-[var(--ink-faint)]">
        {num}
      </div>
      <div>
        <h3 className="ed-h3 leading-snug">{q}</h3>
        <p className="ed-prose mt-2 text-[1rem]">{a}</p>
      </div>
    </div>
  );
}
