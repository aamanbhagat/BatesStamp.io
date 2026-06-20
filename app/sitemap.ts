import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

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
    "/blog/",
  ];

  const staticEntries = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1.0 : 0.7,
  }));

  const blogEntries = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}/`,
    lastModified: new Date(p.frontmatter.updatedAt || p.frontmatter.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
