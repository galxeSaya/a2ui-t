import { useEffect, useMemo, useRef } from 'react'
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import 'echarts-gl'
import { v0_8 } from '@a2ui/lit'

type ProcessorLike = {
  getData: (node: unknown, relativePath: string, surfaceId?: string) => unknown
}

type EchartAnyProps = {
  dataPath: string | null
  data: unknown
  processor: ProcessorLike | null
  component: unknown | null
  surfaceId: string | null
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export function EchartAny(props: EchartAnyProps) {
  const { dataPath, data, processor, component, surfaceId } = props
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)

  // 递归处理函数字符串，将字符串转换为函数
  // 支持两种格式：
  // 1. "__FUNCTION__:function(x){ return ... }"
  // 2. "__FUNCTION__:(x)=>{ ... }"
  const processFunctions = (obj: unknown): unknown => {
    if (typeof obj === 'string' && obj.startsWith('__FUNCTION__:')) {
      const funcBody = obj.replace('__FUNCTION__:', '').trim()
      try {
        return new Function('return ' + funcBody)()
      } catch (e) {
        console.warn('Failed to parse function:', e, 'Function body:', funcBody)
        return obj
      }
    }
    if (Array.isArray(obj)) return obj.map(processFunctions)
    if (isRecord(obj)) {
      const result: Record<string, unknown> = {}
      for (const [k, v] of Object.entries(obj)) {
        result[k] = processFunctions(v)
      }
      return result
    }
    return obj
  }

  // 计算 option
  const option = useMemo((): EChartsOption | null => {
    let opt: unknown = null

    if (data !== null && data !== undefined) {
      opt = data
    } else if (dataPath && processor && component) {
      const sid = surfaceId ?? v0_8.Data.A2uiMessageProcessor.DEFAULT_SURFACE_ID
      opt = processor.getData(component, dataPath, sid)
    }

    if (isRecord(opt)) {
      return processFunctions(opt) as EChartsOption
    }

    return null
  }, [data, dataPath, processor, component, surfaceId])

  // 初始化
  useEffect(() => {
    if (!chartRef.current) return

    if (chartInstanceRef.current) {
      chartInstanceRef.current.dispose()
      chartInstanceRef.current = null
    }

    chartInstanceRef.current = echarts.init(chartRef.current)

    if (option) {
      chartInstanceRef.current.setOption(option)
    }

    const handleResize = () => {
      if (chartInstanceRef.current) chartInstanceRef.current.resize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose()
        chartInstanceRef.current = null
      }
    }
  }, []) // mount

  // 更新
  useEffect(() => {
    if (chartInstanceRef.current && option) {
      chartInstanceRef.current.setOption(option, true)
    }
  }, [option])

  return (
    <div className="w-full">
      <div ref={chartRef} className="w-full min-h-[320px]" />
    </div>
  )
}
