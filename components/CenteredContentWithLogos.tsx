import Image from 'next/image'

export function CenteredContentWithLogos() {
  const logos = [
    { src: '/logo_2.png', alt: 'Logo 1' },
    { src: '/logo_3.png', alt: 'Logo 2' },
    { src: '/logo_1.png', alt: 'Logo 3' },
  ]

  return (
    <div className="flex flex-col items-center w-full mx-auto p-8">
      <div className="relative w-full mb-16">
    
        <div className="border-b-4 border-[#D41461] w-full absolute top-1/2 left-0 transform -translate-y-1/2"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 mb-20"> 
  <div className="w-64 sm:w-96 md:w-[600px] lg:w-[800px]"> 
    <Image
      src="/she logo 2.png"
      alt="Centered Image"
      width={2500} 
      height={2500}  
      className="rounded-full w-full h-auto"
    />
  </div>
</div>

      </div>


      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#D41461] mt-12 mb-16">
        Empowering Partners
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-8">
    
        <div className="flex justify-center mb-6 w-24 sm:w-32 md:w-40">
          <Image
            key={0} 
            src={logos[0].src}
            alt={logos[0].alt}
            width={180}  
            height={180} 
            className="rounded-full"
          />
        </div>

 
        <div className="flex justify-center mb-6 w-32 sm:w-48 md:w-64">
          <Image
            key={1} 
            src={logos[1].src}
            alt={logos[1].alt}
            width={240}  
            height={240} 
            className="rounded-full"
          />
        </div>

        <div className="flex justify-center mb-6 w-24 sm:w-32 md:w-40">
          <Image
            key={2} 
            src={logos[2].src}
            alt={logos[2].alt}
            width={180}  // Smaller size
            height={180} // Smaller size
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
