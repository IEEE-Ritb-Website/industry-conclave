import HeroSection from '@/sections/landing/hero'
import TimelineSection from '@/sections/landing/timeline'
import AboutSection from '@/sections/landing/about'
import FAQSection from '@/sections/landing/faq'
import ContactSection from '@/sections/landing/contact'
import Threads from '@/components/ui/reactbits/threads'
import AgendaSection from '@/sections/landing/agenda'


export default function HomePage() {
  return (
    <>
      <HeroSection />
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
    </>
  )
}