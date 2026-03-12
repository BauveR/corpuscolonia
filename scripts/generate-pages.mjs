/**
 * Post-build script: generates static HTML files for each route.
 * Replaces per-page meta tags in dist/index.html to create
 * route-specific snapshots that search engines and social bots can read
 * without executing JavaScript.
 */

import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "../dist");

const baseHtml = readFileSync(join(distDir, "index.html"), "utf-8");

const pages = [
  {
    route: "collaborators",
    title: "Colaboradores — CORPUSCOLONIA",
    description:
      "Una red de investigadores en tres continentes que estudian las huellas biopolíticas del colonialismo atlántico en los restos humanos.",
    canonical: "https://corpuscolonia.com/collaborators",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Colaboradores — CORPUSCOLONIA",
      description:
        "Equipo investigador de CORPUSCOLONIA: red de investigadores que estudian el colonialismo atlántico y su impacto biopolítico en los restos humanos.",
      url: "https://corpuscolonia.com/collaborators",
      isPartOf: {
        "@type": "ResearchProject",
        name: "CORPUSCOLONIA",
        url: "https://corpuscolonia.com/",
      },
    },
  },
];

for (const page of pages) {
  let html = baseHtml;

  // Title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`);

  // Meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${page.description}"`
  );

  // Canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${page.canonical}"`
  );

  // OG tags
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${page.canonical}"`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${page.title}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${page.description}"`
  );

  // Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${page.title}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${page.description}"`
  );

  // hreflang
  html = html.replace(
    /<link rel="alternate" hreflang="es" href="[^"]*"/g,
    `<link rel="alternate" hreflang="es" href="${page.canonical}"`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="en" href="[^"]*"/g,
    `<link rel="alternate" hreflang="en" href="${page.canonical}"`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*"/g,
    `<link rel="alternate" hreflang="x-default" href="${page.canonical}"`
  );

  // JSON-LD
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n    ${JSON.stringify(page.jsonLd, null, 2)}\n    </script>`
  );

  const outDir = join(distDir, page.route);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf-8");
  console.log(`✓ Generated dist/${page.route}/index.html`);
}

console.log("Static page generation complete.");
