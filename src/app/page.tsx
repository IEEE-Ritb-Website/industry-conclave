import HeroSection from '@/sections/landing/hero'
import TimelineSection from '@/sections/landing/timeline'
import AboutSection from '@/sections/landing/about'
import FAQSection from '@/sections/landing/faq'
import ContactSection from '@/sections/landing/contact'
// import AgendaSection from '@/sections/landing/agenda'
import { InfiniteMovingLogos } from '@/components/ui/infinite-moving-logos'
import CTASection from '@/sections/landing/cta'
import TracksSection from '@/sections/landing/tracks'
import Heading from '@/components/shared/heading'
import SpeakerHighlights from '@/sections/landing/speaker-highlights'


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Heading title='People Joining us from' subtitle='' />
      <InfiniteMovingLogos />
      <SpeakerHighlights />
      <AboutSection />
      {/* <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div> */}
      <TracksSection />
      {/* <AgendaSection /> */}
      <TimelineSection />
      <ContactSection />
      <FAQSection />
      <CTASection />
    </>
  )
}