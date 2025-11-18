import HeroSection from '@/sections/landing/hero'
import TimelineSection from '@/sections/landing/timeline'
import AboutSection from '@/sections/landing/about'
import FAQSection from '@/sections/landing/faq'
import ContactSection from '@/sections/landing/contact'
import AgendaSection from '@/sections/landing/agenda'
import { InfiniteMovingLogos } from '@/components/ui/infinite-moving-logos'
import CTASection from '@/sections/landing/cta'


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InfiniteMovingLogos />
      <AboutSection />
      {/* <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div> */}
      <AgendaSection />
      <TimelineSection />
      <ContactSection />
      <FAQSection />
      <CTASection />
    </>
  )
}