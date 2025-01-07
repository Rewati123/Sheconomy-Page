import Image from 'next/image'

export function CenteredContentWithLogos() {
  const logos = [
    { src: '/LOGO 2.png', alt: 'Logo 1' },
    { src: '/LOGO 11.png', alt: 'Logo 2' },
    { src: '/Logo 01.png', alt: 'Logo 3' },
  ]

  return (
    <div className="flex flex-col items-center max-w-4xl w-full mx-auto p-8">
 <div className="relative w-full mb-12">
        <div className="border-b-4 border-[#D41461] w-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
          <div className="w-48 sm:w-64 md:w-80 lg:w-96">
            <Image
              src="/she logo 2.png"
              alt="Centered Image"
              width={1000}
              height={1000}
              className="rounded-full w-full h-auto"
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#D41461] mb-8">
        Empowering Partners
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-8">
        {/* Place the first logo under the line */}
        <div className="flex justify-center mb-6 w-32 sm:w-48 md:w-64">
          <Image
            key={0} // Position for the first logo
            src={logos[0].src}
            alt={logos[0].alt}
            width={240}  
            height={240} 
            className="rounded-full"
          />
        </div>

        {/* Other logos */}
        {logos.slice(1).map((logo, index) => (
          <div key={index + 1} className="flex justify-center mb-6 w-32 sm:w-48 md:w-64">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={240}  
              height={240} 
              className="rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
