import { useState, useEffect, useRef, useCallback } from 'react'

export function useDebounce(value, delay = 500) {
  const [dv, setDv] = useState(value)
  useEffect(() => { const t = setTimeout(() => setDv(value), delay); return () => clearTimeout(t) }, [value, delay])
  return dv
}

export function useInfiniteScroll(onLoad, enabled = true) {
  const ref = useRef(null)
  const cb = useCallback(entries => { if (entries[0]?.isIntersecting && enabled) onLoad() }, [onLoad, enabled])
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(cb, { rootMargin: '300px' })
    obs.observe(el); return () => obs.disconnect()
  }, [cb])
  return ref
}
