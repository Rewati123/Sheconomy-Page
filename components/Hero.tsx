"use client"
import { useEffect, useRef, useState } from "react"

import { useModal } from "../hooks/use-modal"
import ApplicationModal from "./ApplicationModal"

export default function Hero({title,subtitle,image}) {
  const { isOpen, openModal, closeModal } = useModal()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
console.log(image,"images")
  return (
    <section className="flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-20  bg-white">

      <div className="max-w-2xl mb-8 md:mb-0 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-[#D41461] mb-4">
          SHE Leads The Program 2025
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        {title || "Loading..."}
        </h2>
        {subtitle ? (
  <>
    <p className="text-lg md:text-xl font-bold text-gray-800 mb-2">
      {subtitle.split(".")[0]}.
    </p>
    <p className="text-sm md:text-base text-gray-600 mt-5">
      {subtitle.split(".").slice(1).join(".")}
    </p>
  </>
) : (
  "Loading..."
)}





        <button
        onClick={()=>{openModal(); setShowSuccessModal(false)}}
          className="bg-[#FF7F42] text-white hover:bg-[#E66A2D] text-xl px-8 py-4 rounded-full transition-colors mt-6"
        >
          APPLY NOW
        </button>
      </div>

    
      <div className="w-full md:w-1/2 h-auto rounded-lg mb-8 md:mb-0">
        {image ? (
          <img src={image} alt="Women Entrepreneurs" className="w-full h-auto rounded-lg" />
        ) : (
          <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div> 
        )}
      </div>

      {/* Modal */}
      <ApplicationModal isOpen={isOpen} onClose={closeModal} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}/>
    </section>
  )
}
