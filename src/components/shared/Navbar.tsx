'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { List, X, Phone, ArrowRight } from '@phosphor-icons/react';
import { Logo } from './Logo';
import { formatPhone } from '@/lib/phoneUtils';
import clsx from 'clsx';

interface NavbarProps {
  logoUrl: string | null;
  name: string;
  hasPortfolio: boolean;
  phone: string | null;
  boatworkProfileUrl: string;
}

const navLinks = (hasPortfolio: boolean) => [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  ...(hasPortfolio ? [{ href: '/portfolio', label: 'Portfolio' }] : []),
  { href: '/contact', label: 'Contact' },
];

export function Navbar({ logoUrl, name, hasPortfolio, phone, boatworkProfileUrl }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const formattedPhone = formatPhone(phone);
  const links = navLinks(hasPortfolio);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'navbar-scrolled backdrop-blur-md bg-white/95' : 'bg-white',
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0" aria-label={`${name} home`}>
          <Logo logoUrl={logoUrl} name={name} size="md" />
          <span
            className="font-heading font-bold text-lg leading-tight hidden sm:block"
            style={{ color: 'var(--color-primary)' }}
          >
            {name}
          </span>
        </Link>

        {/* Desktop nav — centered */}
        <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  'px-3 py-2 text-sm font-body rounded-md transition-colors duration-200 relative',
                  pathname === link.href
                    ? 'font-semibold'
                    : 'hover:text-[var(--color-primary)]',
                )}
                style={{
                  color:
                    pathname === link.href ? 'var(--color-primary)' : 'var(--color-text-light)',
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right: phone + CTA */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          {formattedPhone && (
            <a
              href={formattedPhone.href}
              className="text-sm font-body flex items-center gap-1.5 transition-colors duration-200"
              style={{ color: 'var(--color-text-light)' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-light)')
              }
            >
              <Phone className="w-4 h-4" weight="bold" aria-hidden />
              {formattedPhone.display}
            </a>
          )}
          <a
            href={boatworkProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2 px-4"
          >
            Request Quote
            <ArrowRight className="w-4 h-4" weight="bold" aria-hidden />
          </a>
        </div>

        {/* Mobile: phone + hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          {formattedPhone && (
            <a
              href={formattedPhone.href}
              aria-label={`Call ${formattedPhone.display}`}
              style={{ color: 'var(--color-primary)' }}
            >
              <Phone className="w-5 h-5" weight="bold" aria-hidden />
            </a>
          )}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="p-2 rounded-md transition-colors duration-200"
            style={{ color: 'var(--color-primary)' }}
          >
            {menuOpen ? (
              <X className="w-6 h-6" weight="bold" aria-hidden />
            ) : (
              <List className="w-6 h-6" weight="bold" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={clsx(
          'lg:hidden overflow-hidden transition-all duration-300',
          menuOpen ? 'max-h-96 border-t' : 'max-h-0',
        )}
        style={{ borderColor: 'var(--color-bg-dark)' }}
      >
        <div className="bg-white px-4 py-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'flex items-center justify-between px-3 py-3 rounded-lg text-sm font-body transition-colors duration-200',
                pathname === link.href
                  ? 'font-semibold bg-[var(--color-bg)]'
                  : 'hover:bg-[var(--color-bg)]',
              )}
              style={{ color: pathname === link.href ? 'var(--color-primary)' : 'var(--color-text)' }}
            >
              {link.label}
              {pathname === link.href && (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />
              )}
            </Link>
          ))}
          <div className="pt-3 pb-1 border-t" style={{ borderColor: 'var(--color-bg-dark)' }}>
            <a
              href={boatworkProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center text-sm"
            >
              Request Quote
              <ArrowRight className="w-4 h-4" weight="bold" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
