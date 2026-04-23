import { Helmet } from "react-helmet-async";

interface FAQ {
  q: string;
  a: string;
}

interface SeoContentProps {
  h1: string;
  intro: string;
  sections?: { h2: string; body: string }[];
  faqs?: FAQ[];
}

const SeoContent = ({ h1, intro, sections = [], faqs = [] }: SeoContentProps) => {
  const faqLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <section className="relative py-12 md:py-16 border-t border-border/30">
      {faqLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>
      )}
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4">{h1}</h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">{intro}</p>

        {sections.map((s) => (
          <article key={s.h2} className="mb-8">
            <h2 className="text-xl md:text-2xl font-heading font-semibold mb-3 text-foreground">{s.h2}</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{s.body}</p>
          </article>
        ))}

        {faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl md:text-2xl font-heading font-semibold mb-6">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.q} className="group border border-border/50 rounded-lg p-4 bg-card/30">
                  <summary className="cursor-pointer font-heading font-semibold text-sm md:text-base text-foreground list-none flex justify-between items-center">
                    {f.q}
                    <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SeoContent;