"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useModal } from "../hooks/use-modal"
import ApplicationModal from "./ApplicationModal"

export default function Timeline() {
  const { isOpen, openModal, closeModal } = useModal()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  return (
    <section id="timeline" className="py-16 bg-white px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto">
        {/* Heading Section */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#D41461] mb-3">
          Application Process & Timeline
        </h2>

     
        <div className="border-b-4 border-[#D41461] w-1/2 sm:w-1/3 mx-auto mb-8"></div>


        <div className="max-w-6xl mx-auto">
  <p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed mt-4 text-justify">
    Getting started with the Women in Digital Startup Program is simple! Submit your application online by 20th Feb, 2025.
  </p>
  <p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed mt-4 text-justify">
    Our team will review submissions and shortlist candidates based on their vision, innovation, and potential. The program kicks off on 29th Dec, 2024, with engaging workshops, mentorship sessions, and hands-on support.
  </p>
</div>


       
        <Card className="bg-gray-100 duration-300 relative rounded-2xl mt-7">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-12">
              {/* Start Date Section */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img src="/start-date.png" alt="Start Date Icon" className="w-16 sm:w-18 h-auto" />
                <div>
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2">Enrollment Starts From</CardTitle>
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-600">29th Dec 2024</p>
                </div>
              </div>

              {/* End Date Section */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img src="/start-end.png" alt="End Date Icon" className="w-16 sm:w-18 h-auto" />
                <div>
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2">Enrollment Ends on</CardTitle>
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-600">20th Feb 2025</p>
                </div>
              </div>

              {/* Apply Now Button */}
              <div className="mt-8 sm:mt-0 w-full sm:w-auto">
                <Button
                  onClick={()=>{openModal(); setShowSuccessModal(false)}}
                  size="lg"
                  className="bg-[#FF7F42] text-white hover:bg-[#E66A2D] text-xl px-8 py-6 rounded-full w-full sm:w-[250px]"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Modal */}
      <ApplicationModal isOpen={isOpen} onClose={closeModal} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}/>

    </section>
  )
}
