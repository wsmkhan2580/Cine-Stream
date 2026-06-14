export const TMDB_BASE = 'https://api.themoviedb.org/3'
export const IMG_BASE = 'https://image.tmdb.org/t/p'
export const TMDB_KEY = import.meta.env.VITE_TMDB_KEY
export const AI_KEY = import.meta.env.VITE_AI_KEY

export const POSTER = (p, w = 'w342') => p ? `${IMG_BASE}/${w}${p}` : '/no-poster.svg'
export const BACKDROP = (p, w = 'w1280') => p ? `${IMG_BASE}/${w}${p}` : null

export const GENRES = {
  28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',
  99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
  27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',
  53:'Thriller',10752:'War',37:'Western'
}

export const MOCK_USERS = [
  { email: 'demo@cinestream.com', password: 'demo1234', name: 'Alex Rivera' },
  { email: 'test@cinestream.com', password: 'test1234', name: 'Jordan Lee' },
]
