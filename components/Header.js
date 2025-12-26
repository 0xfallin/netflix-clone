'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-netflix-black bg-opacity-90 backdrop-blur' 
          : 'bg-gradient-to-b from-black to-transparent'
      }`}
    >
      <div className="px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/">
          <span className="text-netflix-red text-2xl sm:text-3xl font-bold cursor-pointer hover:opacity-80 transition">
            NETFLIX
          </span>
        </Link>
        <nav className="flex gap-6 text-sm sm:text-base">
          <Link href="/" className="hover:text-netflix-red transition">
            Home
          </Link>
          <Link href="#trending" className="hover:text-netflix-red transition">
            Trending
          </Link>
          <Link href="#" className="hover:text-netflix-red transition">
            Browse
          </Link>
        </nav>
      </div>
    </header>
  )
}