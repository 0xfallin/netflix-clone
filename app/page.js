'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MovieRow from '@/components/MovieRow'
import { fetchTrending, fetchTopRated, fetchAction } from '@/lib/api'

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [actionMovies, setActionMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const trending = await fetchTrending()
        const topRated = await fetchTopRated()
        const action = await fetchAction()

        setTrendingMovies(trending)
        setTopRatedMovies(topRated)
        setActionMovies(action)
      } catch (error) {
        console.error('Error loading movies:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  return (
    <main className="bg-netflix-black min-h-screen">
      <Header />
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-2xl text-netflix-red">Loading...</div>
        </div>
      ) : (
        <>
          <Hero movie={trendingMovies[0]} />
          <MovieRow title="Trending Now" movies={trendingMovies} />
          <MovieRow title="Top Rated" movies={topRatedMovies} />
          <MovieRow title="Action Movies" movies={actionMovies} />
        </>
      )}
    </main>
  )
}