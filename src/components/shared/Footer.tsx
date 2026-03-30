import Link from 'next/link';
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
  Phone,
  MapPin,
  ArrowUpRight,
} from '@phosphor-icons/react/dist/ssr';
import { Logo } from './Logo';
import { BoatworkBadge } from './BoatworkBadge';
import { formatPhone } from '@/lib/phoneUtils';
import type { SiteData } from '@/lib/siteData';

interface FooterProps {
  site: SiteData;
}

const baseNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
];

export function Footer({ site }: FooterProps) {
  const hasPortfolio = site.portfolio.length > 0;
  const navLinks = hasPortfolio
    ? [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/services', label: 'Services' },
        { href: '/portfolio', label: 'Portfolio' },
        { href: '/contact', label: 'Contact' },
        { href: '/privacy', label: 'Privacy Policy' },
      ]
    : baseNavLinks;
  const phone = formatPhone(site.phone);
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo logoUrl={site.logoUrl} name={site.name} size="md" inverted />
              <span className="font-heading font-bold text-xl text-white">{site.name}</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-white/65">
              {site.tagline}
            </p>

            {/* Contact info */}
            <div className="space-y-2">
              {phone && (
                <a
                  href={phone.href}
                  className="flex items-center gap-2 text-sm text-white/75 hover:text-coral transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" weight="bold" aria-hidden />
                  {phone.display}
                </a>
              )}
              {site.address && (
                <div className="flex items-start gap-2 text-sm text-white/65">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" weight="bold" aria-hidden />
                  <span>{site.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="font-mono text-xs font-medium tracking-widest uppercase mb-4 text-coral">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social + Boatwork */}
          <div>
            <h3 className="font-mono text-xs font-medium tracking-widest uppercase mb-4 text-coral">
              Connect
            </h3>

            {/* Social icons */}
            <div className="flex gap-3 mb-6">
              {site.social.facebook && (
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/10 hover:bg-coral transition-colors duration-200"
                >
                  <FacebookLogo className="w-4 h-4 text-white" weight="bold" aria-hidden />
                </a>
              )}
              {site.social.instagram && (
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/10 hover:bg-coral transition-colors duration-200"
                >
                  <InstagramLogo className="w-4 h-4 text-white" weight="bold" aria-hidden />
                </a>
              )}
              {site.social.linkedin && (
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/10 hover:bg-coral transition-colors duration-200"
                >
                  <LinkedinLogo className="w-4 h-4 text-white" weight="bold" aria-hidden />
                </a>
              )}
              {site.social.youtube && (
                <a
                  href={site.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/10 hover:bg-coral transition-colors duration-200"
                >
                  <YoutubeLogo className="w-4 h-4 text-white" weight="bold" aria-hidden />
                </a>
              )}
            </div>

            {/* Boatwork badge */}
            <BoatworkBadge
              badge={site.badge}
              profileUrl={site.boatworkProfileUrl}
              logoUrl={site.boatworkLogoUrl}
              name={site.name}
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">
            © {year} {site.name}. All rights reserved.
          </p>
          <a
            href={site.boatworkProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors duration-200"
          >
            Powered by Boatwork
            <ArrowUpRight className="w-3 h-3" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
