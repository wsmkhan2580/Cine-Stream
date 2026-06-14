import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-n-dark flex flex-col items-center justify-center text-center px-4">
      <div className="animate-scale-in">
        <p className="font-black text-[120px] sm:text-[180px] text-zinc-900 leading-none select-none">404</p>
        <h1 className="text-3xl font-black text-white -mt-8 mb-3">Scene Not Found</h1>
        <p className="text-zinc-500 mb-8 max-w-sm">This page was cut from the final edit.</p>
        <Link to="/" className="btn-red text-base px-8 py-3">Back to Home</Link>
      </div>
    </main>
  )
}
