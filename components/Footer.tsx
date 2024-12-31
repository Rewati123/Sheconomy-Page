import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img src="/she-logo-white.png" alt="SHE Logo" className="w-32 h-auto" />
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300"><Facebook /></a>
            <a href="#" className="hover:text-gray-300"><Twitter /></a>
            <a href="#" className="hover:text-gray-300"><Instagram /></a>
            <a href="#" className="hover:text-gray-300"><Linkedin /></a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          © 2023 SHEconomy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

