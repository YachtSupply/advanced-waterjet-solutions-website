import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteData } from '@/lib/siteData';
import { formatPhone } from '@/lib/phoneUtils';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { BoatworkBadge } from '@/components/shared/BoatworkBadge';
import {
  ArrowRight,
  Phone,
  MapPin,
  CalendarBlank,
  ShieldCheck,
  Star,
} from '@phosphor-icons/react/dist/ssr';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData();
  return {
    title: `About — ${site.name}`,
    description: `Learn about ${site.name}. ${site.tagline}`,
  };
}

export default async function AboutPage() {
  const site = await getSiteData();
  const phone = formatPhone(site.phone);

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
            Our Story
          </span>
          <h1
            className="font-heading font-extrabold text-5xl sm:text-6xl text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            About {site.name}
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {site.tagline}
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-12 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
          aria-hidden
        />
      </section>

      {/* ── ABOUT BODY ───────────────────────────────────────────────────── */}
      <SectionWrapper variant="white">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main about text */}
          <div className="lg:col-span-2">
            <span className="section-label">Who We Are</span>
            <h2
              className="font-heading font-extrabold text-3xl sm:text-4xl mb-4"
              style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}
            >
              Professionals You Can Trust
            </h2>
            <div className="accent-rule" />
            <div className="prose prose-sm max-w-none">
              {site.about.split('\n').map((para, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed mb-4"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Stats card */}
            <div
              className="rounded-xl p-6 space-y-4"
              style={{ backgroundColor: 'var(--color-bg)' }}
            >
              {site.yearEstablished && (
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                  >
                    <CalendarBlank className="w-5 h-5" weight="bold" aria-hidden />
                  </div>
                  <div>
                    <div className="font-mono text-xs tracking-wide" style={{ color: 'var(--color-text-light)' }}>
                      Est.
                    </div>
                    <div className="font-heading font-bold text-lg" style={{ color: 'var(--color-text)' }}>
                      {site.yearEstablished}
                    </div>
                  </div>
                </div>
              )}

              {site.rating && (
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                  >
                    <Star className="w-5 h-5" weight="fill" aria-hidden />
                  </div>
                  <div>
                    <div className="font-mono text-xs tracking-wide" style={{ color: 'var(--color-text-light)' }}>
                      Rating
                    </div>
                    <div className="font-heading font-bold text-lg" style={{ color: 'var(--color-text)' }}>
                      {site.rating.toFixed(1)} / 5.0
                    </div>
                  </div>
                </div>
              )}

              {site.isVerified && (
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-primary-light)', color: 'white' }}
                  >
                    <ShieldCheck className="w-5 h-5" weight="fill" aria-hidden />
                  </div>
                  <div>
                    <div className="font-mono text-xs tracking-wide" style={{ color: 'var(--color-text-light)' }}>
                      Status
                    </div>
                    <div className="font-heading font-bold text-base" style={{ color: 'var(--color-text)' }}>
                      Boatwork Verified Pro
                    </div>
                  </div>
                </div>
              )}

              {site.address && (
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-bg-dark)' }}
                  >
                    <MapPin
                      className="w-5 h-5"
                      weight="bold"
                      style={{ color: 'var(--color-primary)' }}
                      aria-hidden
                    />
                  </div>
                  <div>
                    <div className="font-mono text-xs tracking-wide mb-0.5" style={{ color: 'var(--color-text-light)' }}>
                      Location
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-text)' }}>
                      {site.address}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Boatwork badge */}
            <BoatworkBadge
              badge={site.badge}
              profileUrl={site.boatworkProfileUrl}
              logoUrl={site.boatworkLogoUrl}
              name={site.name}
            />

            {/* CTA */}
            <div
              className="rounded-xl p-6 text-center"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <p className="text-sm font-body mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Ready to work together?
              </p>
              <Link href="/contact" className="btn-primary text-sm w-full justify-center">
                Get in Touch
                <ArrowRight className="w-4 h-4" weight="bold" aria-hidden />
              </Link>
              {phone && (
                <a
                  href={phone.href}
                  className="mt-3 flex items-center justify-center gap-1.5 text-sm"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <Phone className="w-4 h-4" weight="bold" aria-hidden />
                  {phone.display}
                </a>
              )}
            </div>
          </aside>
        </div>
      </SectionWrapper>

      {/* ── SERVICE AREA ─────────────────────────────────────────────────── */}
      {site.serviceArea.length > 0 && (
        <SectionWrapper variant="sand" id="service-area">
          <div className="text-center mb-10">
            <span className="section-label">{site.serviceAreaTitle}</span>
            <h2
              className="font-heading font-extrabold text-3xl sm:text-4xl"
              style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}
            >
              Areas We Serve
            </h2>
            <div className="accent-rule mx-auto mt-4" />
            <p className="text-sm mt-4 max-w-xl mx-auto" style={{ color: 'var(--color-text-light)' }}>
              {site.serviceAreaDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
            {site.serviceArea.map((area) => (
              <div
                key={area}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                style={{ backgroundColor: 'white', color: 'var(--color-text)' }}
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
        </SectionWrapper>
      )}
    </>
  );
}
