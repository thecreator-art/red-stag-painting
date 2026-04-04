import DragSlider from '@/components/ui/DragSlider';

export default function FullBleedBeforeAfter() {
  return (
    <section className="relative">
      {/* Full-bleed slider */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <DragSlider
          beforeImage="https://images.unsplash.com/photo-1560185127-6ed9919d945b?auto=format&fit=crop&w=1800&q=80"
          afterImage="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1800&q=80"
          beforeAlt="Before: home exterior in Calabasas before painting"
          afterAlt="After: freshly painted home exterior in Calabasas by Red Stag Painting"
          aspectRatio="21/9"
          className="w-full"
          initialPosition={35}
        />
      </div>
      {/* Caption */}
      <div className="mx-auto max-w-2xl py-6 px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-text-muted" />
            <span className="text-text-muted font-medium">Before: Faded, cracked stucco with 15 years of sun damage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-accent" />
            <span className="text-text-body font-medium">After: Full elastomeric repaint &mdash; Calabasas, CA &mdash; 7 days</span>
          </div>
        </div>
      </div>
    </section>
  );
}
