import { TMDB_BASE, TMDB_KEY } from '../utils/constants'

async function req(path, params = {}) {
  if (!TMDB_KEY) throw new Error('TMDB API key missing. Add VITE_TMDB_KEY to .env')
  const url = new URL(`${TMDB_BASE}${path}`)
  url.searchParams.set('api_key', TMDB_KEY)
  url.searchParams.set('language', 'en-US')
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const r = await fetch(url)
  if (!r.ok) throw new Error(`TMDB ${r.status}`)
  return r.json()
}

export const tmdb = {
  popular: (page = 1) => req('/movie/popular', { page }),
  trending: () => req('/trending/movie/week'),
  nowPlaying: (page = 1) => req('/movie/now_playing', { page }),
  topRated: (page = 1) => req('/movie/top_rated', { page }),
  upcoming: (page = 1) => req('/movie/upcoming', { page }),
  search: (q, page = 1) => q.trim() ? req('/search/movie', { query: q.trim(), page, include_adult: false }) : Promise.resolve({ results: [], total_pages: 0 }),
  details: (id) => req(`/movie/${id}`, { append_to_response: 'credits,videos,similar,recommendations' }),
  byTitle: async (title) => { const d = await tmdb.search(title); return d.results?.[0] || null },
  discover: (genre, page = 1) => req('/discover/movie', { with_genres: genre, sort_by: 'popularity.desc', page }),
  person: (id) => req(`/person/${id}`, { append_to_response: 'movie_credits' }),
}
