"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

const testimonials = [
  {
    name: "Jaycy Naveen",
    role: "Founder & CEO",
    company: "MyImaginity",
    image: "/jaycy-naveen.jpg",
    quote: "I founded MyImaginity, a software company, creating innovative solutions tailored to our customers' unique business needs—from websites and apps to software products, digital marketing, and virtual assistants, leveraging the power of cloud, data, and AI."
  },
  {
    name: "Sarah Johnson",
    role: "Co-founder",
    company: "TechWomen",
    image: "/sarah-johnson.jpg",
    quote: "The SHEconomy program provided me with the tools and network I needed to turn my tech startup idea into a thriving business. The mentorship and support have been invaluable."
  },
  {
    name: "Priya Patel",
    role: "CTO",
    company: "InnovatHer",
    image: "/priya-patel.jpg",
    quote: "As a woman in tech, I often felt isolated. The SHEconomy community has been a game-changer, connecting me with like-minded entrepreneurs and opening doors to new opportunities."
  },
  {
    name: "Emily Chen",
    role: "Founder",
    company: "EcoTech Solutions",
    image: "/emily-chen.jpg",
    quote: "SHEconomy's program helped me refine my sustainable tech business model. The mentors' insights were crucial in navigating the challenges of a green startup."
  },
  {
    name: "Zara Ahmed",
    role: "CEO",
    company: "FinTech Innovators",
    image: "/zara-ahmed.jpg",
    quote: "The networking opportunities through SHEconomy were unparalleled. I found my co-founder and secured our first round of funding thanks to the connections made here."
  }
]

const autoplayOptions = {
  delay: 5000,
  rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
}

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay(autoplayOptions)])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#D41461] mb-12">Listen From Our Entrepreneurs</h2>
        <Carousel
          ref={emblaRef}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="flex flex-col items-center p-6">
                      <Avatar className="w-24 h-24 mb-4">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-semibold mb-1">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{testimonial.role} at {testimonial.company}</p>
                      <p className="text-gray-700 text-center">{testimonial.quote}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`w-3 h-3 rounded-full mx-1 p-0 ${
                index === selectedIndex ? "bg-[#D41461]" : "bg-gray-300"
              }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

