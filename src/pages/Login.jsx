import React, { useState, useCallback } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, isAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  if (isAuth) { navigate(from, { replace: true }); return null }

  const handleSubmit = async (e) => {
    e?.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true); setError('')
    try { login(email, password); navigate(from, { replace: true }) }
    catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-n-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* BG blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-n-red/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-n-red/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm animate-scale-in">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-10">
          <span className="font-black text-n-red text-4xl tracking-tighter">CINE</span>
          <span className="font-thin text-white text-4xl tracking-widest">STREAM</span>
        </Link>

        <div className="bg-zinc-900/90 backdrop-blur border border-zinc-800 rounded-2xl p-7 shadow-2xl">
          <h1 className="text-2xl font-black text-white mb-1">Sign In</h1>
          <p className="text-zinc-500 text-sm mb-6">Access your saved list and features.</p>

          {/* Demo hint */}
          <button
            onClick={() => { setEmail('demo@cinestream.com'); setPassword('demo1234'); setError('') }}
            className="w-full mb-5 flex items-center gap-3 p-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl transition-colors text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-n-red flex items-center justify-center text-white font-bold text-sm flex-shrink-0">A</div>
            <div>
              <p className="text-white text-sm font-semibold">Use Demo Account</p>
              <p className="text-zinc-500 text-xs">demo@cinestream.com</p>
            </div>
            <ArrowIcon className="w-4 h-4 text-zinc-600 group-hover:text-white ml-auto transition-colors" />
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-600 text-xs">or enter manually</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" className="input-field" autoComplete="email" disabled={loading} />
            </div>
            <div>
              <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" className="input-field pr-10" autoComplete="current-password" disabled={loading} />
                <button type="button" onClick={() => setShowPass(s => !s)} tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-800/40 rounded-lg text-red-400 text-sm animate-slide-up">
                <AlertIcon className="w-4 h-4 flex-shrink-0" /> {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="btn-red w-full justify-center py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {loading ? <><SpinIcon className="w-4 h-4 animate-spin" /> Signing in…</> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-zinc-600 text-xs mt-5">Demo project — no real accounts needed</p>
        </div>

        <Link to="/" className="block text-center mt-5 text-zinc-500 hover:text-white text-sm transition-colors">
          ← Back to browsing
        </Link>
      </div>
    </div>
  )
}

const ArrowIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
const AlertIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
const EyeIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
const EyeOffIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
const SpinIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
