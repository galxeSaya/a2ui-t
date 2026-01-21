import { useEffect, useMemo, useRef } from 'react'
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import 'echarts-gl'
import { v0_8 } from '@a2ui/lit'

type ProcessorLike = {
  getData: (node: unknown, relativePath: string, surfaceId?: string) => unknown
}

type EchartSimpleSurfaceProps = {
  dataPath: string | null
  data: unknown
  processor: ProcessorLike | null
  component: unknown | null
  surfaceId: string | null
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export function EchartSimpleSurface(props: EchartSimpleSurfaceProps) {
  const { dataPath, data, processor, component, surfaceId } = props
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)

  // 递归处理函数字符串，将字符串转换为函数
  // 支持两种格式：
  // 1. "__FUNCTION__:function(x, y) { return ... }" - 完整函数
  // 2. "__FUNCTION__:(x, y) => ..." - 箭头函数
  const processFunctions = (obj: unknown): unknown => {
    if (typeof obj === 'string' && obj.startsWith('__FUNCTION__:')) {
      // 提取函数体
      const funcBody = obj.replace('__FUNCTION__:', '').trim()
      try {
        // 使用 new Function 创建函数
        // 如果是箭头函数，直接执行；如果是 function 声明，需要 return
        if (funcBody.startsWith('function') || funcBody.startsWith('(')) {
          return new Function('return ' + funcBody)()
        }
        return new Function('return ' + funcBody)()
      } catch (e) {
        console.warn('Failed to parse function:', e, 'Function body:', funcBody)
        return obj
      }
    }
    if (Array.isArray(obj)) {
      return obj.map(processFunctions)
    }
    if (isRecord(obj)) {
      const result: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(obj)) {
        result[key] = processFunctions(value)
      }
      return result
    }
    return obj
  }

  // 使用 useMemo 计算 option
  const option = useMemo((): EChartsOption | null => {
    let opt: unknown = null

    // 优先使用直接传入的 data
    if (data !== null && data !== undefined) {
      opt = data
    }
    // 其次尝试从 dataPath 获取
    else if (dataPath && processor && component) {
      const sid = surfaceId ?? v0_8.Data.A2uiMessageProcessor.DEFAULT_SURFACE_ID
      opt = processor.getData(component, dataPath, sid)
    }

    // 验证 option 是否为有效对象
    if (isRecord(opt)) {
      // 处理函数字符串
      const processed = processFunctions(opt)
      return processed as EChartsOption
    }

    return null
  }, [data, dataPath, processor, component, surfaceId])

  useEffect(() => {
    if (!chartRef.current) return

    // 如果图表实例已存在，先销毁
    if (chartInstanceRef.current) {
      chartInstanceRef.current.dispose()
      chartInstanceRef.current = null
    }

    // 创建新的图表实例
    chartInstanceRef.current = echarts.init(chartRef.current)

    // 设置配置
    if (option) {
      chartInstanceRef.current.setOption(option)
    }

    // 监听窗口大小变化，自动调整图表大小
    const handleResize = () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.resize()
      }
    }
    window.addEventListener('resize', handleResize)

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize)
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose()
        chartInstanceRef.current = null
      }
    }
  }, []) // 只在组件挂载时初始化

  // 当 option 变化时，更新图表
  useEffect(() => {
    if (chartInstanceRef.current && option) {
      chartInstanceRef.current.setOption(option, true)
    }
  }, [option])

  return (
    <div className="w-full">
      <div ref={chartRef} className="w-full min-h-[300px]" />
    </div>
  )
}
