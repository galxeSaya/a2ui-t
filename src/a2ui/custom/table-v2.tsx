import { useMemo } from 'react'
import { v0_8 } from '@a2ui/lit'

type Column = {
  key: string
  label?: string
  width?: number | string
}

type ProcessorLike = {
  getData: (node: unknown, relativePath: string, surfaceId?: string) => unknown
}

type TableV2Props = {
  columns: Column[] | null
  dataPath: string | null
  data: unknown
  processor: ProcessorLike | null
  component: unknown | null
  surfaceId: string | null
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function toRowObject(row: unknown): Record<string, unknown> {
  if (row instanceof Map) return Object.fromEntries(row.entries())
  if (isRecord(row)) return row
  return {}
}

function normalizeRows(v: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(v)) return v.map(toRowObject)
  if (v instanceof Map) return Array.from(v.entries()).map(([k, val]) => ({ key: k, value: val }))
  if (isRecord(v)) return [v]
  return []
}

export function TableV2(props: TableV2Props) {
  const { columns, dataPath, data, processor, component, surfaceId } = props

  const rows = useMemo(() => {
    if (data !== null && data !== undefined) {
      return normalizeRows(data)
    }
    if (dataPath && processor && component) {
      const sid = surfaceId ?? v0_8.Data.A2uiMessageProcessor.DEFAULT_SURFACE_ID
      const v = processor.getData(component, dataPath, sid)
      return normalizeRows(v)
    }
    return []
  }, [data, dataPath, processor, component, surfaceId])

  const cols = useMemo<Column[]>(() => {
    if (columns && Array.isArray(columns) && columns.length > 0) return columns
    const first = rows[0] ?? {}
    return Object.keys(first).map((k) => ({ key: k, label: k }))
  }, [columns, rows])

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-50/80 to-cyan-50/80 px-3 py-2.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:from-indigo-950/40 dark:to-cyan-950/40 dark:text-slate-200">
        table-v2 (React + TailwindCSS)
      </div>
      {rows.length === 0 ? (
        <div className="px-3 py-3.5 text-xs text-slate-500 dark:text-slate-400">
          暂无数据（请在 data 里提供数组，或设置 dataPath 指向数组）
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
                {cols.map((c) => (
                  <th
                    key={c.key}
                    className="px-3 py-2.5 text-left font-semibold text-slate-700 whitespace-nowrap dark:text-slate-200"
                    style={c.width ? { width: String(c.width) } : undefined}
                  >
                    {c.label ?? c.key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-100 hover:bg-indigo-50/30 dark:border-slate-800 dark:hover:bg-indigo-950/20"
                >
                  {cols.map((c) => (
                    <td
                      key={c.key}
                      className="px-3 py-2.5 text-slate-700 align-top dark:text-slate-300"
                    >
                      {String(r[c.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
