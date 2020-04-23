import {
  useRef,
  useState,
  useCallback,
  useEffect
  //  useLayoutEffect
} from 'react'

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

// export const useAnimation = (
//   easingName = 'linear',
//   duration = 500,
//   delay = 0,
//   start: number,
//   target: number
// ) => {
//   // https://usehooks.com/useAnimation/

//   // The useAnimationTimer hook calls useState every animation frame ...
//   // ... giving us elapsed time and causing a rerender as frequently ...
//   // ... as possible for a smooth animation.
//   const elapsed = useAnimationTimer((start !== target) ?duration : 0, delay)
//   // Amount of specified duration elapsed on a scale from 0 - 1
//   const n = Math.min(1, elapsed / duration)
//   // Return altered value based on our specified easing function
//   return easing[easingName](n)
// }

// const useAnimationTimer = (duration = 1000, delay = 0) => {
//   const [elapsed, setElapsed] = useState(0)

//   useLayoutEffect(() => {
//     let started: number | null = null
//     let finished: boolean = false
//     let delayTimeout: NodeJS.Timeout | null = null
//     let finishTimeout: NodeJS.Timeout | null = null

//     const onFinish = () => {
//       finished = true
//     }

//     const onStart = () => {
//       started = performance.now()
//       finishTimeout = setTimeout(onFinish, duration)
//     }

//     const onFrame: FrameRequestCallback = (time: number) => {
//       setElapsed(time - started!)
//       if (!finished) {
//         requestAnimationFrame(onFrame)
//       }
//     }

//     delayTimeout = setTimeout(onStart, delay)

//     return () => {
//       delayTimeout ? clearTimeout(delayTimeout) : null
//       finishTimeout ? clearTimeout(finishTimeout) : null
//     }
//   }, [duration, delay])

//   return elapsed
// }

// // Some easing functions copied from:
// // https://github.com/streamich/ts-easing/blob/master/src/index.ts
// // Hardcode here or pull in a dependency
// const easing: { [key: string]: (n: number) => number } = {
//   linear: (n) => n,
//   elastic: (n) =>
//     n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
//   inExpo: (n) => Math.pow(2, 10 * (n - 1))
// }
