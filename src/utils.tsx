import { useRef, useState, useCallback, useEffect } from 'react'

export const useDatetime = () => {
  const ref = useRef<NodeJS.Timeout>()
  const [datetime, setDatetime] = useState(new Date())

  const ticker = useCallback(
    () =>
      setInterval(() => {
        setDatetime(new Date())
      }, 1000),
    []
  )

  useEffect(() => {
    if (!ref.current) {
      ref.current = ticker()
    }
    return () => clearInterval(ref.current!)
  }, [])

  return datetime
}

export function uniq<T>(xs: T[]): T[] {
  const s = new Set<T>(xs)
  const r: T[] = []
  s.forEach((x) => r.push(x))
  return r
}
