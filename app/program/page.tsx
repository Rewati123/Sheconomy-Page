import React from 'react'
import Hero from 'components/Hero'
import About from 'components/About'
import Benefits from 'components/Benefits'
import WhoShouldApply from 'components/WhoShouldApply'
import Timeline from 'components/Timeline'
import Testimonials from 'components/Testimonials'
import Partners from 'components/Partners'
import Contact from 'components/Contact'
import { CenteredContentWithLogos } from 'components/CenteredContentWithLogos'
const Programpage = () => {
  return (
    <>
    
      {/* <Lerniningcenter/> */}
      <Hero />
      <About />
      <Benefits />
      <WhoShouldApply />
      <Timeline />
      <Testimonials />
      <Partners />
      <Contact />
      <div  className='mt-10'>
      <CenteredContentWithLogos/>
      </div>
    
    
    
    </>
  )
}

export default Programpage