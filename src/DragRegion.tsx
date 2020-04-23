import React, {
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect
} from 'react'
import { orbitalContext } from './OrbitalWrapper'
import { useEventListener } from './utils'

export interface IDragInfo {
  start: {
    x: number
    y: number
  } | null
  current: {
    x: number
    y: number
  } | null
  last: {
    x: number
    y: number
  } | null
}

const pullEventInfo = (
  e: MouseEvent | TouchEvent,
  inside: HTMLElement,
  radius: number
) => {
  const { left, top } = inside.getBoundingClientRect()

  // @ts-ignore: I'd expect this to work, TODO: figure out a way to handle the union
  const event = e.changedTouches ? e.changedTouches[0] : e
  const x = event.clientX - left - radius
  const y = event.clientY - top - radius
  return { x, y }
}

const DragRegion: React.FC<{ onDrag: (i: IDragInfo) => void }> = ({
  onDrag
}) => {
  const context = useContext(orbitalContext)
  const ref = useRef<HTMLDivElement>(null)

  if (!context) {
    throw new Error('invalid context')
  }

  const [dragInfo, setDragInfo] = useState<IDragInfo>({
    start: null,
    current: null,
    last: null
  })

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      const coords = pullEventInfo(e, ref.current!, context.radius)
      setDragInfo({
        start: coords,
        current: coords,
        last: null
      })
    },
    [setDragInfo, context.radius]
  )
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragInfo.start === null) {
        return
      }

      e.preventDefault()
      setDragInfo((before) => ({
        ...before,
        current: pullEventInfo(e, ref.current!, context.radius)
      }))
    },
    [setDragInfo, dragInfo, context.radius]
  )
  const onMouseUp = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()

      setDragInfo((before) => ({
        ...before,
        start: null,
        current: null,
        last: pullEventInfo(e, ref.current!, context.radius)
      }))
    },
    [setDragInfo, context.radius]
  )

  useEffect(() => {
    if (
      dragInfo.start !== null ||
      dragInfo.current ||
      null ||
      dragInfo.last !== null
    ) {
      onDrag(dragInfo)
    }
  }, [dragInfo, onDrag])

  useEventListener('mousedown', onMouseDown, ref)
  useEventListener('mouseup', onMouseUp, ref)
  useEventListener('mousemove', onMouseMove, ref)

  useEventListener('touchstart', onMouseDown, ref)
  useEventListener('touchend', onMouseUp, ref)
  useEventListener('touchmove', onMouseMove, ref)

  if (!context) {
    throw new Error('invalid context')
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(140, 0, 0, 0.2)',
        position: 'absolute',
        left: 0,
        top: 0,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%'
      }}
      ref={ref}
    />
  )
}
export default DragRegion
