'use client';

import { useState } from 'react';
import { PaperPlaneTilt, CircleNotch, CheckCircle, WarningCircle } from '@phosphor-icons/react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg((data as { error?: string }).error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <CheckCircle
          className="w-14 h-14"
          style={{ color: 'var(--color-accent)' }}
          weight="fill"
          aria-hidden
        />
        <h3 className="font-heading font-bold text-2xl" style={{ color: 'var(--color-text)' }}>
          Message Received
        </h3>
        <p className="text-sm max-w-xs" style={{ color: 'var(--color-text-light)' }}>
          We&apos;ll be in touch soon. Thanks for reaching out!
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg border text-sm font-body bg-white transition-colors duration-200 outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]';

  const inputStyle = {
    borderColor: 'var(--color-bg-dark)',
    color: 'var(--color-text)',
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-mono font-medium mb-1.5 tracking-wide"
            style={{ color: 'var(--color-text-light)' }}
          >
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-mono font-medium mb-1.5 tracking-wide"
            style={{ color: 'var(--color-text-light)' }}
          >
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-xs font-mono font-medium mb-1.5 tracking-wide"
          style={{ color: 'var(--color-text-light)' }}
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="(555) 555-0100"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-mono font-medium mb-1.5 tracking-wide"
          style={{ color: 'var(--color-text-light)' }}
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your vessel and what you need..."
          className={`${inputClass} resize-none`}
          style={inputStyle}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-200">
          <WarningCircle className="w-4 h-4 flex-shrink-0 text-red-500" weight="fill" aria-hidden />
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <>
            <CircleNotch className="w-4 h-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <PaperPlaneTilt className="w-4 h-4" weight="bold" aria-hidden />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
