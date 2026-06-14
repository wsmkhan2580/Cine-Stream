import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useFavs } from '../context/FavoritesContext'
import { useAuth } from '../context/AuthContext'
import MovieGrid from '../components/media/MovieGrid'

export default function Favorites() {
  const { favs } = useFavs()
  const { user } = useAuth()

  return (
    <main className="min-h-screen bg-n-dark pt-24 pb-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-n-red rounded-full" />
          <div>
            <p className="text-n-red text-xs font-bold uppercase tracking-widest mb-0.5">
              {user?.name}'s Collection
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-white">My List</h1>
            <p className="text-zinc-500 text-sm mt-0.5">
              {favs.length === 0 ? 'No films saved yet' : `${favs.length} film${favs.length !== 1 ? 's' : ''} saved`}
            </p>
          </div>
        </div>

        {/* Empty state */}
        {favs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
              <HeartIcon className="w-12 h-12 text-zinc-700" />
            </div>
            <h2 className="text-white text-xl font-bold mb-2">Your list is empty</h2>
            <p className="text-zinc-500 text-sm mb-8 max-w-xs">
              Browse movies and tap the ❤️ to save films you want to watch.
            </p>
            <Link to="/" className="btn-red">Browse Movies</Link>
          </div>
        )}

        {/* Grid */}
        {favs.length > 0 && <MovieGrid movies={favs} loading={false} />}
      </div>
    </main>
  )
}

const HeartIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
