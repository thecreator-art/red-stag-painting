import Hero from '@/components/sections/Hero';
import BookingBanner from '@/components/sections/BookingBanner';
import EstimateCalculator from '@/components/sections/EstimateCalculator';
import Services from '@/components/sections/Services';
import BrushDivider from '@/components/ui/BrushDivider';
import ColorVisualizer from '@/components/sections/ColorVisualizer';
import HorizontalGallery from '@/components/sections/HorizontalGallery';
import Process from '@/components/sections/Process';
import Reviews from '@/components/sections/Reviews';
import RedStagDifference from '@/components/sections/RedStagDifference';
import Guarantee from '@/components/sections/Guarantee';
import MeetTheOwner from '@/components/sections/MeetTheOwner';
import BrandStatement from '@/components/sections/BrandStatement';
import ServiceArea from '@/components/sections/ServiceArea';
import FAQ from '@/components/sections/FAQ';
import ContactForm from '@/components/sections/ContactForm';
import TrustedPlatforms from '@/components/sections/TrustedPlatforms';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BookingBanner />
      <TrustedPlatforms />
      <BrushDivider colorFrom="#FAF8F5" colorTo="#EDE7DF" />
      <EstimateCalculator />
      <BrushDivider colorFrom="#EDE7DF" colorTo="#FAF8F5" flip />
      <Services />
      <ColorVisualizer />
      <HorizontalGallery />
      <BrushDivider colorFrom="#FAF8F5" colorTo="#FDF5F2" />
      <Process />
      <BrushDivider colorFrom="#FDF5F2" colorTo="#2C2825" flip />
      <Reviews />
      <BrushDivider colorFrom="#2C2825" colorTo="#FAF8F5" />
      <RedStagDifference />
      <Guarantee />
      <BrushDivider colorFrom="#FAF8F5" colorTo="#2C2825" flip />
      <MeetTheOwner />
      <BrushDivider colorFrom="#2C2825" colorTo="#FAF8F5" />
      <BrandStatement />
      <ServiceArea />
      <FAQ />
      <ContactForm />
    </>
  );
}
