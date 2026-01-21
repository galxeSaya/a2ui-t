import { useEffect, useMemo, useRef, useState } from 'react'
import type { TVBar } from './tv-data'
import { v0_8 } from '@a2ui/lit'

type ProcessorLike = {
  getData: (node: unknown, relativePath: string, surfaceId?: string) => unknown
}

type TVChartProps = {
  dataPath: string | null
  data: unknown
  processor: ProcessorLike | null
  component: unknown | null
  surfaceId: string | null
}

type TradingViewWidgetParams = {
  symbol: string
  interval: string
  // TradingView 支持通过 container_id 或直接传入 DOM 节点，此处同时保留
  container_id?: string
  container?: HTMLElement
  datafeed: unknown
  library_path?: string
  locale?: string
  autosize?: boolean
  timezone?: string
  studies_overrides?: Record<string, unknown>
  overrides?: Record<string, unknown>
  disabled_features?: string[]
  enabled_features?: string[]
}

type TVGlobal = typeof window & {
  TradingView?: {
    widget: new (opts: TradingViewWidgetParams) => { remove: () => void }
  }
}

function toBars(raw: unknown): TVBar[] {
  if (Array.isArray(raw)) {
    return raw
      .map((item) => {
        if (!item || typeof item !== 'object') return null
        const obj = item as Record<string, unknown>
        // TradingView 需要毫秒级时间戳，入参可能是秒或毫秒，这里统一转换为毫秒
        const rawTime = typeof obj.time === 'number' ? obj.time : Date.parse(String(obj.time ?? ''))
        const timeMs = Number.isFinite(rawTime) ? rawTime : Date.parse(String(obj.time ?? ''))
        // 如果时间戳小于这个值，说明是秒级，需要转换为毫秒
        const time =
          Number.isFinite(timeMs) && timeMs < 10_000_000_000
            ? Math.floor(timeMs * 1000) // 秒 -> 毫秒
            : Math.floor(Number(timeMs))
        const open = Number(obj.open)
        const high = Number(obj.high)
        const low = Number(obj.low)
        const close = Number(obj.close)
        const volume = Number(obj.volume ?? 0)
        if (!Number.isFinite(time) || !Number.isFinite(open) || !Number.isFinite(high) || !Number.isFinite(low) || !Number.isFinite(close)) {
          return null
        }
        return { time, open, high, low, close, volume }
      })
      .filter(Boolean) as TVBar[]
  }
  return []
}

// Minimal datafeed for static data
function createDatafeed(bars: TVBar[]) {
  const sorted = [...bars].sort((a, b) => a.time - b.time)
  // 记录已返回的数据时间戳，避免重复返回
  const returnedTimes = new Set<number>()
  
  // TradingView 期望的字段：time 为毫秒级时间戳，volume 可选
  const normalize = (b: TVBar) => ({
    time: Math.floor(b.time), // 确保是整数毫秒
    open: b.open,
    high: b.high,
    low: b.low,
    close: b.close,
    volume: b.volume ?? 0,
  })
  return {
    onReady(cb: (arg: unknown) => void) {
      setTimeout(() => cb({ supports_time: true, supports_search: false, supports_group_request: false, supported_resolutions: ['1D'] }), 0)
    },
    resolveSymbol(_symbol: string, onResolve: (sym: unknown) => void, onError: (err: string) => void) {
      try {
        onResolve({
          name: 'LOCAL',
          ticker: 'LOCAL',
          type: 'stock',
          session: '24x7',
          timezone: 'Etc/UTC',
          exchange: 'LOCAL',
          minmov: 1,
          pricescale: 100,
          has_intraday: false,
          has_weekly_and_monthly: true,
          supported_resolutions: ['1D'],
        })
      } catch (e) {
        onError(String(e))
      }
    },
    getBars(
      _symbolInfo: unknown,
      _resolution: unknown,
      periodParams: { from: number; to: number; firstDataRequest?: boolean },
      onHistoryCallback: (bars: TVBar[], meta?: { noData: boolean; nextTime?: number }) => void,
      onErrorCallback: (err: string) => void,
    ) {
      try {
        // periodParams.from 和 to 是秒级时间戳，需要转换为毫秒来与 bar.time（毫秒）比较
        const fromMs = periodParams.from * 1000
        const toMs = periodParams.to * 1000
        
        // 如果时间戳为负数，直接返回 noData
        if (fromMs < 0 || toMs < 0) {
          onHistoryCallback([], { noData: true })
          return
        }
        
        // 过滤出在时间范围内且未返回过的数据
        const filtered = sorted.filter((b) => {
          return b.time >= fromMs && b.time <= toMs && !returnedTimes.has(b.time)
        })
        
        // 如果没有找到新数据，返回 noData
        if (!filtered.length) {
          onHistoryCallback([], { noData: true })
          return
        }
        
        // 标记这些数据为已返回
        filtered.forEach((b) => returnedTimes.add(b.time))
        
        onHistoryCallback(filtered.map(normalize), { noData: false })
      } catch (e) {
        onErrorCallback(String(e))
      }
    },
    subscribeBars() {
      // static data: no live updates
    },
    unsubscribeBars() {
      // noop
    },
  }
}

// 动态加载 TradingView 库
function loadTradingViewLibrary(): Promise<void> {
  return new Promise((resolve, reject) => {
    const tv = (window as TVGlobal).TradingView
    if (tv && tv.widget) {
      resolve()
      return
    }

    // 检查是否已经在加载
    if (document.querySelector('script[data-tradingview-loading]')) {
      const checkInterval = setInterval(() => {
        const loaded = (window as TVGlobal).TradingView
        if (loaded && loaded.widget) {
          clearInterval(checkInterval)
          resolve()
        }
      }, 100)
      setTimeout(() => {
        clearInterval(checkInterval)
        reject(new Error('TradingView library load timeout'))
      }, 10000)
      return
    }

    // 加载 TradingView 库（仅本地路径，使用 BASE_URL 前缀）
    const script = document.createElement('script')
    script.setAttribute('data-tradingview-loading', 'true')
    const meta = import.meta as unknown as { env?: { BASE_URL?: string } }
    const base = meta.env?.BASE_URL || '/'
    const normalizedBase = String(base).endsWith('/') ? String(base).slice(0, -1) : String(base)
    script.src = `${normalizedBase}/tradingview/charting_library/charting_library.js`
    script.onload = () => {
      script.removeAttribute('data-tradingview-loading')
      // 等待 TradingView 全局对象可用
      const checkInterval = setInterval(() => {
        const loaded = (window as TVGlobal).TradingView
        if (loaded && loaded.widget) {
          clearInterval(checkInterval)
          resolve()
        }
      }, 100)
      setTimeout(() => {
        clearInterval(checkInterval)
        reject(new Error('TradingView widget not available after script load'))
      }, 10000)
    }
    script.onerror = () => {
      script.removeAttribute('data-tradingview-loading')
      reject(new Error('Failed to load TradingView library'))
    }
    document.head.appendChild(script)
  })
}

export function TVChart(props: TVChartProps) {
  const { dataPath, data, processor, component, surfaceId } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<{ remove: () => void } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const meta = import.meta as unknown as { env?: { BASE_URL?: string } }
  const base = meta.env?.BASE_URL || '/'
  const normalizedBase = String(base).endsWith('/') ? String(base).slice(0, -1) : String(base)

  const bars = useMemo(() => {
    let src: unknown = data
    if ((src === null || src === undefined) && dataPath && processor && component) {
      const sid = surfaceId ?? v0_8.Data.A2uiMessageProcessor.DEFAULT_SURFACE_ID
      src = processor.getData(component, dataPath, sid)
    }
    const parsed = toBars(src)
    return parsed
  }, [data, dataPath, processor, component, surfaceId])

  useEffect(() => {
    if (!containerRef.current) return

    let mounted = true

    loadTradingViewLibrary()
      .then(() => {
        if (!mounted || !containerRef.current) return

        const tv = (window as TVGlobal).TradingView
        if (!tv || !tv.widget) {
          setError('TradingView widget not available')
          return
        }

        if (widgetRef.current) {
          widgetRef.current.remove()
          widgetRef.current = null
        }

        const datafeed = createDatafeed(bars)
        try {
          widgetRef.current = new tv.widget({
            symbol: 'LOCAL',
            interval: '1D',
            container: containerRef.current,
            datafeed,
            library_path: `${normalizedBase}/tradingview/charting_library/`,
            locale: 'en',
            autosize: true,
            timezone: 'Etc/UTC',
            disabled_features: ['header_symbol_search', 'timeframes_toolbar'],
          })
          setError(null)
        } catch (e) {
          setError(`Failed to create widget: ${e instanceof Error ? e.message : String(e)}`)
        }
      })
      .catch((e) => {
        if (mounted) {
          setError(`Failed to load TradingView: ${e instanceof Error ? e.message : String(e)}`)
        }
      })

    return () => {
      mounted = false
      if (widgetRef.current) {
        widgetRef.current.remove()
        widgetRef.current = null
      }
    }
  }, [bars])

  return (
    <div className="w-full min-h-[320px] h-[320px]">
      <div ref={containerRef} className="w-full h-full min-h-[320px]" />
      {error && (
        <div className="p-4 text-red-600 text-sm">
          TradingView Error: {error}
        </div>
      )}
    </div>
  )
}
