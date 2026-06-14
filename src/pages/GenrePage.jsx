import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { tmdb } from '../services/tmdb'
import { useInfiniteScroll } from '../hooks'
import { GENRES } from '../utils/constants'
import MovieGrid from '../components/media/MovieGrid'

export default function GenrePage() {
  const { id } = useParams()
  const genreName = GENRES[Number(id)] || 'Genre'

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const canLoadMore = page < totalPages && !loading

  const fetchMovies = useCallback(async (newPage = 1) => {
    setLoading(true)
    try {
      const data = await tmdb.discover(id, newPage)
      setTotalPages(data.total_pages || 1)
      const results = data.results || []
      setMovies(prev => newPage === 1 ? results : [...prev, ...results.filter(m => !prev.find(p => p.id === m.id))])
    } catch {}
    finally { setLoading(false) }
  }, [id])

  useEffect(() => { setMovies([]); setPage(1); fetchMovies(1); window.scrollTo({ top: 0 }) }, [id])

  const loadMore = useCallback(() => {
    if (!canLoadMore) return
    const next = page + 1; setPage(next); fetchMovies(next)
  }, [canLoadMore, page, fetchMovies])

  const sentinelRef = useInfiniteScroll(loadMore, canLoadMore)

  return (
    <main className="min-h-screen bg-n-dark pt-24 pb-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-n-red rounded-full" />
          <h1 className="text-2xl sm:text-3xl font-black text-white">{genreName} Films</h1>
        </div>
        <MovieGrid movies={movies} loading={loading && page === 1} />
        {loading && page > 1 && (
          <div className="flex justify-center py-10">
            <svg className="w-8 h-8 animate-spin text-n-red" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        )}
        <div ref={sentinelRef} className="h-4" />
      </div>
    </main>
  )
}
