import Link from 'next/link';
import BeforeAfterCard from '@/components/ui/BeforeAfterCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { PROJECTS } from '@/lib/constants';

export default function ProjectGallery() {
  return (
    <section id="our-work" className="py-20 md:py-28 bg-bg-primary">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Section header: left-aligned for asymmetry */}
        <ScrollReveal>
          <div className="max-w-xl mb-14">
            <span className="section-label">Our Work</span>
            <h2 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
              Real homes. Real results.
            </h2>
            <p className="mt-4 text-text-muted text-base md:text-lg">
              Hover or tap any photo to see the before. Every project shown is a home we painted in Los Angeles.
            </p>
          </div>
        </ScrollReveal>

        {/* Masonry gallery */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <BeforeAfterCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="mt-14 flex items-center gap-4">
            <div className="brand-line" />
            <Link
              href="/our-work"
              className="text-accent hover:text-accent-hover font-semibold text-sm tracking-wide transition-colors duration-300"
            >
              View all projects &rarr;
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
