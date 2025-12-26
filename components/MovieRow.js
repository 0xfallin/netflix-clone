'use client'

import { useRef } from 'react'
import Image from 'next/image'

export default function MovieRow({ title, movies }) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    const container = scrollRef.current
    const scrollAmount = 500

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  if (!movies || movies.length === 0) {
    return null
  }

  return (
    <div className="px-4 sm:px-8 py-4 sm:py-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">{title}</h2>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 hidden sm:block"
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div
          ref={scrollRef}
          className="flex gap-2 sm:gap-4 overflow-x-scroll scrollbar-hide"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-32 h-44 sm:w-48 sm:h-56 rounded-lg overflow-hidden cursor-pointer hover:scale-110 transition duration-300 hover:z-10 shadow-lg"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || 'Movie'}
                width={200}
                height={300}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x300?text=No+Poster'
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 hidden sm:block"
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  )
}