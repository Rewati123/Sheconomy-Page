"use client"

import { CheckCircle } from 'lucide-react'
import { useModal } from "@/hooks/use-modal"
import ApplicationModal from "./ApplicationModal"

const criteria = [
  'Women with a tech-based startup or idea looking to scale.',
  'Women-led businesses in the early stages of growth seeking support.',
  'Women looking to enhance their leadership skills and take charge of their ventures.',
  'Entrepreneurs eager to break barriers and drive innovation in the tech industry.',
]

export default function WhoShouldApply() {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <section id="apply" className="bg-[#D41461] text-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Who Should Apply?</h2>
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-6 mb-12">
            {criteria.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <button
              onClick={openModal}
              className="bg-white text-[#D41461] hover:bg-gray-100 text-xl px-8 py-6 rounded-full transition-colors"
            >
              APPLY NOW
            </button>
          </div>
        </div>
      </div>
      <ApplicationModal isOpen={isOpen} onClose={closeModal} />
    </section>
  )
}

