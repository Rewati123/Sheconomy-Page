import Image from 'next/image'

const benefits = [
  { title: "Networking", description: "Find Co-founders and Investors for your Startup or Business", image: "/10 1.png" },
  { title: "Business Strategy", description: "A business strategy sets goals and plans to achieve a competitive edge.", image: "/11 1.png" },
  { title: "Global Exposure", description: "Pitch your ideas to international investors and collaborators.", image: "/03 1.png" },
  { title: "Women-Led Community", description: "A women-led community offers support, empowerment, and resources to help women thrive in their entrepreneurial journeys.", image: "/04 1.png" },
  { title: "Support & Mentorship", description: "Get personalized mentorship to guide your startup through each phase.", image: "/09 1.png" }
]

export default function Benefits() {
  return (
    <section id="benefits" className="py-16 bg-white px-6">
      <div className="container mx-auto">
    
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#D41461] mb-4">Program Benefits</h2>
        <div className="border-b-4 border-[#D41461] w-1/4 mx-auto mb-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {benefits.slice(0, 3).map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Image src={benefit.image} alt={benefit.title} width={120} height={120} className="mb-4"/>
              <h3 className="text-2xl font-semibold">{benefit.title}</h3>
              <p className="mt-2 px-4 text-lg break-words max-w-xs">{benefit.description}</p>
            </div>
          ))}
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
          {benefits.slice(3, 5).map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Image src={benefit.image} alt={benefit.title} width={120} height={120} className="mb-4"/>
              <h3 className="text-2xl font-semibold">{benefit.title}</h3>
              <p className="mt-2 px-4 text-lg break-words max-w-xs">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
