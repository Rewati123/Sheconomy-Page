'use client'

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'

type TestimonialsProps = {
  testimonialdata?: {
    name: string;
    role: string;
    image: string;
    quote: string;
  }[];
};

const defaultTestimonials = [
  {
    name: "Jaycy Naveen",
    role: "Founder & CEO at MyImaginity, Software and IT Services",
    image: "/Jaycy Naveen 2.png",
    quote: "I founded MyImaginity, a software company, creating innovative solutions tailored to our customers' unique business needs—from websites and apps to software products, digital marketing, and virtual assistants, leveraging the power of cloud, data, and AI."
  },
  {
    name: "Achla Bhupendra Suthar ( UAE ) ",
    role: "Chairperson at Sustainable Future Foundation",
    image: "/Achla 1.png",
    quote: "Being a Sustainability and Environment consultant by profession and a social worker by passion,. As the Chairperson of the Sustainable Future Foundation, I'm able to promote sustainable initiatives both as professional and not-for-profit activities through SHEconomy"
  },
  {
    name: "Sudha Kumar Audipudy",
    role: "Founder & CEO of The Learning Spot Academy",
    image: "/Sudha 1.png",
    quote: "It all began in 2013 with a mission to enhance children's education by introducing fresh, innovative methods through The Learning Spot Academy. Offering a blend of online and offline courses, the academy curates child-friendly programs in Creative Mathematics, VedicMaths, Soft Skills , Handwriting Courses and Knowledge Series."
  },
  {
    name: "Mrs Sonal Jhajj ",
    role: "Founder & C.D Metamorphosis ",
    image: "/Sonal Jhajj 1.png",
    quote: "I envision creating awareness of genuine educators and reading materials through SHEconomy and empowering women in a true sense through actions and forming authentic connections through the SHEconomy community."
  },
  {
    name: "Sharmistha Chakraborty",
    role: "Vastu Consultant and Interior Designer",
    image: "/Sharmistha Chakraborty 1.png",
    quote: "SHEconomy has been a platform where my expertise in interior design and Vastu flourished. It connects me with like-minded clients, helping me grow professionally while delivering harmonious, thoughtfully planned spaces to those I serve. To be on SHEconomy is a pretty empowering feeling."
  }
];

const Testimonials: React.FC<TestimonialsProps> = ({ testimonialdata }) => {
  const testimonials = testimonialdata && testimonialdata.length > 0 ? testimonialdata : defaultTestimonials;
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-gray-100 relative bg-cover bg-center" style={{ backgroundImage: "url('/slider.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-2">Listen From Our Entrepreneurs</h2>
        <div className="border-b-2 border-[#D41461] w-3/4 sm:w-1/2 mx-auto mb-8"></div>

        <div className="relative">
          <div className="w-full max-w-4xl mx-auto overflow-hidden">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-full px-4">
                  <div className="bg-white bg-opacity-50 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl h-auto">
                    <div className="flex flex-col sm:flex-row items-center p-4 sm:p-8 space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className="bg-[#D41461] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center">
                        <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full" />
                      </div>
                      <div className="flex flex-col text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-1 text-black">{testimonial.name}</h3>
                        <p className="text-sm sm:text-base md:text-lg text-black mb-4">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="px-4 sm:px-8 pb-4">
                      <p className="text-base sm:text-lg md:text-xl text-black">{testimonial.quote}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-1/2 left-0 sm:-left-6 transform -translate-y-1/2">
            <button 
              onClick={prevTestimonial} 
              className="bg-[#D41461] text-white p-2 sm:p-4 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-600 transition duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 right-0 sm:-right-6 transform -translate-y-1/2">
            <button 
              onClick={nextTestimonial} 
              className="bg-[#D41461] text-white p-2 sm:p-4 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-600 transition duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mx-1 p-0 ${index === currentIndex ? "bg-[#D41461]" : "bg-gray-300"}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials;
