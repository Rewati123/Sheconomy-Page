
"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Hero from 'components/Hero'
import About from 'components/About'
import Benefits from 'components/Benefits'
import WhoShouldApply from 'components/WhoShouldApply'
import Timeline from 'components/Timeline'
import Testimonials from 'components/Testimonials'
import Partners from 'components/Partners'
import Contact from 'components/Contact'
import { CenteredContentWithLogos } from 'components/CenteredContentWithLogos'
import { Program } from '../types/program'

const Programpage: React.FC = () => {
  const [programData, setProgramData] = useState<Program | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await axios.get('/api/program');
  
        console.log("API Response:", response.data); 
  
        if (response.data?.data?.length > 0) {
          setProgramData(response.data.data[0]); 
        } else {
          setError('No program data found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch program data');
        setLoading(false);
        console.error('Error fetching program data:', err);
      }
    };
  
    fetchProgramData();
  }, []);
  

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
  }

  if (!programData) {
    return <div className="min-h-screen flex items-center justify-center">No program data available</div>
  }

  return (
    <>
      <Hero 
        title={programData.title}
        subtitle={programData.subtitle}
        
        image={programData.image}
      />
      
      <About 
        description={programData.description} 
        shortdescription={programData.short_description}
      />
      
      <Benefits 
        benefits={programData.benefits} 
      />
      
      <WhoShouldApply 
        description={programData.ideal_For_Description
        } 
      />
      
      <Timeline 
        startDate={programData.start_Date
        } 
        endDate={programData.end_Date
        } 
        description={programData.timeline_Description
        } 
      />
      
    
        <Testimonials testimonialdata={programData.testimonials} />
    
      
      <Partners />
      
      <Contact />
      
      <div className='mt-10'>
        <CenteredContentWithLogos/>
      </div>
    </>
  )
}

export default Programpage
