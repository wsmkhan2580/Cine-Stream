import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useFavs } from '../../context/FavoritesContext'

export default function Navbar({ search, setSearch }) {
  const { user, logout, isAuth } = useAuth()
  const { count } = useFavs()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const loc = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  useEffect(() => { setMenuOpen(false); setProfileOpen(false) }, [loc.pathname])

  const handleLogout = () => { logout(); navigate('/'); setProfileOpen(false) }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/browse/popular', label: 'Popular' },
    { to: '/browse/top-rated', label: 'Top Rated' },
    { to: '/browse/upcoming', label: 'Upcoming' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_40px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent'
      }`}>
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-10 h-[68px] flex items-center gap-3">

          {/* ── Logo ── */}
          <Link to="/" className="flex-shrink-0 mr-3 flex items-center select-none group">
            <span className="font-black text-[#E50914] text-[22px] sm:text-[25px] tracking-tight leading-none
              drop-shadow-[0_0_14px_rgba(229,9,20,0.55)] group-hover:drop-shadow-[0_0_20px_rgba(229,9,20,0.8)]
              transition-all duration-300">CINE</span>
            <span className="w-[1.5px] h-[18px] mx-1.5 bg-gradient-to-b from-transparent via-white/30 to-transparent rounded-full" />
            <span className="font-semibold text-white text-[22px] sm:text-[25px] tracking-[0.1em] leading-none
              group-hover:text-zinc-100 transition-colors duration-300">STREAM</span>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex items-center">
            {navLinks.map(({ to, label }) => {
              const isActive = to === '/' ? loc.pathname === '/' : loc.pathname.includes(to.split('/').pop())
              return (
                <Link
                  key={to}
                  to={to}
                  className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-200 rounded-md group
                    ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`}
                >
                  {label}
                  <span className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full
                    bg-gradient-to-r from-[#E50914] to-[#ff4d4d]
                    transition-all duration-300 origin-left
                    ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100'}`}
                  />
                </Link>
              )
            })}
          </div>

          <div className="flex-1" />

          {/* ── Search desktop ── */}
          <div className="hidden sm:flex items-center">
            <div className={`flex items-center gap-2.5 overflow-hidden transition-all duration-300 rounded-lg
              ${searchOpen || search
                ? 'w-56 bg-white/5 border border-white/10 px-3.5 py-2 focus-within:border-white/20 focus-within:bg-white/8'
                : 'w-9 justify-center'
              }`}>
              <button
                onClick={() => setSearchOpen(true)}
                className="text-zinc-400 hover:text-white transition-colors flex-shrink-0"
              >
                <SearchIcon className="w-[17px] h-[17px]" />
              </button>
              {(searchOpen || search) && (
                <>
                  <input
                    ref={searchRef}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Titles, genres, moods…"
                    className="bg-transparent text-white text-[13px] outline-none w-full placeholder-zinc-600 min-w-0"
                  />
                  {search && (
                    <button onClick={() => { setSearch(''); setSearchOpen(false) }} className="text-zinc-600 hover:text-white transition-colors flex-shrink-0">
                      <XIcon className="w-3.5 h-3.5" />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ── Favorites ── */}
          <Link
            to="/favorites"
            className="hidden sm:flex items-center justify-center w-9 h-9 text-zinc-500 hover:text-white
              transition-all duration-200 rounded-lg hover:bg-white/5 relative"
          >
            <HeartIcon className="w-[17px] h-[17px]" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-[#E50914] rounded-full
                text-white text-[9px] flex items-center justify-center font-bold px-1
                shadow-[0_0_10px_rgba(229,9,20,0.7)] border border-[#0a0a0a]">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>

          {/* ── Auth desktop ── */}
          <div className="hidden sm:block">
            {isAuth ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(o => !o)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-lg hover:bg-white/5 transition-all duration-200 group"
                >
                  <div className="w-[30px] h-[30px] rounded-md bg-gradient-to-br from-[#E50914] to-[#9b040e]
                    flex items-center justify-center font-bold text-[13px] text-white
                    shadow-[0_0_12px_rgba(229,9,20,0.35)]">
                    {user.name[0].toUpperCase()}
                  </div>
                  <span className="text-[13px] text-zinc-400 group-hover:text-zinc-200 transition-colors hidden lg:block font-medium">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronIcon className={`w-3 h-3 text-zinc-600 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-[52px] w-52 bg-[#111111]/98 backdrop-blur-2xl
                    border border-white/[0.08] rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.9)]
                    py-1 z-50 animate-slide-down">
                    <div className="px-4 py-3 border-b border-white/[0.06]">
                      <p className="font-semibold text-[13px] text-white leading-tight">{user.name}</p>
                      <p className="text-[11px] text-zinc-600 truncate mt-0.5">{user.email}</p>
                    </div>
                    <div className="py-1.5">
                      <DropdownLink to="/favorites" icon={<HeartIcon className="w-[15px] h-[15px]" />} onClick={() => setProfileOpen(false)}>
                        My List
                        {count > 0 && (
                          <span className="ml-auto text-[10px] bg-[#E50914]/15 text-[#E50914] px-2 py-0.5 rounded-full font-semibold">
                            {count}
                          </span>
                        )}
                      </DropdownLink>
                      <DropdownLink to="/mood" icon={<SparkleIcon className="w-[15px] h-[15px]" />} onClick={() => setProfileOpen(false)}>
                        Mood Match
                      </DropdownLink>
                    </div>
                    <div className="border-t border-white/[0.06] py-1.5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#E50914]/80
                          hover:text-[#E50914] hover:bg-[#E50914]/5 transition-all duration-150"
                      >
                        <LogoutIcon className="w-[15px] h-[15px]" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 bg-[#E50914] hover:bg-[#cc0812] text-white text-[13px]
                  font-semibold px-5 py-2.5 rounded-lg transition-all duration-200
                  shadow-[0_4px_16px_rgba(229,9,20,0.35)] hover:shadow-[0_4px_24px_rgba(229,9,20,0.55)]
                  hover:-translate-y-px active:translate-y-0 active:shadow-none"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* ── Mobile controls ── */}
          <div className="flex sm:hidden items-center gap-1">
            <button
              onClick={() => setSearchOpen(o => !o)}
              className="p-2 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
            {!isAuth && (
              <Link
                to="/login"
                className="bg-[#E50914] text-white text-[11px] font-bold px-3.5 py-2 rounded-lg
                  shadow-[0_2px_10px_rgba(229,9,20,0.4)] tracking-wide"
              >
                Sign In
              </Link>
            )}
            {isAuth && (
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#E50914] to-[#9b040e]
                flex items-center justify-center font-bold text-[13px] text-white
                shadow-[0_0_10px_rgba(229,9,20,0.3)]">
                {user.name[0].toUpperCase()}
              </div>
            )}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="p-2 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              {menuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile search bar ── */}
        {searchOpen && (
          <div className="sm:hidden px-4 pb-3 animate-slide-down">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 gap-3">
              <SearchIcon className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              <input
                ref={searchRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search movies…"
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-zinc-600 min-w-0"
              />
              {search && (
                <button onClick={() => { setSearch(''); setSearchOpen(false) }} className="text-zinc-600 hover:text-white">
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Mobile menu ── */}
        {menuOpen && (
          <div className="sm:hidden border-t border-white/[0.06] bg-[#0a0a0a]/98 backdrop-blur-2xl animate-slide-down">
            <div className="px-4 py-3 flex flex-col gap-0.5">
              {[
                { to: '/', label: 'Home', emoji: '🏠' },
                { to: '/browse/popular', label: 'Popular', emoji: '🔥' },
                { to: '/browse/top-rated', label: 'Top Rated', emoji: '⭐' },
                { to: '/browse/upcoming', label: 'Upcoming', emoji: '🎬' },
                { to: '/favorites', label: count > 0 ? `My List  (${count})` : 'My List', emoji: '❤️' },
                { to: '/mood', label: 'Mood Match', emoji: '✨' },
              ].map(({ to, label, emoji }) => (
                <MobileLink key={to} to={to} label={label} emoji={emoji} onClick={() => setMenuOpen(false)} />
              ))}
              {isAuth && (
                <button
                  onClick={handleLogout}
                  className="text-left px-4 py-3 text-sm text-[#E50914]/70 hover:text-[#E50914]
                    hover:bg-[#E50914]/5 rounded-xl transition-colors mt-1
                    border-t border-white/[0.06] pt-4"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Click outside to close profile dropdown */}
      {profileOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
      )}
    </>
  )
}

function DropdownLink({ to, icon, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-zinc-400
        hover:text-white hover:bg-white/5 transition-all duration-150"
    >
      <span className="text-zinc-600">{icon}</span>
      {children}
    </Link>
  )
}

function MobileLink({ to, label, emoji, onClick }) {
  const loc = useLocation()
  const isActive = to === '/' ? loc.pathname === '/' : loc.pathname.startsWith(to)
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium transition-all duration-150
        ${isActive
          ? 'bg-white/[0.06] text-white'
          : 'text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200'
        }`}
    >
      <span className="text-base w-5 text-center">{emoji}</span>
      {label}
      {isActive && <span className="ml-auto w-1 h-4 rounded-full bg-[#E50914] shadow-[0_0_6px_rgba(229,9,20,0.8)]" />}
    </Link>
  )
}

const SearchIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
const XIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
const HeartIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
const ChevronIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
const MenuIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
const LogoutIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
const SparkleIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>