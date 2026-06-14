import { AI_KEY } from '../utils/constants'

const FALLBACK = {
  happy: 'The Grand Budapest Hotel', sad: 'Eternal Sunshine of the Spotless Mind',
  excited: 'Mad Max: Fury Road', scared: 'Get Out', romantic: 'La La Land',
  nostalgic: 'Stand by Me', angry: 'John Wick', inspired: 'The Pursuit of Happyness',
  adventurous: 'Raiders of the Lost Ark', bored: 'Inception', anxious: 'The Social Network',
  lonely: 'Cast Away', hopeful: 'The Shawshank Redemption', funny: 'Superbad',
  tense: 'No Country for Old Men', relaxed: 'My Neighbor Totoro', dark: 'Blade Runner 2049',
  action: 'Mad Max: Fury Road', comedy: 'Superbad', horror: 'Get Out',
  fantasy: 'Spirited Away', family: 'Home Alone', love: 'La La Land',
}

export async function matchMood(mood) {
  if (AI_KEY) {
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': AI_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 60,
          system: 'You are a movie expert. Given a mood, respond with ONLY one movie title. No quotes, no explanation.',
          messages: [{ role: 'user', content: `Mood: ${mood}` }]
        })
      })
      if (r.ok) {
        const d = await r.json()
        const title = d.content?.[0]?.text?.trim()
        if (title) return title
      }
    } catch {}
  }
  const low = mood.toLowerCase()
  for (const [k, v] of Object.entries(FALLBACK)) { if (low.includes(k)) return v }
  const vals = Object.values(FALLBACK)
  return vals[Math.floor(Math.random() * vals.length)]
}
