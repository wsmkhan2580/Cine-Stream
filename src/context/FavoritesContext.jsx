import React, { createContext, useContext, useState, useCallback } from 'react'
import { storage } from '../utils/storage'

const Ctx = createContext(null)

export function FavoritesProvider({ children }) {
  const [favs, setFavs] = useState(() => storage.getFavs())

  const toggle = useCallback((movie) => {
    setFavs(prev => {
      const exists = prev.find(m => m.id === movie.id)
      const next = exists ? prev.filter(m => m.id !== movie.id) : [...prev, movie]
      storage.setFavs(next); return next
    })
  }, [])

  const isFav = useCallback((id) => favs.some(m => m.id === id), [favs])

  return <Ctx.Provider value={{ favs, toggle, isFav, count: favs.length }}>{children}</Ctx.Provider>
}

export const useFavs = () => { const c = useContext(Ctx); if (!c) throw new Error('useFavs outside FavoritesProvider'); return c }
