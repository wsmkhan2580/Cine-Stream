import React, { memo } from 'react'
import MovieCard from './MovieCard'

const MovieGrid = memo(function MovieGrid({ movies, loading, empty = 'No movies found.' }) {
  if (!loading && movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
        <div className="text-6xl mb-4">🎬</div>
        <p className="text-zinc-400 text-lg font-medium">{empty}</p>
        <p className="text-zinc-600 text-sm mt-1">Try a different search or browse popular films</p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3">
      {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      {loading && Array.from({ length: 14 }, (_, i) => (
        <div key={`sk${i}`} className="aspect-[2/3] rounded-md skeleton" />
      ))}
    </div>
  )
})

export default MovieGrid
