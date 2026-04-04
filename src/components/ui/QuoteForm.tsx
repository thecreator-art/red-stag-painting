'use client';

import { useState, FormEvent } from 'react';
import { HERO_SERVICE_OPTIONS, FULL_SERVICE_OPTIONS, GHL_WEBHOOK_URL } from '@/lib/constants';
import { formatPhoneInput } from '@/lib/utils';

interface QuoteFormProps {
  variant?: 'compact' | 'full';
  onDark?: boolean;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  zip: string;
  message: string;
}

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10;
}

function validateZip(zip: string): boolean {
  return /^\d{5}$/.test(zip);
}

export default function QuoteForm({ variant = 'compact', onDark = false }: QuoteFormProps) {
  const isCompact = variant === 'compact';
  const serviceOptions = isCompact ? HERO_SERVICE_OPTIONS : FULL_SERVICE_OPTIONS;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    zip: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!validatePhone(formData.phone)) newErrors.phone = 'Enter a valid phone number';
    if (!isCompact && !formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.service) newErrors.service = 'Select a service';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    else if (!validateZip(formData.zip)) newErrors.zip = 'Enter a 5-digit ZIP';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      console.log('Form submitted:', formData);
    }
    setSubmitting(false);
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      setSubmitted(true);
    }, 1500);
  }

  function handleChange(field: keyof FormData, value: string) {
    if (field === 'phone') {
      value = formatPhoneInput(value);
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  if (showTyping) {
    return (
      <div className="py-12 flex items-center justify-center gap-1.5">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className={`text-lg font-semibold ${onDark ? 'text-white' : 'text-text-primary'}`}>
          Thank you, {formData.name.split(' ')[0]}.
        </p>
        <p className={`mt-1 text-sm ${onDark ? 'text-text-on-dark/60' : 'text-text-muted'}`}>
          We&apos;ll call you within 2 hours with your exact price.
        </p>
      </div>
    );
  }

  const inputBase = 'w-full px-4 py-3 rounded-sm border text-sm font-body transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent';
  const inputStyle = onDark
    ? `${inputBase} bg-[#3A3632] border-[#4A4642] text-text-on-dark placeholder:text-[#8A8580]`
    : `${inputBase} bg-white border-border text-text-primary placeholder:text-text-muted`;

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          autoComplete="name"
          className={inputStyle}
        />
        {errors.name && <p className="mt-1 text-xs text-accent">{errors.name}</p>}
      </div>

      <div>
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          autoComplete="tel"
          className={inputStyle}
        />
        {errors.phone && <p className="mt-1 text-xs text-accent">{errors.phone}</p>}
      </div>

      {!isCompact && (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            autoComplete="email"
            className={inputStyle}
          />
          {errors.email && <p className="mt-1 text-xs text-accent">{errors.email}</p>}
        </div>
      )}

      <div>
        <select
          value={formData.service}
          onChange={(e) => handleChange('service', e.target.value)}
          className={`${inputStyle} ${!formData.service ? (onDark ? 'text-[#8A8580]' : 'text-text-muted') : ''}`}
        >
          <option value="">Select Service Type</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-xs text-accent">{errors.service}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="ZIP Code"
          value={formData.zip}
          onChange={(e) => handleChange('zip', e.target.value.slice(0, 5))}
          inputMode="numeric"
          maxLength={5}
          autoComplete="postal-code"
          className={inputStyle}
        />
        {errors.zip && <p className="mt-1 text-xs text-accent">{errors.zip}</p>}
      </div>

      {!isCompact && (
        <div>
          <textarea
            placeholder="Tell us about your project (optional)"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={3}
            className={inputStyle}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`w-full py-4 bg-accent text-white text-sm font-semibold tracking-wider rounded-sm transition-all duration-300 cursor-pointer disabled:opacity-60 ${
          onDark
            ? 'hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(184,66,51,0.3)]'
            : 'hover:bg-accent-hover'
        }`}
      >
        {submitting ? 'Sending...' : 'Request My Estimate'}
      </button>

      {isCompact && (
        <p className={`text-center text-xs ${onDark ? 'text-[#8A8580]' : 'text-text-muted'}`}>
          No spam. No obligation. Just a straight answer.
        </p>
      )}
    </form>
  );
}
