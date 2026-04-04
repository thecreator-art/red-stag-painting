'use client';

const PLATFORMS = [
  {
    name: 'Google',
    rating: '4.9',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: 'Yelp',
    rating: '5.0',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#D32323">
        <path d="M12.14 1C6.05 1 2.15 4.32 2.15 4.32s-.58.5-.2 1.26c.38.77 2.84 4.86 3.2 5.36.35.5.87.54 1.24.32.37-.22 2.13-1.43 2.13-1.43s.4-.3.26-.82c-.06-.24-.43-.67-.43-.67S5.27 5.02 5.05 4.7c-.22-.32-.06-.6.22-.76 0 0 1.7-1.08 4.63-1.38.73-.08 1.28.28 1.28.28l.04 8.48s.02.65-.56.75c-.58.1-3.72.63-4.22.73-.5.1-.9-.08-1.06-.42-.15-.34-1.9-4.3-2.1-4.82-.2-.52.12-.96.42-1.12 0 0 .46-.22 1.06-.32"/>
        <path d="M13.34 14.52s-.14-.5.28-.78c.42-.28 3.38-2.1 3.82-2.38.44-.28.96-.14 1.18.22.22.36 1.5 3.08 1.7 3.52.2.44-.02.92-.42 1.1-.4.18-4.08 1.5-4.58 1.66-.5.16-.94-.1-1.06-.5-.12-.4-.7-2.32-.92-2.84z"/>
        <path d="M12.88 17.02s-.32-.4.02-.84c.34-.44 2.68-3.18 3.04-3.56.36-.38.9-.36 1.18-.02.28.34 2.24 2.62 2.5 2.94.26.32.14.82-.24 1.06-.38.24-3.72 2.46-4.2 2.76-.48.3-.98.12-1.18-.2-.2-.32-1.12-2.14-1.12-2.14z"/>
        <path d="M11.1 17.02s.32-.4-.02-.84c-.34-.44-2.68-3.18-3.04-3.56-.36-.38-.9-.36-1.18-.02-.28.34-2.24 2.62-2.5 2.94-.26.32-.14.82.24 1.06.38.24 3.72 2.46 4.2 2.76.48.3.98.12 1.18-.2.2-.32 1.12-2.14 1.12-2.14z"/>
      </svg>
    ),
  },
  {
    name: 'Nextdoor',
    rating: null,
    label: 'Recommended',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#8ED500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
      </svg>
    ),
  },
  {
    name: 'Angi',
    rating: null,
    label: 'Top Pro',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FF6153">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#FF6153"/>
        <path d="M2 17l10 5 10-5" fill="none" stroke="#FF6153" strokeWidth="2"/>
        <path d="M2 12l10 5 10-5" fill="none" stroke="#FF6153" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: 'BBB',
    rating: 'A+',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="#005A78"/>
        <text x="12" y="15" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">BBB</text>
      </svg>
    ),
  },
];

export default function TrustedPlatforms() {
  return (
    <section className="py-5 md:py-6 bg-bg-primary border-b border-border/50">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex items-center justify-center gap-6 md:gap-10">
          <p className="text-[11px] font-semibold tracking-wider uppercase text-text-muted shrink-0 hidden md:block">
            Trusted on
          </p>
          <div className="hidden md:block w-px h-6 bg-border" />
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
            {PLATFORMS.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-2 group"
              >
                <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {platform.icon}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-text-primary">
                    {platform.name}
                  </span>
                  {platform.rating && (
                    <span className="text-xs font-bold text-accent bg-accent-light/50 px-1.5 py-0.5 rounded">
                      {platform.rating}
                    </span>
                  )}
                  {platform.label && (
                    <span className="text-xs font-medium text-success bg-success/10 px-1.5 py-0.5 rounded">
                      {platform.label}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
