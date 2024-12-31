import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Network, BarChart2, Globe, Users } from 'lucide-react'

const benefits = [
  { title: "Networking", description: "Find Co-founders and Investors for your Startup or Business", icon: Network },
  { title: "Business Strategy", description: "A business strategy sets goals and plans to achieve a competitive edge.", icon: BarChart2 },
  { title: "Global Exposure", description: "Pitch your ideas to international investors and collaborators.", icon: Globe },
  { title: "Women-Led Community", description: "A women-led community offers support, empowerment, and resources to help women thrive in their entrepreneurial journeys.", icon: Users }
]

export default function Benefits() {
  return (
    <section id="benefits" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#D41461] mb-12">Program Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <Icon className="w-12 h-12 text-[#D41461] mb-4" />
                  <CardTitle className="text-xl font-semibold">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

