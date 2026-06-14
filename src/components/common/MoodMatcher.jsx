import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { matchMood } from '../../services/aiMatcher'
import { tmdb } from '../../services/tmdb'

const CHIPS = ['Happy 😊', 'Sad 😢', 'Excited ⚡', 'Romantic 💕', 'Scared 😱', 'Inspired 🌟', 'Adventurous 🗺️', 'Nostalgic 🌅', 'Dark 🌑', 'Funny 😂']

export default function MoodMatcher() {
  const [mood, setMood] = useState('')
  const [state, setState] = useState('idle') // idle|loading|done|error
  const [result, setResult] = useState(null)
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const match = useCallback(async () => {
    if (!mood.trim()) return
    setState('loading'); setResult(null); setErr('')
    try {
      const title = await matchMood(mood.trim())
      const movie = await tmdb.byTitle(title)
      if (!movie) throw new Error(`Couldn't find "${title}"`)
      setResult({ title, movie })
      setState('done')
    } catch (e) {
      setErr(e.message); setState('error')
    }
  }, [mood])

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-5 sm:p-6">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="w-8 h-8 rounded-lg bg-n-red/10 border border-n-red/30 flex items-center justify-center">
          <SparkleIcon className="w-4 h-4 text-n-red" />
        </div>
        <div>
          <h2 className="font-bold text-white text-base">AI Mood Match</h2>
          <p className="text-zinc-500 text-xs">Describe your mood, get the perfect film</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={mood}
          onChange={e => setMood(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && match()}
          placeholder="e.g. I want something dark and suspenseful…"
          className="input-field flex-1 text-sm"
          disabled={state === 'loading'}
          maxLength={100}
        />
        <button
          onClick={match}
          disabled={!mood.trim() || state === 'loading'}
          className="btn-red px-4 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === 'loading' ? <SpinIcon className="w-4 h-4 animate-spin" /> : <SparkleIcon className="w-4 h-4" />}
          <span className="hidden sm:inline">{state === 'loading' ? 'Finding…' : 'Match'}</span>
        </button>
      </div>

      {/* Mood chips */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {CHIPS.map(c => (
          <button key={c} onClick={() => setMood(c.split(' ')[0].toLowerCase())}
            className="text-xs text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-2.5 py-1 rounded-full transition-colors">
            {c}
          </button>
        ))}
      </div>

      {/* Result */}
      {state === 'done' && result && (
        <div className="mt-4 flex items-center gap-3 p-3 bg-n-red/10 border border-n-red/20 rounded-xl animate-slide-up">
          <div className="w-10 h-14 rounded overflow-hidden flex-shrink-0 bg-zinc-800">
            {result.movie.poster_path && (
              <img src={`https://image.tmdb.org/t/p/w92${result.movie.poster_path}`} alt="" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-zinc-400 text-xs mb-0.5">Perfect for your mood:</p>
            <p className="text-white font-bold truncate">{result.title}</p>
            <p className="text-zinc-500 text-xs">{new Date(result.movie.release_date).getFullYear()} · ★ {Math.round(result.movie.vote_average * 10) / 10}</p>
          </div>
          <button onClick={() => navigate(`/movie/${result.movie.id}`)} className="btn-red text-xs px-3 py-1.5 flex-shrink-0">
            View
          </button>
        </div>
      )}

      {state === 'error' && (
        <div className="mt-3 flex items-center gap-2 p-3 bg-red-900/20 border border-red-800/30 rounded-lg text-red-400 text-sm animate-slide-up">
          <AlertIcon className="w-4 h-4 flex-shrink-0" /> {err}
        </div>
      )}
    </div>
  )
}

const SparkleIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
const SpinIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
const AlertIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
