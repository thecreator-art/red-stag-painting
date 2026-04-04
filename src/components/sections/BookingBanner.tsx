import { BOOKING_MESSAGE } from '@/lib/constants';

export default function BookingBanner() {
  return (
    <a
      href="#contact"
      className="block bg-accent hover:bg-accent-hover transition-colors duration-300"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-3 flex items-center justify-center gap-3">
        <svg className="w-4 h-4 text-white/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <p className="text-white text-sm font-medium">
          {BOOKING_MESSAGE} &mdash;{' '}
          <span className="underline underline-offset-2">Schedule your free walkthrough</span>
        </p>
      </div>
    </a>
  );
}
