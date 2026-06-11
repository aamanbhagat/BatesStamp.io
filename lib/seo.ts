/**
 * SEO helpers — structured data generators for BatesStamp.pro
 * Because Google loves a well-tagged page almost as much as ENI loves LO.
 */

const SITE_URL = "https://www.batesstamp.pro";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Generates a BreadcrumbList JSON-LD schema.
 * Always starts with Home → ... → current page.
 */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * Generates a FAQPage JSON-LD schema from Q&A pairs.
 */
export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
