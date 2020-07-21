import React, { useCallback, useContext, useRef, useState } from 'react'
import { orbitalContext } from '../OrbitalWrapper'
import { useEventListener } from '../utils'

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

const DragRegion: React.FC<{ onDrag: (i: IDragInfo) => void }> = (props) => {
  const context = useContext(orbitalContext)
  const ref = useRef<HTMLDivElement>(null)

  if (!context) {
    throw new Error('invalid context')
  }

  // Turn the callbakc into a pipe
  const onDrag = useCallback(
    (x: IDragInfo) => {
      props.onDrag(x)
      return x
    },
    [props.onDrag]
  )

  const [dragInfo, setDragInfo] = useState<IDragInfo>({
    start: null,
    current: null,
    last: null
  })

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      const coords = pullEventInfo(e, ref.current!, context.radius)
      setDragInfo(
        onDrag({
          start: coords,
          current: coords,
          last: null
        })
      )
    },
    [setDragInfo, context.radius, onDrag]
  )
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragInfo.start === null) {
        return
      }

      e.preventDefault()
      setDragInfo((before) =>
        onDrag({
          ...before,
          current: pullEventInfo(e, ref.current!, context.radius)
        })
      )
    },
    [setDragInfo, dragInfo, context.radius, onDrag]
  )
  const onMouseUp = useCallback(
    (e: MouseEvent) => {
      if (dragInfo.start === null || dragInfo.current === null) {
        return
      }

      e.preventDefault()

      setDragInfo((before) =>
        onDrag({
          ...before,
          start: null,
          current: null,
          last: pullEventInfo(e, ref.current!, context.radius)
        })
      )
    },
    [setDragInfo, context.radius, onDrag]
  )

  // @ts-ignore
  useEventListener('mousedown', onMouseDown, ref)
  // @ts-ignore
  useEventListener('mouseup', onMouseUp)
  // @ts-ignore
  useEventListener('mousemove', onMouseMove)

  // @ts-ignore
  useEventListener('touchstart', onMouseDown, ref)
  // @ts-ignore
  useEventListener('touchend', onMouseUp)
  // @ts-ignore
  useEventListener('touchmove', onMouseMove)

  if (!context) {
    throw new Error('invalid context')
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
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
