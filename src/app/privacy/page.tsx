import type { Metadata } from 'next';
import { getSiteData } from '@/lib/siteData';
import { SectionWrapper } from '@/components/shared/SectionWrapper';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData();
  return {
    title: `Privacy Policy — ${site.name}`,
    description: `Privacy policy for ${site.name}.`,
    robots: { index: false },
  };
}

export default async function PrivacyPage() {
  const site = await getSiteData();
  const year = new Date().getFullYear();

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
          <h1
            className="font-heading font-extrabold text-5xl sm:text-6xl text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            Privacy Policy
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Last updated: {year}
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-12 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
          aria-hidden
        />
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto prose prose-sm">
          {[
            {
              title: 'Information We Collect',
              body: `We collect information you provide directly to us, such as when you fill out our contact form (name, email, phone number, and message). We may also collect information automatically when you visit our website, including your IP address, browser type, and pages visited.`,
            },
            {
              title: 'How We Use Your Information',
              body: `We use the information we collect to respond to your inquiries, provide our services, send you updates or promotional materials (with your consent), and improve our website and services.`,
            },
            {
              title: 'Information Sharing',
              body: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.`,
            },
            {
              title: 'Data Security',
              body: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.`,
            },
            {
              title: 'Cookies',
              body: `We may use cookies and similar tracking technologies to enhance your experience on our website. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.`,
            },
            {
              title: 'Third-Party Links',
              body: `Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.`,
            },
            {
              title: 'Your Rights',
              body: `You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us using the information below.`,
            },
            {
              title: 'Contact Us',
              body: `If you have questions about this Privacy Policy, please contact us at:\n\n${site.name}\n${site.address || ''}\n${site.email || ''}\n${site.phone || ''}`,
            },
          ].map(({ title, body }) => (
            <div key={title} className="mb-8">
              <h2
                className="font-heading font-bold text-xl mb-3"
                style={{ color: 'var(--color-text)' }}
              >
                {title}
              </h2>
              <div className="accent-rule" />
              <p
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{ color: 'var(--color-text-light)' }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
