"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaUserCircle } from 'react-icons/fa';
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-20  bg-white">
   <Link href="/">
  <img
    src="/she logo 1.png"
    alt="SHE Logo"
    className="w-36 sm:w-44 md:w-52 lg:w-60 xl:w-72 h-auto pr-4 ml-4"
  />
</Link>

    
    
      <nav className="hidden lg:flex gap-8">
       
        <Link href="https://www.sheconomy.in/sell-on-sheconomy" className="text-gray-600 font-bold hover:text-gray-900">Shop</Link>
        <Link href="https://community.sheconomy.in/" className="text-gray-600 font-bold hover:text-gray-900">Community</Link>
        <Link href="/" className="text-[#D41461] font-bold hover:text-[#D41461]">Learning Center</Link>
        <Link href="/" className="text-gray-600 font-bold hover:text-gray-900">Help Desk</Link>
      </nav>

 
      <div className="hidden lg:block">
        <Link href="https://api.whatsapp.com/send/?phone=918448991178&text&type=phone_number&app_absent=0">
          <Button
            variant="default"
            className="bg-[#FF7F42] text-white hover:bg-[#E66A2D] rounded-full h-12 w-40"
          >
            Talk With Us
          </Button>
        </Link>
      </div>

  
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

 
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-10">
          <nav className="flex flex-col items-center gap-4 p-4">
         
            <Link href="https://www.sheconomy.in/sell-on-sheconomy" className="text-gray-600 font-bold hover:text-gray-900">Shop</Link>
            <Link href="https://community.sheconomy.in/" className="text-gray-600 font-bold hover:text-gray-900">Community</Link>
            <Link href="/learning-center" className="text-[#D41461] font-bold hover:text-[#D41461]">Learning Center</Link>
            <Link href="/" className="text-gray-600 font-bold hover:text-gray-900">Help Desk</Link>
            <Link href="https://api.whatsapp.com/send/?phone=918448991178&text&type=phone_number&app_absent=0">
              <Button
                variant="default"
                className="bg-[#FF7F42] text-white hover:bg-[#E66A2D] rounded-full h-12 w-40"
              >
                Talk With Us
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
