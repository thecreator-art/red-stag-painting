'use client';

import { useState, FormEvent } from 'react';
import { PRICING, CALCULATOR_SERVICES, PRICE_ANCHORS, CTA_PRIMARY, GHL_WEBHOOK_URL, HAS_GHL_WEBHOOK, EMAIL, PHONE_NUMBER, PHONE_HREF } from '@/lib/constants';
import { formatPhoneInput } from '@/lib/utils';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';

function formatPrice(n: number): string {
  return '$' + n.toLocaleString();
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  interior: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="2" y="3" width="16" height="5" rx="1" />
      <path d="M11 8v3" />
      <path d="M11 11h1a1 1 0 011 1v7a2 2 0 01-4 0v-7a1 1 0 011-1h1z" />
    </svg>
  ),
  exterior: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6h6v6" />
    </svg>
  ),
  cabinet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M12 3v18" />
      <path d="M2 12h20" />
    </svg>
  ),
  popcorn: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M4 4h16" />
      <path d="M4 4v4c0 1 1 2 2 2h12c1 0 2-1 2-2V4" />
      <path d="M8 10v10M16 10v10M6 20h12" />
    </svg>
  ),
  stucco: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 21l8-8" />
      <path d="M11 13l5-5-3-3-5 5 3 3z" />
      <path d="M16 8l3-3a1 1 0 00-1.414-1.414L14.5 6.5" />
      <path d="M6 18h4v3H6z" />
    </svg>
  ),
  ceiling: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 5h18" />
      <path d="M5 5v2M19 5v2" />
      <path d="M8 5v14a2 2 0 004 0V5" />
      <circle cx="10" cy="19" r="2" />
    </svg>
  ),
  garage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 21V8l9-5 9 5v13" />
      <path d="M3 21h18" />
      <rect x="7" y="13" width="10" height="8" />
      <path d="M7 17h10" />
    </svg>
  ),
  wooddeck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M4 20h16" />
      <path d="M4 20V10M20 20V10" />
      <path d="M2 10h20" />
      <path d="M8 10V6M12 10V4M16 10V6" />
    </svg>
  ),
};

export default function EstimateCalculator() {
  const [step, setStep] = useState(1);
  const [serviceKey, setServiceKey] = useState<string | null>(null);
  const [sizeIndex, setSizeIndex] = useState<number | null>(null);
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  const selectedService = CALCULATOR_SERVICES.find((s) => s.key === serviceKey);
  const options = serviceKey ? PRICING[serviceKey] : [];
  const selectedOption = sizeIndex !== null ? options[sizeIndex] : null;

  function selectService(key: string) {
    setSlideDirection('left');
    setServiceKey(key);
    setSizeIndex(null);
    setStep(2);
  }

  function selectSize(i: number) {
    setSizeIndex(i);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!contact.name || !contact.phone) return;
    setSubmitting(true);
    setSubmitError('');
    if (!HAS_GHL_WEBHOOK) {
      const subject = `${selectedService?.label || 'Painting'} estimate request from ${contact.name}`;
      const bodyLines = [
        `Name: ${contact.name}`,
        `Phone: ${contact.phone}`,
        `Email: ${contact.email || 'Not provided'}`,
        `Service: ${selectedService?.label || 'Not selected'}`,
        `Size: ${selectedOption?.label || 'Not selected'}`,
        `Price Range: ${selectedOption ? `${formatPrice(selectedOption.min)}-${formatPrice(selectedOption.max)}` : 'Not available'}`,
      ];
      if (typeof window !== 'undefined') {
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
      }
      setSubmitting(false);
      setSubmitError(`Online estimate delivery is not connected yet. Your email app should open now. If it does not, call ${PHONE_NUMBER}.`);
      return;
    }
    try {
      const response = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contact,
          service: selectedService?.label,
          size: selectedOption?.label,
          priceRange: selectedOption ? `${formatPrice(selectedOption.min)}-${formatPrice(selectedOption.max)}` : '',
        }),
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
    } catch {
      setSubmitting(false);
      setSubmitError(`We could not send your request. Call ${PHONE_NUMBER} now or try again in a moment.`);
      return;
    }
    setSubmitting(false);
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      setSubmitted(true);
    }, 1500);
  }

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <section id="pricing" className="py-20 md:py-28 bg-bg-secondary">
      <div className="mx-auto max-w-[720px] px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="section-label">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
              What does painting cost in LA?
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="bg-white rounded-sm border border-border card-depth overflow-hidden">
            {/* Tool header accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-accent via-accent-hover to-accent" />
            <div className="p-6 md:p-10">
            {/* Progress bar */}
            <div className="h-1 bg-bg-secondary rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Success state */}
            {submitted && (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-text-primary">
                  Thank you, {contact.name.split(' ')[0]}.
                </p>
                <p className="mt-1 text-sm text-text-muted">We&apos;ll call you within 2 hours with your exact price.</p>
              </div>
            )}

            {/* Typing indicator */}
            {showTyping && (
              <div className="py-16 flex items-center justify-center gap-1.5">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            )}

            {/* Steps container */}
            {!submitted && !showTyping && (
              <div className="relative overflow-hidden">
                {/* Step 1: Service selection */}
                {step === 1 && (
                  <div key={`step-1-${slideDirection}`} className={slideDirection === 'right' ? 'slide-in-right' : 'slide-in-left'}>
                    <p className="text-sm font-semibold text-text-primary mb-5">What do you need painted?</p>
                    <div className="grid grid-cols-2 gap-3">
                      {CALCULATOR_SERVICES.map((s) => (
                        <button
                          key={s.key}
                          type="button"
                          onClick={() => selectService(s.key)}
                          className="group flex flex-col items-center gap-3 p-5 md:p-6 rounded-sm border border-border hover:border-accent hover:bg-accent-light/20 transition-all duration-300 cursor-pointer"
                        >
                          <div className="w-12 h-12 rounded-sm bg-accent-light flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                            {SERVICE_ICONS[s.key]}
                          </div>
                          <span className="text-sm font-semibold text-text-primary text-center">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Size + price */}
                {step === 2 && serviceKey && (
                  <div key={`step-2-${slideDirection}`} className={slideDirection === 'left' ? 'slide-in-left' : 'slide-in-right'}>
                    <button
                      type="button"
                      onClick={() => { setSlideDirection('right'); setStep(1); setServiceKey(null); setSizeIndex(null); }}
                      className="text-xs text-text-muted hover:text-accent mb-4 flex items-center gap-1 cursor-pointer transition-colors duration-300"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      Change service
                    </button>
                    <p className="text-sm font-semibold text-text-primary mb-4">
                      {selectedService?.sizeLabel}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {options.map((o, i) => (
                        <button
                          key={o.label}
                          type="button"
                          onClick={() => selectSize(i)}
                          className={`px-4 py-3 rounded-sm text-sm font-semibold transition-all duration-300 cursor-pointer text-left ${
                            sizeIndex === i
                              ? 'bg-accent text-white shadow-sm'
                              : 'bg-bg-secondary text-text-body hover:bg-accent-light'
                          }`}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>

                    {/* Price result */}
                    {selectedOption && (
                      <div className="mt-8 pt-8 border-t border-border text-center" style={{ animation: 'scaleIn 0.3s ease' }}>
                        <p className="text-4xl md:text-5xl font-bold text-accent">
                          {formatPrice(selectedOption.min)} &ndash;{' '}
                          {formatPrice(selectedOption.max)}
                          {selectedOption.plus && '+'}
                        </p>
                        {/* Price anchor */}
                        {serviceKey && PRICE_ANCHORS[serviceKey] && (
                          <p className="mt-2 text-xs text-text-muted italic">
                            {PRICE_ANCHORS[serviceKey]}
                          </p>
                        )}
                        <p className="mt-3 text-sm text-text-muted">
                          Typical range for {selectedService?.label.toLowerCase()} in Los Angeles
                        </p>
                        <div className="mt-6 flex flex-col items-center gap-3">
                          <MagneticButton>
                            <button
                              type="button"
                              onClick={() => { setSlideDirection('left'); setStep(3); }}
                              className="px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-sm transition-all duration-300 cursor-pointer"
                            >
                              Get My Exact Price
                            </button>
                          </MagneticButton>
                          <span className="text-xs text-text-muted flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                            Backed by our 2-year warranty
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Contact info */}
                {step === 3 && (
                  <div key={`step-3-${slideDirection}`} className="slide-in-left">
                    <button
                      type="button"
                      onClick={() => { setSlideDirection('right'); setStep(2); }}
                      className="text-xs text-text-muted hover:text-accent mb-4 flex items-center gap-1 cursor-pointer transition-colors duration-300"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>

                    {selectedOption && (
                      <div className="bg-accent-light/30 rounded-sm px-4 py-3 mb-6 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-text-muted">{selectedService?.label}</p>
                          <p className="text-sm font-semibold text-accent">
                            {formatPrice(selectedOption.min)} &ndash; {formatPrice(selectedOption.max)}{selectedOption.plus && '+'}
                          </p>
                        </div>
                        <p className="text-xs text-text-muted">{selectedOption.label}</p>
                      </div>
                    )}

                    <p className="text-sm font-semibold text-text-primary mb-4">Where should we send your exact price?</p>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      {submitError && (
                        <p className="rounded-sm border border-accent/25 bg-accent/8 px-4 py-3 text-sm text-accent">
                          {submitError}{' '}
                          <a href={PHONE_HREF} className="font-semibold underline underline-offset-2">
                            Call now
                          </a>
                          .
                        </p>
                      )}
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={contact.name}
                        onChange={(e) => setContact(c => ({ ...c, name: e.target.value }))}
                        autoComplete="name"
                        required
                        className="w-full px-4 py-3.5 rounded-sm border border-border text-sm bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all duration-300"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={contact.phone}
                        onChange={(e) => setContact(c => ({ ...c, phone: formatPhoneInput(e.target.value) }))}
                        autoComplete="tel"
                        required
                        className="w-full px-4 py-3.5 rounded-sm border border-border text-sm bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all duration-300"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={contact.email}
                        onChange={(e) => setContact(c => ({ ...c, email: e.target.value }))}
                        autoComplete="email"
                        className="w-full px-4 py-3.5 rounded-sm border border-border text-sm bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all duration-300"
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-accent hover:bg-accent-hover text-white text-sm font-semibold tracking-wider rounded-sm transition-all duration-300 cursor-pointer disabled:opacity-60"
                      >
                        {submitting ? 'Sending...' : CTA_PRIMARY}
                      </button>
                      <p className="text-xs text-text-muted text-center">
                        No spam. No obligation. Just a straight answer.
                      </p>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.98); opacity: 0.7; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
