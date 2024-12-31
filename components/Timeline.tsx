import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Timeline() {
  return (
    <section id="timeline" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#D41461] mb-12">Application Process & Timeline</h2>
        <p className="text-lg md:text-xl max-w-4xl mx-auto text-center mb-12">
          Getting started with the Women in Digital Startup Program is simple! Submit your application online by 10th Jan, 2025. Our team will review submissions and shortlist candidates based on their vision, innovation, and potential. The program kicks off on 29th Dec, 2024, with engaging workshops, mentorship sessions, and hands-on support.
        </p>
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <CardTitle className="text-2xl font-semibold mb-2">Enrollment Starts From</CardTitle>
                <p className="text-xl text-gray-600">29th Dec 2024</p>
              </div>
              <div>
                <CardTitle className="text-2xl font-semibold mb-2">Enrollment Ends on</CardTitle>
                <p className="text-xl text-gray-600">10th Jan 2025</p>
              </div>
              <Button size="lg" className="bg-[#FF7F42] text-white hover:bg-[#E66A2D] text-xl px-8 py-6 rounded-full">
                Apply Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

