import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { tmdb } from '../services/tmdb'
import { useInfiniteScroll } from '../hooks'
import MovieGrid from '../components/media/MovieGrid'

const CATEGORIES = {
  popular: { title: 'Popular Movies', emoji: '🔥', fn: (p) => tmdb.popular(p) },
  'top-rated': { title: 'Top Rated', emoji: '⭐', fn: (p) => tmdb.topRated(p) },
  upcoming: { title: 'Upcoming', emoji: '🎬', fn: (p) => tmdb.upcoming(p) },
  'now-playing': { title: 'Now Playing', emoji: '▶️', fn: (p) => tmdb.nowPlaying(p) },
}

export default function Browse({search}) {
  const { category = 'popular' } = useParams()
  const cat = CATEGORIES[category] || CATEGORIES.popular
  const debouncedSearch = useDebounce(search, 500)
  const isSearching = debouncedSearch.trim().length > 0
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const canLoadMore = page < totalPages && !loading

  const fetchMovies = useCallback(async (newPage = 1) => {
    setLoading(true)
    try {
      const data = await cat.fn(newPage)
      setTotalPages(data.total_pages || 1)
      const results = data.results || []
      setMovies(prev => newPage === 1 ? results : [...prev, ...results.filter(m => !prev.find(p => p.id === m.id))])
    } catch {}
    finally { setLoading(false) }
  }, [cat])

  useEffect(() => {
    setMovies([]); setPage(1)
    fetchMovies(1)
    window.scrollTo({ top: 0 })
  }, [category])

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
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{cat.emoji} {cat.title}</h1>
            {!loading && movies.length > 0 && <p className="text-zinc-500 text-sm mt-0.5">{movies.length} films loaded</p>}
          </div>
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
        {!loading && !canLoadMore && movies.length > 0 && (
          <p className="text-center text-zinc-700 text-sm py-6">— End of results —</p>
        )}
      </div>
    </main>
  )
}
