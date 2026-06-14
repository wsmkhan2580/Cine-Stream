import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { tmdb } from '../../services/tmdb'
import { BACKDROP, POSTER, GENRES } from '../../utils/constants'
import { fmtRating, fmtYear, fmtRuntime, fmtVotes, ratingColor, ratingBg } from '../../utils/helpers'
import { useFavs } from '../../context/FavoritesContext'
import MovieCard from './MovieCard'

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggle, isFav } = useFavs()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    setLoading(true); setError(null); setMovie(null)
    window.scrollTo({ top: 0 })
    tmdb.details(id)
      .then(setMovie)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <DetailSkeleton />
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-zinc-400">{error}</p>
      <button onClick={() => navigate(-1)} className="btn-red">Go Back</button>
    </div>
  )
  if (!movie) return null

  const fav = isFav(movie.id)
  const bg = BACKDROP(movie.backdrop_path, 'original')
  const poster = POSTER(movie.poster_path, 'w500')
  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  const directors = movie.credits?.crew?.filter(c => c.job === 'Director').slice(0, 3) || []
  const writers = movie.credits?.crew?.filter(c => ['Writer', 'Screenplay', 'Story'].includes(c.job)).slice(0, 3) || []
  const cast = movie.credits?.cast?.slice(0, 12) || []
  const similar = [...(movie.recommendations?.results || []), ...(movie.similar?.results || [])].slice(0, 12)
  const genres = movie.genres || []

  return (
    <div className="min-h-screen bg-n-dark">
      {/* Backdrop hero */}
      <div className="relative h-[50vh] sm:h-[65vh] overflow-hidden">
        {bg && <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover object-top" loading="eager" />}
        <div className="absolute inset-0 bg-gradient-to-r from-n-dark via-n-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-n-dark via-transparent to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-20 left-4 sm:left-8 z-10 flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 px-3 py-2 rounded-lg transition-all"
        >
          <ArrowLeftIcon className="w-4 h-4" /> Back
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 -mt-32 sm:-mt-48 relative z-10 pb-16">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">

          {/* Poster */}
          <div className="flex-shrink-0 w-36 sm:w-52 lg:w-64 mx-auto sm:mx-0">
            <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10">
              <img src={poster} alt={movie.title} className="w-full" loading="eager" />
            </div>
            {/* Actions under poster */}
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => toggle(movie)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all ${fav ? 'bg-white text-n-dark hover:bg-zinc-200' : 'btn-red'}`}
              >
                {fav ? <><CheckIcon className="w-4 h-4" /> Saved</> : <><PlusIcon className="w-4 h-4" /> Add to List</>}
              </button>
              {trailer && (
                <a
                  href={`https://youtube.com/watch?v=${trailer.key}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 transition-all"
                >
                  <PlayIcon className="w-4 h-4 text-n-red" /> Watch Trailer
                </a>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Title & tagline */}
            <div className="mb-4">
              <h1 className="font-black text-2xl sm:text-4xl lg:text-5xl text-white leading-tight">
                {movie.title}
              </h1>
              {movie.original_title !== movie.title && (
                <p className="text-zinc-500 text-sm mt-1">{movie.original_title}</p>
              )}
              {movie.tagline && (
                <p className="text-zinc-400 text-sm sm:text-base italic mt-2">"{movie.tagline}"</p>
              )}
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className={`flex items-center gap-1.5 text-sm font-bold px-2.5 py-1 rounded-lg border ${ratingBg(movie.vote_average)}`}>
                <StarIcon className="w-4 h-4" /> {fmtRating(movie.vote_average)}
                <span className="font-normal text-xs opacity-70">({fmtVotes(movie.vote_count)})</span>
              </div>
              <span className="text-zinc-400 text-sm">{fmtYear(movie.release_date)}</span>
              {movie.runtime > 0 && <span className="text-zinc-400 text-sm">{fmtRuntime(movie.runtime)}</span>}
              {movie.status && <span className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 px-2 py-0.5 rounded">{movie.status}</span>}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-5">
              {genres.map(g => (
                <Link key={g.id} to={`/genre/${g.id}`} className="genre-badge hover:bg-n-red/20 transition-colors">
                  {g.name}
                </Link>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-zinc-800 mb-5">
              {['overview', 'cast', 'details'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${
                    activeTab === tab
                      ? 'text-white border-n-red'
                      : 'text-zinc-500 border-transparent hover:text-zinc-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="animate-fade-in">
              {activeTab === 'overview' && (
                <div className="space-y-5">
                  <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">{movie.overview}</p>
                  {directors.length > 0 && (
                    <InfoRow label="Director" value={directors.map(d => d.name).join(', ')} />
                  )}
                  {writers.length > 0 && (
                    <InfoRow label="Writers" value={writers.map(w => w.name).join(', ')} />
                  )}
                </div>
              )}

              {activeTab === 'cast' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cast.map(c => <CastCard key={c.id} person={c} />)}
                  {cast.length === 0 && <p className="text-zinc-500 text-sm col-span-full">No cast information available.</p>}
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-3">
                  <InfoRow label="Release Date" value={movie.release_date} />
                  <InfoRow label="Runtime" value={fmtRuntime(movie.runtime)} />
                  <InfoRow label="Language" value={movie.original_language?.toUpperCase()} />
                  <InfoRow label="Budget" value={movie.budget > 0 ? `$${(movie.budget / 1e6).toFixed(0)}M` : 'N/A'} />
                  <InfoRow label="Revenue" value={movie.revenue > 0 ? `$${(movie.revenue / 1e6).toFixed(0)}M` : 'N/A'} />
                  {movie.production_companies?.slice(0, 3).length > 0 && (
                    <InfoRow label="Studio" value={movie.production_companies.slice(0, 3).map(c => c.name).join(', ')} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-n-red rounded-full" />
              <h2 className="section-title mb-0">More Like This</h2>
            </div>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
              {similar.map(m => <MovieCard key={m.id} movie={m} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  if (!value || value === 'N/A' || value === '$0M') return null
  return (
    <div className="flex gap-3">
      <span className="text-zinc-500 text-sm w-28 flex-shrink-0">{label}</span>
      <span className="text-zinc-200 text-sm">{value}</span>
    </div>
  )
}

function CastCard({ person }) {
  return (
    <div className="flex items-center gap-2.5 bg-zinc-900 rounded-lg p-2.5 border border-zinc-800 hover:border-zinc-600 transition-colors">
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-zinc-800">
        {person.profile_path
          ? <img src={POSTER(person.profile_path, 'w92')} alt={person.name} loading="lazy" className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-zinc-600 font-bold text-sm">{person.name[0]}</div>
        }
      </div>
      <div className="min-w-0">
        <p className="text-white text-xs font-semibold truncate">{person.name}</p>
        <p className="text-zinc-500 text-xs truncate">{person.character}</p>
      </div>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-n-dark">
      <div className="h-[50vh] sm:h-[65vh] skeleton" />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 -mt-32 relative z-10 pb-16">
        <div className="flex gap-8">
          <div className="w-52 h-72 rounded-xl skeleton flex-shrink-0" />
          <div className="flex-1 space-y-4 pt-20">
            <div className="h-10 skeleton rounded w-2/3" />
            <div className="h-5 skeleton rounded w-1/3" />
            <div className="h-4 skeleton rounded w-full" />
            <div className="h-4 skeleton rounded w-4/5" />
            <div className="h-4 skeleton rounded w-3/5" />
          </div>
        </div>
      </div>
    </div>
  )
}

const ArrowLeftIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
const PlayIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
const PlusIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
const CheckIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
const StarIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
