export const fmtRating = r => Math.round((r || 0) * 10) / 10
export const fmtYear = d => d ? new Date(d).getFullYear() : 'N/A'
export const fmtRuntime = m => { if (!m) return ''; const h = Math.floor(m/60), mn = m%60; return h ? `${h}h ${mn}m` : `${mn}m` }
export const fmtVotes = v => v >= 1000 ? `${(v/1000).toFixed(1)}k` : v
export const truncate = (s, n = 150) => s?.length > n ? s.slice(0, n).trimEnd() + '…' : (s || '')
export const ratingColor = r => r >= 7.5 ? 'text-green-400' : r >= 6 ? 'text-yellow-400' : 'text-red-400'
export const ratingBg = r => r >= 7.5 ? 'bg-green-500/20 text-green-400 border-green-500/30' : r >= 6 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
