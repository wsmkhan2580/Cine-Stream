import React, { createContext, useContext, useState, useCallback } from 'react'
import { storage } from '../utils/storage'
import { MOCK_USERS } from '../utils/constants'

const Ctx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.getAuth())

  const login = useCallback((email, password) => {
    const found = MOCK_USERS.find(u => u.email === email.toLowerCase().trim() && u.password === password)
    if (!found) throw new Error('Invalid email or password')
    const u = { email: found.email, name: found.name }
    storage.setAuth(u); setUser(u); return u
  }, [])

  const logout = useCallback(() => { storage.clearAuth(); setUser(null) }, [])

  return <Ctx.Provider value={{ user, login, logout, isAuth: !!user }}>{children}</Ctx.Provider>
}

export const useAuth = () => { const c = useContext(Ctx); if (!c) throw new Error('useAuth outside AuthProvider'); return c }
