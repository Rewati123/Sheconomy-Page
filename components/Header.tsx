import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
      <Link href="/">
        <img src="/she-logo.png" alt="SHE Logo" className="w-32 h-auto" />
      </Link>
      <nav className="hidden md:flex gap-8">
        <Link href="#about" className="text-gray-600 hover:text-gray-900">About</Link>
        <Link href="#benefits" className="text-gray-600 hover:text-gray-900">Benefits</Link>
        <Link href="#apply" className="text-gray-600 hover:text-gray-900">Who Can Apply</Link>
        <Link href="#timeline" className="text-gray-600 hover:text-gray-900">Timeline</Link>
      </nav>
      <Button variant="default" className="bg-[#FF7F42] text-white hover:bg-[#E66A2D]">
        Talk With Us
      </Button>
    </header>
  )
}

