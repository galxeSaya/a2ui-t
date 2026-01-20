import { useEffect, useRef } from 'react'

type A2UISurfaceEl = HTMLElement & {
  surface?: unknown
  surfaceId?: unknown
  processor?: unknown
}

export function A2UISurfaceView(props: {
  surface: unknown | null
  surfaceId?: string | null
  processor?: unknown | null
  className?: string
}) {
  const { surface, surfaceId = null, processor = null, className } = props
  const ref = useRef<A2UISurfaceEl | null>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.surface = surface
    ref.current.surfaceId = surfaceId
    ref.current.processor = processor
  }, [surface, surfaceId, processor])

  return <a2ui-surface ref={ref} className={className} />
}

