/**
 * Normalizes a US phone number to a consistent display format and tel: href.
 * Returns null if the number can't be parsed.
 */
export function formatPhone(raw: string | null | undefined): {
  display: string;
  href: string;
} | null {
  if (!raw) return null;

  const digits = raw.replace(/\D/g, '');

  // Handle 10-digit US numbers or 11-digit with leading 1
  let normalized = digits;
  if (digits.length === 11 && digits.startsWith('1')) {
    normalized = digits.slice(1);
  }

  if (normalized.length !== 10) return null;

  const area = normalized.slice(0, 3);
  const exchange = normalized.slice(3, 6);
  const subscriber = normalized.slice(6);

  return {
    display: `(${area}) ${exchange}-${subscriber}`,
    href: `tel:+1${normalized}`,
  };
}
