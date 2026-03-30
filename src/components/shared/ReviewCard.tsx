import { Star, SealCheck, CaretDown } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';

interface ReviewCardProps {
  author: string;
  rating: number;
  text: string;
  date: string;
  isVerified: boolean;
  response?: string | null;
  responseDate?: string | null;
  variant?: 'default' | 'featured';
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          weight={i < rating ? 'fill' : 'regular'}
          style={{ color: i < rating ? 'var(--color-accent)' : 'var(--color-bg-dark)' }}
          aria-hidden
        />
      ))}
    </div>
  );
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function ReviewCard({
  author,
  rating,
  text,
  date,
  isVerified,
  response,
  responseDate,
  variant = 'default',
}: ReviewCardProps) {
  return (
    <article
      className={clsx(
        'review-card flex flex-col gap-4',
        variant === 'featured' && 'border-l-2',
      )}
      style={
        variant === 'featured'
          ? { borderLeftColor: 'var(--color-accent)' }
          : undefined
      }
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-heading font-bold text-sm" style={{ color: 'var(--color-text)' }}>
              {author}
            </span>
            {isVerified && (
              <SealCheck
                className="w-4 h-4 flex-shrink-0"
                style={{ color: 'var(--color-primary-light)' }}
                weight="fill"
                aria-label="Verified review"
              />
            )}
          </div>
          <StarRating rating={rating} />
        </div>
        <time
          dateTime={date}
          className="text-xs font-mono flex-shrink-0"
          style={{ color: 'var(--color-text-light)' }}
        >
          {formatDate(date)}
        </time>
      </div>

      {/* Quote */}
      <blockquote>
        <p
          className="text-sm leading-relaxed line-clamp-5 italic"
          style={{ color: 'var(--color-text-light)' }}
        >
          &ldquo;{text}&rdquo;
        </p>
      </blockquote>

      {/* Owner response */}
      {response && (
        <div
          className="pt-3 border-t"
          style={{ borderColor: 'var(--color-bg-dark)' }}
        >
          <div className="flex items-center gap-1 mb-2">
            <CaretDown className="w-3 h-3" style={{ color: 'var(--color-accent)' }} weight="bold" aria-hidden />
            <span
              className="text-xs font-mono font-medium tracking-wide"
              style={{ color: 'var(--color-accent)' }}
            >
              Owner Response
            </span>
            {responseDate && (
              <time
                dateTime={responseDate}
                className="text-xs font-mono ml-auto"
                style={{ color: 'var(--color-text-light)' }}
              >
                {formatDate(responseDate)}
              </time>
            )}
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-light)' }}>
            {response}
          </p>
        </div>
      )}
    </article>
  );
}
