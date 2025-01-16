"use client"

import React from "react"
import Image from "next/image"

const partners = [
  { name: "Sharmistha Chakraborty", title:"Interior designer & vastu consultant", logo: "/Sharmistha Chakraborty 1.png" },
  { name: "Sonal Jhajj", title:"Founder & C.D Metamorphosis", logo: "/Sonal Jhajj 1.png" },
  { name: "Sudha Kumar Audipudy", title: "Founder & CEO The Learning Spot Academy", logo: "/Sudha 1.png" },
  { name: "Achla Bhupendra", title: "Chairperson Sustainable Future Foundation", logo: "/Achla 1.png" },
  { name: "Jaycy Naveen", title: "Founder & CEO MyImaginity", logo: "/Jaycy Naveen 2.png" },
]

export default function Partners() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#D41461] mb-6 sm:mb-4">Our Entrepreneur's Community</h2>
        <div className="border-b-4 border-[#D41461] w-1/2 mx-auto mb-8"></div>
        
        <div className="flex flex-wrap justify-between px-4 sm:px-6 lg:px-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
            >
              <div className="relative w-full h-80 mb-4"> 
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 text-center">{partner.name}</h3>
              <p className="text-xs text-gray-600 text-center">{partner.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
