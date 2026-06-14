import React, { memo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { POSTER } from '../../utils/constants'
import { fmtRating, fmtYear, ratingColor } from '../../utils/helpers'
import { useFavs } from '../../context/FavoritesContext'

const MovieCard = memo(function MovieCard({ movie }) {
  const { toggle, isFav } = useFavs()
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const fav = isFav(movie.id)

  const goDetail = useCallback(() => navigate(`/movie/${movie.id}`), [navigate, movie.id])
  const onFav = useCallback(e => { e.stopPropagation(); toggle(movie) }, [toggle, movie])

  return (
    <div
      onClick={goDetail}
      className="group relative aspect-[2/3] rounded-md overflow-hidden cursor-pointer bg-zinc-900
        transition-all duration-300 ease-out
        hover:scale-105 hover:z-20 hover:shadow-2xl hover:shadow-black/80
        focus-visible:outline-2 focus-visible:outline-n-red"
      tabIndex={0}
      role="button"
      onKeyDown={e => e.key === 'Enter' && goDetail()}
      aria-label={movie.title}
    >
      {/* Skeleton */}
      {!loaded && <div className="absolute inset-0 skeleton" />}

      {/* Poster */}
      <img
        src={POSTER(movie.poster_path)}
        alt={movie.title}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-card-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Bottom info — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="font-bold text-sm text-white line-clamp-2 leading-tight mb-1">{movie.title}</p>
        <div className="flex items-center gap-2 text-xs">
          <span className={`font-bold ${ratingColor(movie.vote_average)}`}>
            ★ {fmtRating(movie.vote_average)}
          </span>
          <span className="text-white/50">·</span>
          <span className="text-white/60">{fmtYear(movie.release_date)}</span>
        </div>
      </div>

      {/* Top badges */}
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className={`text-xs font-bold px-1.5 py-0.5 rounded border ${ratingColor(movie.vote_average)} bg-black/70 border-current/30`}>
          {fmtRating(movie.vote_average)}
        </span>
      </div>

      {/* Fav button */}
      <button
        onClick={onFav}
        className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg
          ${fav
            ? 'bg-n-red text-white opacity-100'
            : 'bg-black/70 text-white/70 opacity-0 group-hover:opacity-100 hover:bg-n-red hover:text-white'
          }`}
        aria-label={fav ? 'Remove from list' : 'Add to list'}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* "New" badge for recent movies */}
      {fmtYear(movie.release_date) >= 2024 && (
        <div className="absolute top-0 left-0">
          <div className="bg-n-red text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br">NEW</div>
        </div>
      )}
    </div>
  )
})

export default MovieCard
