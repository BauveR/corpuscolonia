import { Helmet } from "react-helmet-async";

interface PageSEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  lang?: string;
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = "https://corpuscolonia.com";
const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_1200/v1768775626/corpus_colonia_desktop_t90sru.png";

export function PageSEO({
  title,
  description,
  canonicalPath,
  ogImage = DEFAULT_IMAGE,
  lang = "es",
  jsonLd,
}: PageSEOProps) {
  const canonical = `${BASE_URL}${canonicalPath}`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <link rel="alternate" hrefLang="es" href={canonical} />
      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
