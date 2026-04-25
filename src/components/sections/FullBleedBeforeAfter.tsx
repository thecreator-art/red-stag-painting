import DragSlider from '@/components/ui/DragSlider';

export default function FullBleedBeforeAfter() {
  return (
    <section className="relative">
      {/* Full-bleed slider */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <DragSlider
          beforeImage="/images/full_bleed_before.png"
          afterImage="/images/full_bleed_after.png"
          beforeAlt="Before: home exterior in Calabasas before painting"
          afterAlt="After: freshly painted home exterior in Calabasas by Red Stag Painting"
          aspectRatio="21/9"
          className="w-full"
          initialPosition={35}
        />
      </div>
      {/* Caption */}
      <div className="mx-auto max-w-4xl py-10 px-6 text-center">
        <h3 className="font-heading font-bold text-xl md:text-2xl text-text-primary mb-4">
          Hollywood Hills, CA &mdash; Complete Exterior Restoration
        </h3>
        <p className="text-text-muted text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          This luxury property suffered from years of sun damage, resulting in chalky, faded stucco. 
          Our team performed a comprehensive 7-day restoration. We started with intense pressure washing, 
          stucco patching, and rigorous masking. We applied a premium primer and finished with two coats 
          of bright white and custom naval black trim using Sherwin-Williams Emerald. The result is a stunning, 
          pristine modern transformation with razor-sharp paint lines that elevated the home's value instantly.
        </p>
      </div>
    </section>
  );
}
