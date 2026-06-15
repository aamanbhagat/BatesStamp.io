import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Legal Tech Articles, Reference Guides & Adjudications",
  description:
    "Explore professional legal tech articles, comparative reviews, and best practices for Bates numbering and litigation support.",
  alternates: { canonical: "/articles/" },
};

const ARTICLES = [
  {
    slug: "definitive-guide-to-bates-numbering",
    title: "The Definitive Guide to Bates Numbering in Litigation Support",
    kicker: "Volume III · Article 01",
    summary:
      "A complete primer on the rules, formats, and digital standards of Bates stamping for modern discovery productions.",
    readTime: "6 min",
    subject: "Lit Support Standard",
  },
  {
    slug: "best-practices-confidential-documents",
    title: "Best Practices for Bates Numbering Confidential Legal Documents",
    kicker: "Volume III · Article 02",
    summary:
      "Why uploading client PDFs to third-party servers presents severe ethics risks under ABA Model Rule 1.6, and how client-side processing prevents data leaks.",
    readTime: "5 min",
    subject: "ABA Model Rule 1.6",
  },
  {
    slug: "paralegal-discovery-workflows",
    title: "How Paralegals Can Streamline Discovery with Bates Stamping Workflows",
    kicker: "Volume III · Article 03",
    summary:
      "Practical tips for sorting files, establishing naming conventions, choosing prefix ranges, and avoiding sequence duplicates.",
    readTime: "6 min",
    subject: "Practitioner Guide",
  },
  {
    slug: "acrobat-vs-batesstamp",
    title: "Bates Stamping in Acrobat vs. BatesStamp: Cost, Speed, and Compliance",
    kicker: "Volume III · Article 04",
    summary:
      "An in-depth evaluation of Adobe Acrobat Pro versus in-browser BatesStamp for legal teams under Citrix or strict IT permissions.",
    readTime: "5 min",
    subject: "Tool Analysis",
  },
  {
    slug: "history-of-bates-stamp",
    title: "A History of the Bates Stamp: From Mechanical Inventions to Digital e-Discovery",
    kicker: "Volume III · Article 05",
    summary:
      "How Edwin G. Bates' 1891 patent for the Automatic Numbering Machine set the standards for 130 years of legal document organization.",
    readTime: "5 min",
    subject: "Legal History",
  },
];

export default function ArticlesIndex() {
  return (
    <div className="editorial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Articles", path: "/articles/" },
            ])
          ),
        }}
      />
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24 md:max-w-3xl">
        <div className="ed-rise ed-rise-1">
          <span className="ed-kicker">Volume III · Publications</span>
          <h1 className="ed-display mt-6 text-5xl sm:text-7xl">
            Legal Tech <em>Articles</em> &amp; Reference Guides
          </h1>
        </div>

        <div className="ed-meta ed-rise ed-rise-2">
          <div>
            <strong>Catalog</strong> · 5 Reference Works
          </div>
          <div>
            <strong>Subject</strong> · Document Stamping &amp; E-Discovery
          </div>
        </div>

        <div className="space-y-12 mt-12 ed-rise ed-rise-3">
          {ARTICLES.map((art) => (
            <article
              key={art.slug}
              className="group border-b border-neutral-300 pb-10 last:border-b-0"
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-neutral-500 uppercase">
                  {art.kicker}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mt-1 text-neutral-900 group-hover:text-emerald-700 transition-colors">
                  <Link href={`/articles/${art.slug}/`}>{art.title}</Link>
                </h2>
                <p className="font-serif text-neutral-600 italic leading-relaxed text-sm sm:text-base mt-2">
                  {art.summary}
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 mt-4">
                  <span>
                    <strong>Filed:</strong> {art.subject}
                  </span>
                  <span>·</span>
                  <span>
                    <strong>Reading:</strong> {art.readTime}
                  </span>
                  <span>·</span>
                  <Link
                    href={`/articles/${art.slug}/`}
                    className="text-emerald-600 hover:text-emerald-800 font-semibold underline underline-offset-4"
                  >
                    Read article →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="ed-fleuron">
          <span>❦</span>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="ed-back">
            ← Return to BatesStamp tool
          </Link>
        </div>
      </div>
    </div>
  );
}
