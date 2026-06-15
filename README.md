# Cine-Stream

A Netflix-inspired movie discovery app built with React and Vite. Search for films, explore by mood using AI, and save your favorites — all in a fast, clean single-page experience.

---

## What it does

You land on a homepage with a featured film banner that changes every time. From there you can search for any movie, browse by category, or let the AI pick something based on how you're feeling.

The Mood Matcher is the most interesting part — you type something like "I want something dark and psychological" and it uses Claude (Anthropic's AI) to figure out a matching film, then pulls that film's data from TMDB. It's not a keyword search, it actually understands what you mean.

If you create an account (mock login, no backend), you can save films to your list and they'll still be there when you come back.

---

## Pages

- **Home** — Hero banner, Mood Matcher, popular movies with infinite scroll
- **Popular / Top Rated / Upcoming** — Browse by category, search works here too
- **Mood Match** — Dedicated page for AI-powered film matching
- **Favorites** — Your saved films, protected route (login required)
- **Movie Detail** — Full info for any film

---

## Tech used

- React 18 + Vite
- Tailwind CSS
- React Router v6
- TMDB API — movie data, posters, search
- Anthropic Claude API — mood to movie matching
- localStorage — favorites and login persistence

---

## Features

- Search works across all pages, not just home
- Debounced search — doesn't fire on every keystroke
- Infinite scroll on all movie grids
- Lazy loading for images
- Fully responsive, works on mobile
- Protected route for favorites using React Context
- Mood chips for quick selection (Happy, Dark, Romantic, etc.)

---
## Live

Deployed on Vercel — [cine-stream-le7r-seven.vercel.app](https://cine-stream-le7r-seven.vercel.app)

---

## Notes

Built as a learning project across three phases — basic movie grid, then search and infinite scroll, then AI integration and auth flow. Goal was to understand how a real SPA is structured, not just make something that looks good.


## Setup

```bash
git clone https://github.com/wsmkhan2580/Cine-Stream
cd Cine-Stream
npm install
npm run dev

