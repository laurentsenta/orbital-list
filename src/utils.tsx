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

export function useEventListener(
  eventName: string,
  handler: EventListener,
  ref: React.RefObject<HTMLElement>
) {
  // https://usehooks.com/useEventListener/
  // remember to use "useCallback" on your handler.

  useEffect(() => {
    const { current } = ref

    if (!current) {
      console.warn('ref current not set!')
      return
    }

    const isSupported = current.addEventListener
    if (!isSupported) {
      throw new Error('event listener not supported')
    }

    current.addEventListener(eventName, handler)

    return () => {
      current.removeEventListener(eventName, handler)
    }
  }, [eventName, ref.current, handler])
}

export const toRadians = (deg: number) => {
  return deg * (Math.PI / 180)
}

export const toDeg = (radians: number) => {
  return radians * (180 / Math.PI)
}
