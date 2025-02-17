"use client"
import { useEffect, useRef, useState } from "react"

import { useModal } from "../hooks/use-modal"
import ApplicationModal from "./ApplicationModal"

export default function Hero() {
  const { isOpen, openModal, closeModal } = useModal()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  return (
    <section className="flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-20  bg-white">

      <div className="max-w-2xl mb-8 md:mb-0 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-[#D41461] mb-4">
          SHE Leads The Program 2025
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          SHEconomy Women in Digital Startup Program
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-gray-600">
          Zero fees for all women entrepreneurs or businesses led by women
        </p>
        <button
        onClick={()=>{openModal(); setShowSuccessModal(false)}}
          className="bg-[#FF7F42] text-white hover:bg-[#E66A2D] text-xl px-8 py-4 rounded-full transition-colors"
        >
          APPLY NOW
        </button>
      </div>

    
      <div className="w-full md:w-1/2 h-auto rounded-lg mb-8 md:mb-0">
        <img src="/program-page.png" alt="Women Entrepreneurs" className="w-full h-auto rounded-lg" />
      </div>

      {/* Modal */}
      <ApplicationModal isOpen={isOpen} onClose={closeModal} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}/>
    </section>
  )
}
