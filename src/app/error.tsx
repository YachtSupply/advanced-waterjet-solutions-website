'use client';

import Link from 'next/link';
import { ArrowLeft, WarningCircle } from '@phosphor-icons/react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <WarningCircle
        className="w-16 h-16 mb-6"
        style={{ color: 'var(--color-accent)' }}
        weight="fill"
        aria-hidden
      />
      <h1
        className="font-heading font-extrabold text-4xl mb-3"
        style={{ color: 'var(--color-text)' }}
      >
        Something Went Wrong
      </h1>
      <p className="text-sm mb-8 max-w-sm" style={{ color: 'var(--color-text-light)' }}>
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={reset}
          className="btn-primary"
        >
          Try Again
        </button>
        <Link href="/" className="btn-outline">
          <ArrowLeft className="w-4 h-4" weight="bold" aria-hidden />
          Go Home
        </Link>
      </div>
    </div>
  );
}
