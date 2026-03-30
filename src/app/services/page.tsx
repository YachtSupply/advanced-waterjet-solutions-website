import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteData } from '@/lib/siteData';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { ArrowRight, CheckFat, Plus } from '@phosphor-icons/react/dist/ssr';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData();
  return {
    title: `Services — ${site.name}`,
    description: `Marine services offered by ${site.name}: ${site.services.map((s) => s.name).join(', ')}.`,
  };
}

export default async function ServicesPage() {
  const site = await getSiteData();

  // Gather FAQs from specialties
  const faqs = site.specialties.flatMap((s) => s.faqs ?? []).slice(0, 8);

  // FAQ JSON-LD
  const jsonLd = faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section
        className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto">
          <span className="section-label" style={{ color: 'var(--color-accent)' }}>
            Full Service List
          </span>
          <h1
            className="font-heading font-extrabold text-5xl sm:text-6xl text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            Marine Services
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Professional marine services from certified technicians. Ask us about anything not listed.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-12 bg-[var(--color-bg)]"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
          aria-hidden
        />
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────────────────── */}
      <SectionWrapper variant="sand">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {site.services.map((service) => (
            <ServiceCard
              key={service.name}
              name={service.name}
              description={service.description}
              icon={service.icon}
              keywords={service.keywords}
              benefits={service.benefits}
              priceRange={service.priceRange}
              typicalDuration={service.typicalDuration}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <div>
            <p className="font-heading font-bold text-xl text-white mb-1">
              Need something not listed?
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
              We handle a wide range of specialty projects. Just ask.
            </p>
          </div>
          <a
            href={site.boatworkProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-shrink-0"
          >
            Get a Free Estimate
            <ArrowRight className="w-4 h-4" weight="bold" aria-hidden />
          </a>
        </div>
      </SectionWrapper>

      {/* ── COMMON PROJECTS ──────────────────────────────────────────────── */}
      {site.commonProjects.length > 0 && (
        <SectionWrapper variant="white">
          <div className="mb-10">
            <span className="section-label">Common Projects</span>
            <h2
              className="font-heading font-extrabold text-3xl sm:text-4xl"
              style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}
            >
              Frequently Requested
            </h2>
            <div className="accent-rule mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {site.commonProjects.map((project) => (
              <div
                key={project}
                className="flex items-start gap-3 p-4 rounded-lg border"
                style={{ borderColor: 'var(--color-bg-dark)', backgroundColor: 'var(--color-bg)' }}
              >
                <CheckFat
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  weight="fill"
                  style={{ color: 'var(--color-accent)' }}
                  aria-hidden
                />
                <span className="text-sm font-body" style={{ color: 'var(--color-text)' }}>
                  {project}
                </span>
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <SectionWrapper variant="sand">
          <div className="max-w-3xl mx-auto">
            <div className="mb-10 text-center">
              <span className="section-label">FAQ</span>
              <h2
                className="font-heading font-extrabold text-3xl sm:text-4xl"
                style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}
              >
                Common Questions
              </h2>
              <div className="accent-rule mx-auto mt-4" />
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border bg-white overflow-hidden"
                  style={{ borderColor: 'var(--color-bg-dark)' }}
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer select-none list-none">
                    <span
                      className="font-heading font-semibold text-base"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {faq.question}
                    </span>
                    <Plus
                      className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-open:rotate-45"
                      weight="bold"
                      style={{ color: 'var(--color-accent)' }}
                      aria-hidden
                    />
                  </summary>
                  <div className="px-5 pb-5 border-t" style={{ borderColor: 'var(--color-bg-dark)' }}>
                    <p className="text-sm leading-relaxed pt-4" style={{ color: 'var(--color-text-light)' }}>
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
