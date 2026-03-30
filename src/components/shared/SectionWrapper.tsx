import clsx from 'clsx';

interface SectionWrapperProps {
  children: React.ReactNode;
  variant?: 'sand' | 'white' | 'teal' | 'dark';
  id?: string;
  className?: string;
  innerClassName?: string;
  fullWidth?: boolean;
}

export function SectionWrapper({
  children,
  variant = 'white',
  id,
  className,
  innerClassName,
  fullWidth = false,
}: SectionWrapperProps) {
  const bg: Record<string, string> = {
    sand: 'bg-sand',
    white: 'bg-white',
    teal: 'bg-teal text-white',
    dark: 'bg-[var(--color-primary-light)] text-white',
  };

  return (
    <section
      id={id}
      className={clsx('py-20 px-4 sm:px-6 lg:px-8', bg[variant] ?? bg.white, className)}
    >
      {fullWidth ? (
        children
      ) : (
        <div className={clsx('max-w-7xl mx-auto', innerClassName)}>{children}</div>
      )}
    </section>
  );
}
