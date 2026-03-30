import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteData } from '@/lib/siteData';
import { formatPhone } from '@/lib/phoneUtils';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { ReviewCard } from '@/components/shared/ReviewCard';
import { PortfolioGrid } from '@/components/shared/PortfolioGrid';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { ServiceAreaMap } from '@/components/shared/ServiceAreaMap';
import {
  ArrowRight,
  Phone,
  Star,
  MapPin,
  CheckFat,
  ArrowUpRight,
} from '@phosphor-icons/react/dist/ssr';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData();
  return {
    title: site.seo.defaultTitle,
    description: site.seo.description,
  };
}

export default async function HomePage() {
  const site = await getSiteData();
  const phone = formatPhone(site.phone);
  const previewServices = site.services.slice(0, 6);
  const previewPortfolio = site.portfolio.slice(0, 6);
  const hasPortfolio = site.portfolio.length > 0;

  // Schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    description: site.seo.description,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: 'US',
    },
    ...(site.rating ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: site.rating, reviewCount: site.reviewCount } } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        {/* Background texture */}
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="min-w-0 overflow-hidden">
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: 'rgba(232,103,58,0.15)',
                    color: 'var(--color-accent)',
                    border: '1px solid rgba(232,103,58,0.3)',
                  }}
                >
                  {site.city ? `${site.city}, ${site.state}` : 'Marine Services'}
                </span>
                {site.isVerified && (
                  <span
                    className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    Verified Pro
                  </span>
                )}
              </div>

              <h1
                className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-none text-white mb-6 hyphens-auto break-words"
                style={{ letterSpacing: '-0.02em' }}
              >
                {site.heroHeadline}
              </h1>

              <p
                className="text-lg leading-relaxed mb-8 max-w-xl"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {site.heroSubheadline}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={site.boatworkProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base py-3 px-8"
                >
                  Get a Free Estimate
                  <ArrowRight className="w-5 h-5" weight="bold" aria-hidden />
                </a>
                {phone && (
                  <a href={phone.href} className="btn-outline-light text-base py-3 px-8">
                    <Phone className="w-5 h-5" weight="bold" aria-hidden />
                    {phone.display}
                  </a>
                )}
              </div>

              {/* Social proof */}
              {site.rating && site.reviewCount > 0 && (
                <div className="flex items-center gap-3 mt-8">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4"
                        weight={i < Math.round(site.rating ?? 0) ? 'fill' : 'regular'}
                        style={{
                          color: i < Math.round(site.rating ?? 0) ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)',
                        }}
                        aria-hidden
                      />
                    ))}
                  </div>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {site.rating.toFixed(1)} · {site.reviewCount} reviews
                  </span>
                </div>
              )}
            </div>

            {/* Right: Stats panel */}
            <div className="hidden lg:block min-w-0">
              <div
                className="rounded-2xl p-8 grid grid-cols-2 gap-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div>
                  <div className="stat-number text-5xl mb-1">
                    {site.yearEstablished
                      ? `${new Date().getFullYear() - site.yearEstablished}+`
                      : '10+'}
                  </div>
                  <div className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Years of Experience
                  </div>
                </div>
                <div>
                  <div className="stat-number text-5xl mb-1">{site.services.length}+</div>
                  <div className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Services Offered
                  </div>
                </div>
                <div>
                  <div className="stat-number text-5xl mb-1">{site.serviceArea.length}+</div>
                  <div className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Areas Served
                  </div>
                </div>
                {site.reviewCount > 0 && (
                  <div>
                    <div className="stat-number text-5xl mb-1">{site.reviewCount}+</div>
                    <div className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      5-Star Reviews
                    </div>
                  </div>
                )}

                {/* CTA within panel */}
                <div className="col-span-2 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <Link
                    href={hasPortfolio ? '/portfolio' : '/contact'}
                    className="flex items-center justify-between text-sm"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    <span className="font-mono tracking-wide">
                      {hasPortfolio ? 'View Our Work' : 'Get in Touch'}
                    </span>
                    <ArrowRight className="w-4 h-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal clip */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-[var(--color-bg)]"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
          aria-hidden
        />
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <SectionWrapper variant="sand" id="services">
        <div className="mb-12">
          <span className="section-label">What We Do</span>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
            Marine Services
          </h2>
          <div className="accent-rule mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {previewServices.map((service) => (
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

        {site.services.length > 6 && (
          <div className="text-center">
            <Link href="/services" className="btn-outline">
              View All Services
              <ArrowRight className="w-4 h-4" weight="bold" aria-hidden />
            </Link>
          </div>
        )}
      </SectionWrapper>

      {/* ── REVIEWS ──────────────────────────────────────────────────────── */}
      {site.reviews.length > 0 && (
        <SectionWrapper variant="white" id="reviews">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="section-label">Client Reviews</span>
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
                What Our Clients Say
              </h2>
              <div className="accent-rule mt-4" />
            </div>
            {site.rating && (
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-light)' }}>
                <Star className="w-5 h-5" weight="fill" style={{ color: 'var(--color-accent)' }} aria-hidden />
                <strong className="font-heading text-2xl" style={{ color: 'var(--color-text)' }}>
                  {site.rating.toFixed(1)}
                </strong>
                <span>avg · {site.reviewCount} reviews</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {site.reviews.map((review, i) => (
              <ReviewCard
                key={review.id ?? i}
                author={review.author}
                rating={review.rating}
                text={review.text}
                date={review.date}
                isVerified={review.isVerified}
                response={review.response}
                responseDate={review.responseDate}
                variant={i === 0 ? 'featured' : 'default'}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={site.boatworkProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex"
            >
              See All Reviews on Boatwork
              <ArrowUpRight className="w-4 h-4" weight="bold" aria-hidden />
            </a>
          </div>
        </SectionWrapper>
      )}

      {/* ── PORTFOLIO PREVIEW ────────────────────────────────────────────── */}
      {hasPortfolio && (
        <SectionWrapper variant="sand" id="portfolio-preview">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="section-label">Our Work</span>
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
                Recent Projects
              </h2>
              <div className="accent-rule mt-4" />
            </div>
            <Link href="/portfolio" className="btn-outline flex-shrink-0">
              Full Portfolio
              <ArrowRight className="w-4 h-4" weight="bold" aria-hidden />
            </Link>
          </div>
          <PortfolioGrid items={previewPortfolio} businessName={site.name} />
        </SectionWrapper>
      )}

      {/* ── SERVICE AREA + HOURS ─────────────────────────────────────────── */}
      <SectionWrapper variant="white" id="area">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: area + hours */}
          <div>
            <span className="section-label">{site.serviceAreaTitle}</span>
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl mb-4" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
              Where We Operate
            </h2>
            <div className="accent-rule" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-light)' }}>
              {site.serviceAreaDescription}
            </p>

            {/* Area list */}
            <div className="flex flex-wrap gap-2 mb-10">
              {site.serviceArea.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-body"
                  style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
                >
                  <MapPin
                    className="w-3.5 h-3.5 flex-shrink-0"
                    weight="fill"
                    style={{ color: 'var(--color-accent)' }}
                    aria-hidden
                  />
                  {area}
                </div>
              ))}
            </div>

            {/* Hours */}
            <h3 className="font-heading font-bold text-lg mb-4" style={{ color: 'var(--color-text)' }}>
              Business Hours
            </h3>
            <div className="space-y-2">
              {Object.entries(site.hoursOfOperation).map(([day, hours]) => (
                <div key={day} className="flex items-center justify-between text-sm py-2 border-b" style={{ borderColor: 'var(--color-bg-dark)' }}>
                  <span className="font-mono" style={{ color: 'var(--color-text-light)' }}>{day}</span>
                  <span
                    className="font-body"
                    style={{
                      color: hours === 'Closed' ? 'var(--color-text-light)' : 'var(--color-text)',
                      fontWeight: hours === 'Closed' ? 400 : 500,
                    }}
                  >
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: map */}
          {site.address && (
            <div className="rounded-xl overflow-hidden h-96 lg:h-full min-h-80">
              <ServiceAreaMap
                address={site.address}
                name={site.name}
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8 text-center"
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        <div className="max-w-2xl mx-auto">
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Ready to Get Started?
          </span>
          <h2
            className="font-heading font-extrabold text-4xl sm:text-5xl text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            Let&apos;s Talk About Your Boat
          </h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Free estimates · Fast response · Work done right
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={site.boatworkProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white font-heading font-bold rounded-md text-base transition-all duration-200 hover:shadow-lg"
              style={{ color: 'var(--color-accent-dark)' }}
            >
              Request a Quote
              <ArrowRight className="w-5 h-5" weight="bold" aria-hidden />
            </a>
            {phone && (
              <a
                href={phone.href}
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-[var(--color-accent-dark)] font-heading font-bold rounded-md text-base transition-all duration-200"
              >
                <Phone className="w-5 h-5" weight="bold" aria-hidden />
                {phone.display}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Common projects checklist — quick reassurance block */}
      {site.commonProjects.length > 0 && (
        <SectionWrapper variant="sand">
          <div className="text-center mb-8">
            <span className="section-label">Common Projects</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
              We Handle It All
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {site.commonProjects.map((project) => (
              <div
                key={project}
                className="flex items-start gap-2 p-3 rounded-lg bg-white text-sm font-body"
                style={{ color: 'var(--color-text)' }}
              >
                <CheckFat
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  weight="fill"
                  style={{ color: 'var(--color-accent)' }}
                  aria-hidden
                />
                {project}
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
