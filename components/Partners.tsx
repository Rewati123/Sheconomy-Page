"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { useMediaQuery } from "../hooks/use-media-query"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const partners = [
  { name: "TechInnovate", logo: "/techinnovate-logo.png" },
  { name: "WomenInTech", logo: "/womenintech-logo.png" },
  { name: "FutureFounders", logo: "/futurefounders-logo.png" },
  { name: "DigitalDreamers", logo: "/digitaldreamers-logo.png" },
  { name: "AI Ventures", logo: "/ai-ventures-logo.png" },
  { name: "GreenTech Solutions", logo: "/greentech-solutions-logo.png" },
  { name: "Cyber Secure", logo: "/cyber-secure-logo.png" },
  { name: "Data Dynamics", logo: "/data-dynamics-logo.png" },
]

export default function Partners() {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")
  const [currentIndex, setCurrentIndex] = useState(0)

  const slidesToShow = isMobile ? 1 : isTablet ? 2 : 4
  const totalSlides = Math.ceil(partners.length / slidesToShow)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#D41461] mb-8 sm:mb-12">Empowering Partners</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          We collaborate with industry leaders to provide the best opportunities and resources for women in tech.
        </p>
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4`}
                >
                  <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-6">
                    <div className="relative w-32 h-32 mx-auto">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-800 text-center">{partner.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}

