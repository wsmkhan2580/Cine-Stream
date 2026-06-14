import React, { useState, useEffect, useCallback } from 'react'
import { tmdb } from '../services/tmdb'
import { useDebounce, useInfiniteScroll } from '../hooks'
import HeroBanner from '../components/media/HeroBanner'
import MovieGrid from '../components/media/MovieGrid'
import MoodMatcher from '../components/common/MoodMatcher'

export default function Home({ search }) {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hero, setHero] = useState(null)
  const [trending, setTrending] = useState([])

  const debouncedSearch = useDebounce(search, 500)
  const isSearching = debouncedSearch.trim().length > 0
  const canLoadMore = page < totalPages && !loading

  // Load trending for hero
  useEffect(() => {
    tmdb.trending().then(d => {
      const results = d.results || []
      setTrending(results)
      if (results.length) setHero(results[Math.floor(Math.random() * Math.min(5, results.length))])
    }).catch(() => {})
  }, [])

  const fetchMovies = useCallback(async (newPage = 1, q = '') => {
    setLoading(true); setError(null)
    try {
      const data = q ? await tmdb.search(q, newPage) : await tmdb.popular(newPage)
      setTotalPages(data.total_pages || 1)
      const results = data.results || []
      setMovies(prev => newPage === 1 ? results : [...prev, ...results.filter(m => !prev.find(p => p.id === m.id))])
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    setPage(1)
    fetchMovies(1, debouncedSearch)
  }, [debouncedSearch, fetchMovies])

  const loadMore = useCallback(() => {
    if (!canLoadMore) return
    const next = page + 1; setPage(next)
    fetchMovies(next, debouncedSearch)
  }, [canLoadMore, page, debouncedSearch, fetchMovies])

  const sentinelRef = useInfiniteScroll(loadMore, canLoadMore)

  return (
    <main className="min-h-screen bg-n-dark">
      {!isSearching && <HeroBanner movie={hero} />}

      <div className={`max-w-screen-2xl mx-auto px-4 sm:px-8 py-8 space-y-8 ${isSearching ? 'pt-24' : ''}`}>
        {!isSearching && <MoodMatcher />}

        {/* Section header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-n-red rounded-full" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {isSearching ? `Results for "${debouncedSearch}"` : 'Popular Movies'}
              </h2>
              {!loading && movies.length > 0 && (
                <p className="text-zinc-600 text-xs mt-0.5">{movies.length} films loaded</p>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="flex flex-col items-center py-20 gap-4">
            <p className="text-zinc-400">{error}</p>
            <button onClick={() => fetchMovies(1, debouncedSearch)} className="btn-red">Retry</button>
          </div>
        )}

        {!error && <MovieGrid movies={movies} loading={loading && page === 1} empty={isSearching ? `No results for "${debouncedSearch}"` : 'No movies found.'} />}

        {loading && page > 1 && (
          <div className="flex justify-center py-8">
            <svg className="w-8 h-8 animate-spin text-n-red" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        )}

        <div ref={sentinelRef} className="h-4" />

        {!loading && !canLoadMore && movies.length > 0 && (
          <p className="text-center text-zinc-700 text-sm py-4">— End of results —</p>
        )}
      </div>
    </main>
  )
}
