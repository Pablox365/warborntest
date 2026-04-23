import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Home } from "lucide-react";

interface Crumb {
  name: string;
  path: string;
}

const SITE = "https://warborn.es";

const SeoBreadcrumbs = ({ items }: { items: Crumb[] }) => {
  const all = [{ name: "Inicio", path: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path}`,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-6">
        <ol className="flex items-center flex-wrap gap-1.5 text-xs text-muted-foreground font-heading tracking-wider">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3 h-3 opacity-50" />}
              {i === all.length - 1 ? (
                <span className="text-primary">{c.name.toUpperCase()}</span>
              ) : (
                <Link to={c.path} className="hover:text-foreground transition-colors flex items-center gap-1">
                  {i === 0 && <Home className="w-3 h-3" />}
                  {c.name.toUpperCase()}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default SeoBreadcrumbs;