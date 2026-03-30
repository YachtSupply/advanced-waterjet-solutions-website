import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSiteData } from '@/lib/siteData';
import { PortfolioGrid } from '@/components/shared/PortfolioGrid';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData();
  return {
    title: `Portfolio — ${site.name}`,
    description: `Browse project photos and videos from ${site.name}.`,
  };
}

export default async function PortfolioPage() {
  const site = await getSiteData();

  if (site.portfolio.length === 0) {
    redirect('/');
  }

  return (
    <>
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
            Project Gallery
          </span>
          <h1
            className="font-heading font-extrabold text-5xl sm:text-6xl text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            Our Work
          </h1>
          <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Real projects, real results. Browse our portfolio of completed marine work.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-12 bg-[var(--color-bg)]"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
          aria-hidden
        />
      </section>

      {/* ── GRID ─────────────────────────────────────────────────────────── */}
      <SectionWrapper variant="sand">
        <PortfolioGrid items={site.portfolio} businessName={site.name} />
      </SectionWrapper>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <SectionWrapper variant="white">
        <div className="text-center max-w-xl mx-auto">
          <span className="section-label">Get Started</span>
          <h2
            className="font-heading font-extrabold text-3xl sm:text-4xl mb-4"
            style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}
          >
            Ready for Your Project?
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-light)' }}>
            Let&apos;s talk about your vessel and what you&apos;d like to achieve.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={site.boatworkProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" weight="bold" aria-hidden />
            </a>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
