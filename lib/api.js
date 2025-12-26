const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export const fetchTrending = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching trending movies:', error)
    return []
  }
}

export const fetchTopRated = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching top rated movies:', error)
    return []
  }
}

export const fetchAction = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?with_genres=28&api_key=${API_KEY}`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching action movies:', error)
    return []
  }
}

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error searching movies:', error)
    return []
  }
}