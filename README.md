# 🎬 Cine-Stream v2

Netflix-inspired movie SPA — React + Vite + Tailwind CSS + TMDB API.

## Quick Start

```bash
cp .env.example .env   # add your TMDB key
npm install
npm run dev
```

## Demo Login
| Email | Password |
|---|---|
| demo@cinestream.com | demo1234 |

## Routes
| Path | Page |
|---|---|
| `/` | Home + Hero + Popular |
| `/movie/:id` | Full Movie Detail Page |
| `/browse/popular` | Popular Movies |
| `/browse/top-rated` | Top Rated |
| `/browse/upcoming` | Upcoming |
| `/genre/:id` | Genre filtered movies |
| `/mood` | AI Mood Matcher |
| `/favorites` | My List (protected) |
| `/login` | Sign In |

## Features
- Full page movie detail (`/movie/:id`) with cast, tabs, trailer link
- Netflix-style hover cards with scale animation
- Debounced search (500ms)
- Infinite scroll (IntersectionObserver)
- Favorites persisted to localStorage
- AI Mood Matcher (Claude API + fallback)
- Protected `/favorites` route
- Mobile-first responsive design
- React.memo + useCallback optimization

## Env Variables
```
VITE_TMDB_KEY=    # required — themoviedb.org/settings/api
VITE_AI_KEY=      # optional — console.anthropic.com
```
