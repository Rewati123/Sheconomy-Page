"use client"




export default function Lerniningcenter() {


  return (
    <section className="flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-20  bg-white">
      {/* Text Section */}
      <div className="max-w-2xl mb-8 md:mb-0 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-[#D41461] mb-4">
        SHECONOMY
        LEARNING CENTER
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        Learning & Growing Simultaneously
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-gray-600">
        Through several courses and programs, we aim to empower women entrepreneurs in the tech industry by providing them with resources, mentorship, and a supportive community to drive innovation and success. It aims to bridge the gender gap in technology, fostering growth and leadership for women.
        </p>
       
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 h-auto rounded-lg mb-8 md:mb-0">
        <img src="/parent-page-pic.png" alt="Women Entrepreneurs" className="w-full h-auto rounded-lg" />
      </div>

      {/* Modal */}
    
    </section>
  )
}
