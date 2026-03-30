import Image from 'next/image';
import type { BoatworkBadge as BadgeType } from '@/lib/boatwork';

interface BoatworkBadgeProps {
  badge: BadgeType | null;
  profileUrl: string;
  logoUrl: string;
  name: string;
}

export function BoatworkBadge({ badge, profileUrl, logoUrl, name }: BoatworkBadgeProps) {
  if (!badge && !profileUrl) return null;

  // If badge has embedded HTML, render it
  if (badge?.htmlContent) {
    return (
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${name} on Boatwork`}
        dangerouslySetInnerHTML={{ __html: badge.htmlContent }}
      />
    );
  }

  // If badge has an image URL — use a plain <img> since the badge URL returns an SVG
  // which Next.js Image does not support without extra config
  if (badge?.imageUrl) {
    return (
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${name} on Boatwork`}
        className="inline-block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={badge.imageUrl}
          alt={badge.label || 'Boatwork Verified'}
          width={160}
          height={60}
          style={{ objectFit: 'contain' }}
        />
      </a>
    );
  }

  // Default: Boatwork logo link
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200 hover:border-[var(--color-primary)]"
      style={{ borderColor: 'var(--color-bg-dark)' }}
      aria-label={`View ${name} on Boatwork`}
    >
      <Image
        src={logoUrl}
        alt="Boatwork"
        width={100}
        height={28}
        className="object-contain"
      />
      <span className="text-xs font-mono tracking-wide text-[var(--color-text-light)]">
        Verified Pro
      </span>
    </a>
  );
}
