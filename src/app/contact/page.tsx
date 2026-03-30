import type { Metadata } from 'next';
import { getSiteData } from '@/lib/siteData';
import { formatPhone } from '@/lib/phoneUtils';
import { ContactForm } from '@/components/shared/ContactForm';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { ServiceAreaMap } from '@/components/shared/ServiceAreaMap';
import { BoatworkBadge } from '@/components/shared/BoatworkBadge';
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  Clock,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
} from '@phosphor-icons/react/dist/ssr';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData();
  return {
    title: `Contact — ${site.name}`,
    description: `Contact ${site.name}. ${site.phone ? `Call us at ${site.phone}. ` : ''}${site.address || ''}`,
  };
}

export default async function ContactPage() {
  const site = await getSiteData();
  const phone = formatPhone(site.phone);

  const hasSocial =
    site.social.facebook ||
    site.social.instagram ||
    site.social.linkedin ||
    site.social.youtube;

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
            Get in Touch
          </span>
          <h1
            className="font-heading font-extrabold text-5xl sm:text-6xl text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            Contact Us
          </h1>
          <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Free estimates · Fast response · Work done right. Reach out any time.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-12 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
          aria-hidden
        />
      </section>

      {/* ── FORM + DETAILS ───────────────────────────────────────────────── */}
      <SectionWrapper variant="white">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form — larger column */}
          <div className="lg:col-span-3">
            <span className="section-label">Send a Message</span>
            <h2
              className="font-heading font-extrabold text-3xl sm:text-4xl mb-2"
              style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}
            >
              Let&apos;s Talk
            </h2>
            <div className="accent-rule mb-8" />
            <ContactForm />
          </div>

          {/* Contact details */}
          <aside className="lg:col-span-2 space-y-6">
            <div
              className="rounded-xl p-6 space-y-5"
              style={{ backgroundColor: 'var(--color-bg)' }}
            >
              <h3
                className="font-heading font-bold text-lg"
                style={{ color: 'var(--color-text)' }}
              >
                Contact Details
              </h3>

              {phone && (
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                  >
                    <Phone className="w-4 h-4" weight="bold" aria-hidden />
                  </div>
                  <div>
                    <div
                      className="font-mono text-xs tracking-wide mb-0.5"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      Phone
                    </div>
                    <a
                      href={phone.href}
                      className="text-sm font-semibold transition-colors duration-200"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {phone.display}
                    </a>
                  </div>
                </div>
              )}

              {site.email && (
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                  >
                    <EnvelopeSimple className="w-4 h-4" weight="bold" aria-hidden />
                  </div>
                  <div>
                    <div
                      className="font-mono text-xs tracking-wide mb-0.5"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      Email
                    </div>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-sm font-semibold break-all transition-colors duration-200"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
              )}

              {site.address && (
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-bg-dark)' }}
                  >
                    <MapPin
                      className="w-4 h-4"
                      weight="bold"
                      style={{ color: 'var(--color-primary)' }}
                      aria-hidden
                    />
                  </div>
                  <div>
                    <div
                      className="font-mono text-xs tracking-wide mb-0.5"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      Location
                    </div>
                    <span className="text-sm" style={{ color: 'var(--color-text)' }}>
                      {site.address}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Hours */}
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: 'var(--color-bg)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4" style={{ color: 'var(--color-accent)' }} weight="bold" aria-hidden />
                <h3
                  className="font-heading font-bold text-base"
                  style={{ color: 'var(--color-text)' }}
                >
                  Business Hours
                </h3>
              </div>
              <div className="space-y-1.5">
                {Object.entries(site.hoursOfOperation).map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex items-center justify-between text-xs py-1.5 border-b last:border-0"
                    style={{ borderColor: 'var(--color-bg-dark)' }}
                  >
                    <span className="font-mono" style={{ color: 'var(--color-text-light)' }}>
                      {day}
                    </span>
                    <span
                      style={{
                        color:
                          hours === 'Closed' ? 'var(--color-text-light)' : 'var(--color-text)',
                        fontWeight: hours === 'Closed' ? 400 : 500,
                      }}
                    >
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            {hasSocial && (
              <div className="flex gap-2">
                {site.social.facebook && (
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                    style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-primary)' }}
                  >
                    <FacebookLogo className="w-5 h-5" weight="bold" aria-hidden />
                  </a>
                )}
                {site.social.instagram && (
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                    style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-primary)' }}
                  >
                    <InstagramLogo className="w-5 h-5" weight="bold" aria-hidden />
                  </a>
                )}
                {site.social.linkedin && (
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                    style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-primary)' }}
                  >
                    <LinkedinLogo className="w-5 h-5" weight="bold" aria-hidden />
                  </a>
                )}
                {site.social.youtube && (
                  <a
                    href={site.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                    style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-primary)' }}
                  >
                    <YoutubeLogo className="w-5 h-5" weight="bold" aria-hidden />
                  </a>
                )}
              </div>
            )}

            {/* Boatwork badge */}
            <BoatworkBadge
              badge={site.badge}
              profileUrl={site.boatworkProfileUrl}
              logoUrl={site.boatworkLogoUrl}
              name={site.name}
            />
          </aside>
        </div>
      </SectionWrapper>

      {/* ── MAP ──────────────────────────────────────────────────────────── */}
      {site.address && (
        <section className="h-80">
          <ServiceAreaMap
            address={site.address}
            name={site.name}
            className="w-full h-full"
          />
        </section>
      )}
    </>
  );
}
