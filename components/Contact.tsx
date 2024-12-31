import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, Mail } from 'lucide-react'

export default function Contact() {
  return (
    <section className="py-16 bg-[#D41461]">
      <div className="container mx-auto px-6">
        <Card className="bg-white shadow-lg max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-[#D41461]">Need Support?</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-[#D41461]" />
                <span className="text-lg">+91 8448991178</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#D41461]" />
                <span className="text-lg">support@sheconomy.in</span>
              </div>
            </div>
            <Button size="lg" className="bg-[#FF7F42] text-white hover:bg-[#E66A2D] text-xl px-8 py-6 rounded-full">
              Schedule A Call
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

