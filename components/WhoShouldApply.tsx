"use client"
import { useEffect, useRef, useState } from "react"

import { CheckCircle } from 'lucide-react'
import { useModal } from "../hooks/use-modal"
import ApplicationModal from "./ApplicationModal"

const criteria = [
  'Women with a tech-based startup or idea looking to scale.',
  'Women-led businesses in the early stages of growth seeking support.',
  'Women looking to enhance their leadership skills and take charge of their ventures.',
  'Entrepreneurs eager to break barriers and drive innovation in the tech industry.',
]

export default function WhoShouldApply({description}) {
  const { isOpen, openModal, closeModal } = useModal()
const [showSuccessModal, setShowSuccessModal] = useState(false)
  return (
    <section id="apply" className="bg-[#D41461] text-white py-16 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center">
          {/* Left side for text */}
          <div className="max-w-xl md:w-1/2 mx-auto text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 pb-4 relative">
              Who Should Apply?
              <div className="border-b-4 bg-white w-1/4 mx-auto mb-4 mt-4"></div>
            </h2>
            <ul className="space-y-6 mb-12">
              {criteria.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
                  <span className="text-lg sm:text-xl">{item}</span>
                </li>
              ))}
            </ul>
            <div className="text-center md:text-left">
              <button
                    onClick={()=>{openModal(); setShowSuccessModal(false)}}
                className="bg-[#FF7F42] text-white hover:bg-[#E66A2D] text-xl px-8 py-4 rounded-full transition-colors"
              >
                APPLY NOW
              </button>
            </div>
          </div>

          {/* Right side for image */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img src="/apply-page.png" alt="Women Entrepreneurs" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </div>
    <ApplicationModal isOpen={isOpen} onClose={closeModal} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}/>
    </section>
  )
}
