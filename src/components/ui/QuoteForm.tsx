'use client';

import { useEffect, useId, useRef, useState, FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import { HERO_SERVICE_OPTIONS, SERVICES, GHL_WEBHOOK_URL } from '@/lib/constants';
import { formatPhoneInput } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

interface QuoteFormProps {
  variant?: 'compact' | 'full';
  onDark?: boolean;
  initialService?: string;
  submitLabel?: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  zip: string;
  message: string;
}

interface AttributionData {
  pagePath: string;
  pageType: string;
  serviceSlug: string;
  citySlug: string;
  referrer: string;
  pageTitle: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
}

const serviceSlugMap = new Map(SERVICES.map((service) => [service.name, service.slug]));

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10;
}

function validateZip(zip: string): boolean {
  return /^\d{5}$/.test(zip);
}

export default function QuoteForm({
  variant = 'compact',
  onDark = false,
  initialService = '',
  submitLabel,
}: QuoteFormProps) {
  const isCompact = variant === 'compact';
  const serviceOptions = isCompact ? HERO_SERVICE_OPTIONS : [...SERVICES.map((service) => service.name), 'Other'];
  const pathname = usePathname();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: initialService,
    zip: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [attribution, setAttribution] = useState<AttributionData>({
    pagePath: '',
    pageType: '',
    serviceSlug: '',
    citySlug: '',
    referrer: '',
    pageTitle: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmTerm: '',
    utmContent: '',
  });
  const formId = useId();
  const hasTrackedStart = useRef(false);

  useEffect(() => {
    const params = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0] ?? '';
    const pageType = pathname === '/'
      ? 'home'
      : firstSegment === 'blog' && segments.length === 2
        ? 'blog_post'
        : firstSegment === 'areas' && segments.length === 2
          ? 'city_page'
          : firstSegment === 'areas'
            ? 'areas_index'
            : serviceSlugMap.has(initialService) || serviceSlugMap.has(SERVICES.find((service) => service.slug === firstSegment)?.name ?? '')
              ? segments.length === 2
                ? 'matrix_page'
                : 'service_page'
              : 'generic';

    const serviceSlug = segments.length >= 1 && SERVICES.some((service) => service.slug === firstSegment)
      ? firstSegment
      : serviceSlugMap.get(initialService) ?? '';
    const citySlug = firstSegment === 'areas' && segments.length === 2
      ? segments[1]
      : segments.length === 2 && SERVICES.some((service) => service.slug === firstSegment)
        ? segments[1]
        : '';

    setAttribution({
      pagePath: pathname,
      pageType,
      serviceSlug,
      citySlug,
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      pageTitle: typeof document !== 'undefined' ? document.title : '',
      utmSource: params.get('utm_source') ?? '',
      utmMedium: params.get('utm_medium') ?? '',
      utmCampaign: params.get('utm_campaign') ?? '',
      utmTerm: params.get('utm_term') ?? '',
      utmContent: params.get('utm_content') ?? '',
    });
  }, [initialService, pathname]);

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
    setSubmitError('');
    trackEvent('quote_form_submit_attempt', {
      page_path: attribution.pagePath,
      page_type: attribution.pageType,
      service_slug: attribution.serviceSlug,
      city_slug: attribution.citySlug,
      service_name: formData.service,
      form_variant: variant,
    });
    try {
      const isDemoWebhook = GHL_WEBHOOK_URL.includes('placeholder-webhook.example.com');
      const payload = {
        ...formData,
        ...attribution,
      };

      if (!isDemoWebhook) {
        const response = await fetch(GHL_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }
      }
    } catch {
      setSubmitting(false);
      setSubmitError('We could not send your request. Call us now or try again in a moment.');
      trackEvent('quote_form_submit_error', {
        page_path: attribution.pagePath,
        page_type: attribution.pageType,
        service_slug: attribution.serviceSlug,
        city_slug: attribution.citySlug,
        service_name: formData.service,
      });
      return;
    }
    setSubmitting(false);
    trackEvent('quote_form_submit_success', {
      page_path: attribution.pagePath,
      page_type: attribution.pageType,
      service_slug: attribution.serviceSlug,
      city_slug: attribution.citySlug,
      service_name: formData.service,
      form_variant: variant,
    });
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
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackEvent('quote_form_started', {
        page_path: attribution.pagePath,
        page_type: attribution.pageType,
        service_slug: attribution.serviceSlug,
        city_slug: attribution.citySlug,
        form_variant: variant,
      });
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submitError) setSubmitError('');
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
        <div className="mt-5 space-y-2 text-sm text-text-body">
          <p>Next step: we review the scope, confirm details, and schedule a walkthrough if needed.</p>
          <p>If your project is urgent, calling now is still the fastest path.</p>
        </div>
      </div>
    );
  }

  const inputBase = 'w-full px-4 py-3 rounded-sm border text-sm font-body transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent';
  const inputStyle = onDark
    ? `${inputBase} bg-[#3A3632] border-[#4A4642] text-text-on-dark placeholder:text-[#8A8580]`
    : `${inputBase} bg-white border-border text-text-primary placeholder:text-text-muted`;
  const labelClass = isCompact
    ? 'sr-only'
    : `mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] ${onDark ? 'text-text-on-dark/70' : 'text-text-muted'}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <input type="hidden" value={attribution.pagePath} name="pagePath" />
      <input type="hidden" value={attribution.pageType} name="pageType" />
      <input type="hidden" value={attribution.serviceSlug} name="serviceSlug" />
      <input type="hidden" value={attribution.citySlug} name="citySlug" />
      <input type="hidden" value={attribution.referrer} name="referrer" />
      <input type="hidden" value={attribution.utmSource} name="utmSource" />
      <input type="hidden" value={attribution.utmMedium} name="utmMedium" />
      <input type="hidden" value={attribution.utmCampaign} name="utmCampaign" />
      <input type="hidden" value={attribution.utmTerm} name="utmTerm" />
      <input type="hidden" value={attribution.utmContent} name="utmContent" />
      <div>
        <label htmlFor={`${formId}-name`} className={labelClass}>
          Full Name
        </label>
        <input
          id={`${formId}-name`}
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
        <label htmlFor={`${formId}-phone`} className={labelClass}>
          Phone
        </label>
        <input
          id={`${formId}-phone`}
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
          <label htmlFor={`${formId}-email`} className={labelClass}>
            Email
          </label>
          <input
            id={`${formId}-email`}
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
        <label htmlFor={`${formId}-service`} className={labelClass}>
          Service Type
        </label>
        <select
          id={`${formId}-service`}
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
        <label htmlFor={`${formId}-zip`} className={labelClass}>
          ZIP Code
        </label>
        <input
          id={`${formId}-zip`}
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
          <label htmlFor={`${formId}-message`} className={labelClass}>
            Project Description
          </label>
          <textarea
            id={`${formId}-message`}
            placeholder="Tell us about your project (optional)"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={3}
            className={inputStyle}
          />
        </div>
      )}

      {submitError && (
        <p
          role="alert"
          className="rounded-sm border border-accent/25 bg-accent/8 px-4 py-3 text-sm text-accent"
        >
          {submitError}
        </p>
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
        {submitting ? 'Sending...' : submitLabel ?? 'Request My Estimate'}
      </button>

      {isCompact && (
        <p className={`text-center text-xs ${onDark ? 'text-[#8A8580]' : 'text-text-muted'}`}>
          No spam. No obligation. Just a straight answer.
        </p>
      )}
    </form>
  );
}
