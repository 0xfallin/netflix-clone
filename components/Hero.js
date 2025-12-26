'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Hero({ movie }) {
  const [showMore, setShowMore] = useState(false)

  if (!movie) return null

  const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
  const description = movie.overview || 'No description available'

  return (
    <div className="relative w-full h-96 sm:h-[500px] md:h-[600px] mt-16 overflow-hidden">
      <Image
        src={imageUrl}
        alt={movie.title || 'Featured Movie'}
        fill
        className="object-cover"
        priority
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/1200x600?text=No+Image'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent"></div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8">
        <div className="max-w-md sm:max-w-2xl">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 text-white">
            {movie.title || movie.name}
          </h2>
          
          <div className="flex items-center gap-4 mb-4 text-sm sm:text-base">
            <span className="bg-netflix-red px-3 py-1 rounded font-bold">
              {Math.round(movie.vote_average * 10)}%
            </span>
            <span className="text-gray-300">{movie.release_date?.split('-')[0]}</span>
          </div>

          <p className={`text-sm sm:text-base text-gray-200 mb-4 ${!showMore && 'line-clamp-2 sm:line-clamp-3'}`}>
            {description}
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button className="bg-netflix-red hover:bg-red-700 px-4 sm:px-8 py-2 sm:py-3 rounded font-bold text-white transition flex items-center gap-2">
              ▶ Play
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 px-4 sm:px-8 py-2 sm:py-3 rounded font-bold text-white transition">
              ℹ More Info
            </button>
            <button 
              onClick={() => setShowMore(!showMore)}
              className="md:hidden bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded font-bold text-white transition text-sm"
            >
              {showMore ? 'Less' : 'More'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}