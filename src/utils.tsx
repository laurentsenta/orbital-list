import {
  useRef,
  useState,
  useCallback,
  useEffect
  //  useLayoutEffect
} from 'react'

const pow = Math.pow

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
  ref?: React.RefObject<HTMLElement>
) {
  // https://usehooks.com/useEventListener/
  // remember to use "useCallback" on your handler.

  useEffect(() => {
    const current = ref ? ref.current : window

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
  }, [eventName, ref?.current, handler])
}

export const toRadians = (deg: number) => {
  return deg * (Math.PI / 180)
}

export const toDeg = (radians: number) => {
  return radians * (180 / Math.PI)
}

// Some easing functions copied from:
// https://github.com/streamich/ts-easing/blob/master/src/index.ts
// Hardcode here or pull in a dependency
const easing: { [key: string]: (n: number) => number } = {
  linear: (n) => n,
  elastic: (n) =>
    n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: (n) => Math.pow(2, 10 * (n - 1)),
  easeOutBack: (n: number): number => {
    const c1 = 1.70158
    const c3 = c1 + 1

    return 1 + c3 * pow(n - 1, 3) + c1 * pow(n - 1, 2)
  }
}

export const useEasedState = (
  value: number,
  duration = 500,
  easingName = 'linear'
): [number, (x: number) => void, (x: number) => void] => {
  const [current, setCurrent] = useState(value)
  const [target, setTargetInternal] = useState<null | {
    value: number
    at: number
  }>(null)
  const [elapsed, setElapsed] = useState(0)

  const n = Math.min(1, elapsed / duration)
  const eased = easing[easingName](n)
  const activeValue = current + (target ? eased * (target.value - current) : 0)

  const reset = useCallback(
    (value: number) => {
      setCurrent(value)
      setTargetInternal(null)
      setElapsed(0)
    },
    [setCurrent, setTargetInternal, setElapsed]
  )

  const setTarget = useCallback(
    (value: number) => {
      setCurrent(activeValue)
      setTargetInternal({ value, at: performance.now() })
      setElapsed(0)
    },
    [setTargetInternal, activeValue]
  )

  useEffect(() => {
    if (!target) {
      return
    }

    let raf: any = null

    const onFrame: FrameRequestCallback = (time: number) => {
      if (!target) {
        return
      }

      const elapsed = time - target.at
      setElapsed(elapsed)
      if (elapsed < duration) {
        raf = requestAnimationFrame(onFrame)
      }
    }

    raf = requestAnimationFrame(onFrame)

    return () => cancelAnimationFrame(raf)
  }, [target, setElapsed, duration])

  return [activeValue, setTarget, reset]
}
