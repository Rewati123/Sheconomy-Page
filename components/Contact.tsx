import { Button } from '@/components/ui/button'

export default function Contact() {
  return (
    <div className="py-8 px-4 sm:px-8 lg:px-12">
    <section className="bg-[#D41461] rounded-lg px-8 sm:px-16 py-8 max-w-7xl mx-auto"> 
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8">
          <div className="text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Need Support?</h2>
            <p className="text-lg sm:text-2xl lg:text-3xl text-white mt-4">
                Schedule A Call For More Details
              </p>
            </div>

            <Button 
              size="lg" 
              className="bg-[#FF7F42] text-white hover:bg-[#E66A2D] text-lg sm:text-xl lg:text-2xl px-8 py-6 rounded-full whitespace-nowrap"
            >
              Schedule A Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
