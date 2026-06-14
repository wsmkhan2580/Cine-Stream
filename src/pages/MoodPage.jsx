import React from 'react'
import MoodMatcher from '../components/common/MoodMatcher'

export default function MoodPage() {
  return (
    <main className="min-h-screen bg-n-dark pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-n-red rounded-full" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white"> Mood Match</h1>
            <p className="text-zinc-500 text-sm mt-1">Tell us how you feel — we'll find the perfect film</p>
          </div>
        </div>
        <MoodMatcher />
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
    <p className="text-2xl font-black text-white">AI</p>
    <p className="text-zinc-500 text-xs mt-1">Powered matching</p>
  </div>
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
    <p className="text-2xl font-black text-white">10+</p>
    <p className="text-zinc-500 text-xs mt-1">Mood options</p>
  </div>
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
    <p className="text-2xl font-black text-white">1M+</p>
    <p className="text-zinc-500 text-xs mt-1">Movies in database</p>
  </div>
</div>
      </div>
    </main>
  )
}
