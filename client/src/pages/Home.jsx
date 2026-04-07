import React from 'react'
import Hero from '../components/Hero'
import FloatingContact from '../components/FloatingContact'
import AboutSection from '../components/AboutSection'
import OurModels from '../components/OurModels'
import ContactSection from '../components/ContactSection'
import SubmissionCTA from '../components/SubmissionCTA'

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <FloatingContact />
      <AboutSection/>
      <OurModels />
      <SubmissionCTA />
      <ContactSection />
    </div>
  )
}

export default Home