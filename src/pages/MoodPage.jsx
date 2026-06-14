import React from 'react'
import MoodMatcher from '../components/common/MoodMatcher'

export default function MoodPage() {
  return (
    <main className="min-h-screen bg-n-dark pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-n-red rounded-full" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">✨ Mood Match</h1>
            <p className="text-zinc-500 text-sm mt-1">Tell us how you feel — we'll find the perfect film</p>
          </div>
        </div>
        <MoodMatcher />
      </div>
    </main>
  )
}
