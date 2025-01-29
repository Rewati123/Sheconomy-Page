"use client"

import { X } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void;
  setShowSuccessModal:(boolean)=>void;
}

export default function SuccessModal({ isOpen, onClose,setShowSuccessModal }: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF7F42', '#D41461', '#FFB6C1'],
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
        <button
          onClick={()=>{setShowSuccessModal(false)}}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#D41461] mb-4">
            Thank You for Submitting Your Details!
          </h2>
          
          <p className="text-gray-600 mb-6">
            You're all set! We've received your information for the Women Entrepreneurship Program. 
            We've sent you an email with all the details and exclusive access to pre-recorded sessions. 
            Don't miss out!
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Ready to Take the Next Step?
            </h3>
            <p className="text-gray-600">
              Connect with inspiring women entrepreneurs, access valuable resources, 
              and grow your business with expert mentorship.
            </p>
          </div>
          
          <button
            onClick={() => window.location.href = '/community'}
            className="w-full bg-[#FF7F42] text-white rounded-lg py-3 px-6 hover:bg-[#E66A2D] transition-colors"
          >
            Join Now & Be Part of the SHEconomy Community Today!
          </button>
        </div>
      </div>
    </div>
  )
}