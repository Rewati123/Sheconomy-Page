import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#D41461] text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <h2 className="text-xl font-semibold">Call: +91 8448991178</h2>
              <h2 className="text-xl font-semibold">Email: support@sheconomy.in</h2>
            </div>
          </div>

          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gray-300">
              <Facebook size={36} /> 
            </a>
            <a href="#" className="hover:text-gray-300">
              <Twitter size={36} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Instagram size={36} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Linkedin size={36} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          © 2023 SHEconomy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
