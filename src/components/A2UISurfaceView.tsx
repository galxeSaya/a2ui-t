import { useEffect, useRef } from 'react'

type A2UIRootEl = HTMLElement & {
  childComponents?: unknown
  surfaceId?: unknown
  processor?: unknown
  enableCustomElements?: boolean
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function getLogoUrl(surface: unknown): string | null {
  if (!isRecord(surface)) return null
  const styles = surface.styles
  if (!isRecord(styles)) return null
  return typeof styles.logoUrl === 'string' ? styles.logoUrl : null
}

function getComponentTree(surface: unknown): unknown | null {
  if (!isRecord(surface)) return null
  if (!('componentTree' in surface)) return null
  return (surface as Record<string, unknown>).componentTree ?? null
}

// 注入样式到 shadow-root 内的 h3 元素
function injectH3Styles() {
  // 查找所有 a2ui-text 元素
  const textElements = document.querySelectorAll('a2ui-text')
  
  textElements.forEach((textEl) => {
    // 检查是否有 shadowRoot（open 模式）
    const shadowRoot = (textEl as HTMLElement & { shadowRoot?: ShadowRoot }).shadowRoot
    if (!shadowRoot) return
    
    // 检查是否已经注入过样式
    if (shadowRoot.querySelector('style[data-h3-margin-fix]')) return
    
    // 创建样式元素
    const style = document.createElement('style')
    style.setAttribute('data-h3-margin-fix', 'true')
    style.textContent = `
      section h1,
      section h2,
      section h3,
      section h4,
      section h5,
      section h6,
      section p {
        margin: 0 !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }
    `
    shadowRoot.appendChild(style)
  })
}

export function A2UISurfaceView(props: {
  surface: unknown | null
  surfaceId?: string | null
  processor?: unknown | null
  className?: string
}) {
  const { surface, surfaceId = null, processor = null, className } = props
  const ref = useRef<A2UIRootEl | null>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.surfaceId = surfaceId
    ref.current.processor = processor
    ref.current.childComponents = surface ? [getComponentTree(surface)] : null
    ref.current.enableCustomElements = true
    
    // 等待组件渲染后注入样式
    const timer = setTimeout(() => {
      injectH3Styles()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [surface, surfaceId, processor])
  
  // 使用 MutationObserver 监听 DOM 变化，当新的 a2ui-text 元素添加时注入样式
  useEffect(() => {
    if (!ref.current) return
    
    const observer = new MutationObserver(() => {
      injectH3Styles()
    })
    
    observer.observe(ref.current, {
      childList: true,
      subtree: true,
    })
    
    return () => observer.disconnect()
  }, [])

  const logoUrl = surface ? getLogoUrl(surface) : null

  return (
    <div className={className}>
      {logoUrl ? (
        <div className="mb-4 flex justify-center">
          <img src={logoUrl} className="h-10 w-auto opacity-90" />
        </div>
      ) : null}
      <a2ui-root ref={ref} />
    </div>
  )
}

