import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BACKDROP, POSTER } from '../../utils/constants'
import { fmtRating, fmtYear, truncate, ratingColor } from '../../utils/helpers'
import { useFavs } from '../../context/FavoritesContext'

const HeroBanner = memo(function HeroBanner({ movie }) {
  const { toggle, isFav } = useFavs()
  const navigate = useNavigate()
  if (!movie) return <div className="h-[55vh] sm:h-[75vh] skeleton" />

  const bg = BACKDROP(movie.backdrop_path, 'original')
  const fav = isFav(movie.id)

  return (
    <div className="relative h-[55vh] sm:h-[80vh] w-full overflow-hidden">
      {bg && <img src={bg} alt="" loading="eager" className="absolute inset-0 w-full h-full object-cover object-top" />}
      {/* Gradients */}
      <div className="absolute inset-0 bg-hero-left" />
      <div className="absolute inset-0 bg-hero-bottom" />
      <div className="absolute inset-0 bg-gradient-to-t from-n-dark via-n-dark/10 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-12 sm:pb-16 px-5 sm:px-12 lg:px-16 max-w-2xl animate-slide-up">
        {/* Tag */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-n-red rounded-full" />
          <span className="text-n-red text-xs font-bold uppercase tracking-widest">Featured Today</span>
        </div>

        {/* Title */}
        <h1 className="font-black text-3xl sm:text-5xl lg:text-6xl text-white text-shadow leading-tight mb-2">
          {movie.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center flex-wrap gap-3 mb-4">
          <span className={`font-bold text-sm ${ratingColor(movie.vote_average)}`}>★ {fmtRating(movie.vote_average)}</span>
          <span className="text-zinc-500">·</span>
          <span className="text-zinc-300 text-sm">{fmtYear(movie.release_date)}</span>
          <span className="text-zinc-500">·</span>
          <span className="text-zinc-400 text-xs bg-zinc-800/80 border border-zinc-700 px-2 py-0.5 rounded">HD</span>
        </div>

        {/* Overview */}
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
          {truncate(movie.overview, 180)}
        </p>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => navigate(`/movie/${movie.id}`)} className="btn-red text-base px-6 py-3">
            <InfoIcon className="w-5 h-5" /> More Info
          </button>
          <button
            onClick={() => toggle(movie)}
            className={`btn-outline text-base px-6 py-3 ${fav ? 'border-n-red text-n-red bg-n-red/10' : ''}`}
          >
            {fav ? <CheckIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
            {fav ? 'Saved' : 'My List'}
          </button>
        </div>
      </div>
    </div>
  )
})

export default HeroBanner

const InfoIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
const PlusIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
const CheckIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
