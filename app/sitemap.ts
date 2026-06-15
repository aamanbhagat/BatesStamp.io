import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://www.batesstamp.pro";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-30");
  const routes = [
    "/",
    "/how-it-works/",
    "/for-paralegals/",
    "/faq/",
    "/privacy-verified/",
    "/alternatives/adobe-acrobat/",
    "/alternatives/bates-express/",
    "/articles/",
    "/articles/definitive-guide-to-bates-numbering/",
    "/articles/best-practices-confidential-documents/",
    "/articles/paralegal-discovery-workflows/",
    "/articles/acrobat-vs-batesstamp/",
    "/articles/history-of-bates-stamp/",
  ];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1.0 : 0.7,
  }));
}
