"use client"

import { useModal } from "../hooks/use-modal"
import ApplicationModal from "./ApplicationModal"

export default function Hero() {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-16 bg-gradient-to-r from-pink-50 to-pink-100">
      <div className="max-w-2xl mb-8 md:mb-0">
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
          onClick={openModal}
          className="bg-[#FF7F42] text-white hover:bg-[#E66A2D] text-xl px-8 py-6 rounded-full transition-colors"
        >
          APPLY NOW
        </button>
      </div>
      <img src="/hero-image.png" alt="Women Entrepreneurs" className="w-full md:w-1/2 h-auto rounded-lg shadow-lg" />
      <ApplicationModal isOpen={isOpen} onClose={closeModal} />
    </section>
  )
}

