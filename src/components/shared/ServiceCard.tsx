import React from 'react';
import {
  Wrench,
  Lightning,
  Anchor,
  Boat,
  Engine,
  NavigationArrow,
  CheckCircle,
  Tag,
  Clock,
} from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';

interface ServiceCardProps {
  name: string;
  description: string;
  icon: string;
  keywords?: string[];
  benefits?: string[];
  priceRange?: string | null;
  typicalDuration?: string | null;
  variant?: 'default' | 'compact';
}

function ServiceIcon({
  icon,
  className,
  style,
}: {
  icon: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const props = { className, style, weight: 'regular' as const, 'aria-hidden': true };
  switch (icon) {
    case 'engine':
      return <Engine {...props} />;
    case 'electric':
      return <Lightning {...props} />;
    case 'anchor':
      return <Anchor {...props} />;
    case 'wheel':
      return <Boat {...props} />;
    case 'wrench':
      return <Wrench {...props} />;
    case 'captain':
      return <NavigationArrow {...props} />;
    default:
      return <Wrench {...props} />;
  }
}

export function ServiceCard({
  name,
  description,
  icon,
  keywords,
  benefits,
  priceRange,
  typicalDuration,
  variant = 'default',
}: ServiceCardProps) {
  return (
    <div className={clsx('service-card group', variant === 'compact' && 'p-5')}>
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-[var(--color-accent)]"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <ServiceIcon
          icon={icon}
          className="w-6 h-6 transition-colors duration-300 group-hover:text-white"
          style={{ color: 'var(--color-primary)' } as React.CSSProperties}
        />
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-lg mb-2" style={{ color: 'var(--color-text)' }}>
        {name}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-4 line-clamp-4"
        style={{ color: 'var(--color-text-light)' }}
      >
        {description}
      </p>

      {/* Benefits */}
      {benefits && benefits.length > 0 && variant === 'default' && (
        <ul className="space-y-1 mb-4">
          {benefits.slice(0, 3).map((b) => (
            <li key={b} className="flex items-start gap-2 text-xs" style={{ color: 'var(--color-text-light)' }}>
              <CheckCircle
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: 'var(--color-accent)' }}
                weight="fill"
                aria-hidden
              />
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* Meta row */}
      {(priceRange || typicalDuration) && (
        <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t" style={{ borderColor: 'var(--color-bg-dark)' }}>
          {priceRange && (
            <span className="inline-flex items-center gap-1 text-xs font-mono" style={{ color: 'var(--color-accent-dark)' }}>
              <Tag className="w-3 h-3" weight="bold" aria-hidden />
              {priceRange}
            </span>
          )}
          {typicalDuration && (
            <span className="inline-flex items-center gap-1 text-xs font-mono" style={{ color: 'var(--color-text-light)' }}>
              <Clock className="w-3 h-3" weight="bold" aria-hidden />
              {typicalDuration}
            </span>
          )}
        </div>
      )}

      {/* Keywords */}
      {keywords && keywords.length > 0 && variant === 'default' && (
        <div className="flex flex-wrap gap-1 mt-3">
          {keywords.slice(0, 4).map((k) => (
            <span
              key={k}
              className="text-xs px-2 py-0.5 rounded-full font-mono"
              style={{
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text-light)',
              }}
            >
              {k}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
