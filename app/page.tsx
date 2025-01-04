import Hero from '../components/Hero'
import About from '../components/About'
import Benefits from '../components/Benefits'
import WhoShouldApply from '../components/WhoShouldApply'
import Timeline from '../components/Timeline'
import Testimonials from '../components/Testimonials'
import Partners from '../components/Partners'
import Contact from '../components/Contact'
import {CenteredContentWithLogos} from '../components/CenteredContentWithLogos'
import Lerniningcenter from "../components/Lerniningcenter"
export default function Home() {
  return (
    <main>
      {/* <Lerniningcenter/> */}
      <Hero />
      <About />
      <Benefits />
      <WhoShouldApply />
      <Timeline />
      <Testimonials />
      <Partners />
      <Contact />
      <CenteredContentWithLogos/>
    </main>
  )
}

