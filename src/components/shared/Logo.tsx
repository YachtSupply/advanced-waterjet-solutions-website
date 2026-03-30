'use client';

import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

interface LogoProps {
  logoUrl: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  inverted?: boolean;
  className?: string;
}

const sizes = {
  sm: { container: 32, text: 'text-sm' },
  md: { container: 40, text: 'text-base' },
  lg: { container: 56, text: 'text-xl' },
};

export function Logo({ logoUrl, name, size = 'md', inverted = false, className }: LogoProps) {
  const [error, setError] = useState(false);
  const { container, text } = sizes[size];
  const initial = name.charAt(0).toUpperCase();

  const showImage = logoUrl && !error;

  return (
    <div
      className={clsx('flex items-center gap-2 flex-shrink-0', className)}
      style={{ height: container }}
    >
      {showImage ? (
        <div className="relative" style={{ width: container, height: container }}>
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            fill
            sizes={`${container}px`}
            className="object-contain"
            onError={() => setError(true)}
          />
        </div>
      ) : (
        <div
          className={clsx(
            'flex items-center justify-center rounded font-heading font-bold flex-shrink-0',
            text,
            inverted
              ? 'text-white'
              : 'text-white',
          )}
          style={{
            width: container,
            height: container,
            backgroundColor: inverted
              ? 'rgba(255,255,255,0.15)'
              : 'var(--color-primary)',
          }}
        >
          {initial}
        </div>
      )}
    </div>
  );
}
