import { useMemo, useState } from 'react'
import { A2UISurfaceView } from '../components/A2UISurfaceView'
import { v0_8 } from '@a2ui/lit'

type A2uiProcessor = InstanceType<typeof v0_8.Data.A2uiMessageProcessor>
type ServerToClientMessage = Parameters<A2uiProcessor['processMessages']>[0][number]

const DEFAULT_SURFACE_ID = v0_8.Data.A2uiMessageProcessor.DEFAULT_SURFACE_ID

// CopilotKit A2UI Composer（a2ui-composer.ag-ui.com）对齐格式：
// - components：ComponentInstance[]
// - data：普通对象
/* const DEFAULT_COMPONENTS_JSON = `[
  {
    "id": "root",
    "component": {
      "Card": {
        "child": "col"
      }
    }
  },
  {
    "id": "col",
    "component": {
      "Column": {
        "children": {
          "explicitList": ["title", "table1", "table2"]
        }
      }
    }
  },
  {
    "id": "title",
    "component": {
      "Text": {
        "usageHint": "h2",
        "text": {
          "path": "/title"
        }
      }
    }
  },
  {
    "id": "table1",
    "component": {
      "table-v1": {
        "dataPath": "/rows",
        "columns": [
          { "key": "name", "label": "姓名" },
          { "key": "role", "label": "角色" },
          { "key": "score", "label": "分数" }
        ]
      }
    }
  },
  {
    "id": "table2",
    "component": {
      "table-v2": {
        "dataPath": "/rowsV2",
        "columns": [
          { "key": "name", "label": "姓名" },
          { "key": "role", "label": "角色" },
          { "key": "score", "label": "分数" }
        ]
      }
    }
  }
]` */

const DEFAULT_COMPONENTS_JSON = `[
  {
    "id": "root",
    "component": {
      "Card": {
        "child": "main-column"
      }
    }
  },
  {
    "id": "main-column",
    "component": {
      "Column": {
        "children": {
          "explicitList": [
            "header-row",
            "route-row",
            "divider",
            "times-row",
            "any-chart-1",
            "table2",
          "any-chart-2",
          "any-chart-3"
          ]
        },
        "gap": "none",
        "alignment": "stretch"
      }
    }
  },
  {
    "id": "header-row",
    "component": {
      "Row": {
        "children": {
          "explicitList": [
            "header-left",
            "date"
          ]
        },
        "distribution": "spaceBetween",
        "alignment": "center"
      }
    }
  },
  {
    "id": "header-left",
    "component": {
      "Row": {
        "children": {
          "explicitList": [
            "flight-indicator",
            "flight-number"
          ]
        },
        "gap": "small",
        "alignment": "center"
      }
    }
  },
  {
    "id": "flight-indicator",
    "component": {
      "Icon": {
        "name": {
          "literalString": "flight"
        }
      }
    }
  },
  {
    "id": "flight-number",
    "component": {
      "Text": {
        "text": {
          "path": "/flightNumber"
        },
        "usageHint": "h3"
      }
    }
  },
  {
    "id": "date",
    "component": {
      "Text": {
        "text": {
          "path": "/date"
        },
        "usageHint": "caption"
      }
    }
  },
  {
    "id": "route-row",
    "component": {
      "Row": {
        "children": {
          "explicitList": [
            "origin",
            "arrow",
            "destination"
          ]
        },
        "gap": "small",
        "alignment": "center"
      }
    }
  },
  {
    "id": "origin",
    "component": {
      "Text": {
        "text": {
          "path": "/origin"
        },
        "usageHint": "h2"
      }
    }
  },
  {
    "id": "arrow",
    "component": {
      "Text": {
        "text": {
          "literalString": "→"
        },
        "usageHint": "h2"
      }
    }
  },
  {
    "id": "destination",
    "component": {
      "Text": {
        "text": {
          "path": "/destination"
        },
        "usageHint": "h2"
      }
    }
  },
  {
    "id": "divider",
    "component": {
      "Divider": {}
    }
  },
  {
    "id": "times-row",
    "component": {
      "Row": {
        "children": {
          "explicitList": [
            "departure-col",
            "status-col",
            "arrival-col"
          ]
        },
        "distribution": "spaceBetween"
      }
    }
  },
  {
    "id": "departure-col",
    "component": {
      "Column": {
        "children": {
          "explicitList": [
            "departure-label",
            "departure-time"
          ]
        },
        "alignment": "start",
        "gap": "none"
      }
    }
  },
  {
    "id": "departure-label",
    "component": {
      "Text": {
        "text": {
          "literalString": "Departs"
        },
        "usageHint": "caption"
      }
    }
  },
  {
    "id": "departure-time",
    "component": {
      "Text": {
        "text": {
          "path": "/departureTime"
        },
        "usageHint": "h3"
      }
    }
  },
  {
    "id": "status-col",
    "component": {
      "Column": {
        "children": {
          "explicitList": [
            "status-label",
            "status-value"
          ]
        },
        "alignment": "center",
        "gap": "none"
      }
    }
  },
  {
    "id": "status-label",
    "component": {
      "Text": {
        "text": {
          "literalString": "Status"
        },
        "usageHint": "caption"
      }
    }
  },
  {
    "id": "status-value",
    "component": {
      "Text": {
        "text": {
          "path": "/status"
        },
        "usageHint": "body"
      }
    }
  },
  {
    "id": "arrival-col",
    "component": {
      "Column": {
        "children": {
          "explicitList": [
            "arrival-label",
            "arrival-time"
          ]
        },
        "alignment": "end",
        "gap": "none"
      }
    }
  },
  {
    "id": "arrival-label",
    "component": {
      "Text": {
        "text": {
          "literalString": "Arrives"
        },
        "usageHint": "caption"
      }
    }
  },
  {
    "id": "arrival-time",
    "component": {
      "Text": {
        "text": {
          "path": "/arrivalTime"
        },
        "usageHint": "h3"
      }
    }
  },
  {
   "id": "any-chart-1",
    "component": {
      "echart-any": {
        "dataPath": "/chartOption1"
      }
    }
  },
  {
    "id": "table2",
    "component": {
      "table-v2": {
        "dataPath": "/rowsV2",
        "columns": [
          { "key": "name", "label": "姓名" },
          { "key": "role", "label": "角色" },
          { "key": "score", "label": "分数" }
        ]
      }
    }
  },
  {
   "id": "any-chart-2",
    "component": {
      "echart-any": {
        "dataPath": "/chartOption2"
      }
    }
  },
  {
   "id": "any-chart-3",
    "component": {
      "echart-any": {
        "dataPath": "/chartOption3"
      }
    }
  }
]`
/* {
  "id": "surface-chart",
  "component": {
    "surface-chart": {
      "dataPath": "/surfaceOption"
    }
  }
}, */
/* const DEFAULT_DATA_JSON = `{
  "title": "Hello Table",
  "rows": [
    { "name": "Saya", "role": "Owner", "score": 98 },
    { "name": "A2UI", "role": "Renderer", "score": 92 },
    { "name": "TableV1", "role": "Custom Component", "score": 88 }
  ],
  "rowsV2": [
    { "name": "React", "role": "Framework", "score": 95 },
    { "name": "TailwindCSS", "role": "Styling", "score": 93 },
    { "name": "TableV2", "role": "React Component", "score": 90 }
  ]
}` */
/* const DEFAULT_DATA_JSON = `{
  "flightNumber": "OS 87",
  "date": "Mon, Dec 15",
  "origin": "Vienna",
  "destination": "New York",
  "departureTime": "10:15 AM",
  "status": "On Time",
  "arrivalTime": "2:30 PM",
    "surfaceOption": {
    "tooltip": {},
    "backgroundColor": "#fff",
    "visualMap": {
      "show": false,
      "dimension": 2,
      "min": -1,
      "max": 1,
      "inRange": {
        "color": [
          "#313695",
          "#4575b4",
          "#74add1",
          "#abd9e9",
          "#e0f3f8",
          "#ffffbf",
          "#fee090",
          "#fdae61",
          "#f46d43",
          "#d73027",
          "#a50026"
        ]
      }
    },
    "xAxis3D": {
      "type": "value"
    },
    "yAxis3D": {
      "type": "value"
    },
    "zAxis3D": {
      "type": "value"
    },
    "grid3D": {
      "viewControl": {}
    },
    "series": [
      {
        "type": "surface",
        "wireframe": {},
        "equation": {
          "x": {
            "step": 0.05
          },
          "y": {
            "step": 0.05
          },
          "z": "__FUNCTION__:function(x, y) { if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) { return '-'; } return Math.sin(x * Math.PI) * Math.sin(y * Math.PI); }"
        }
      }
    ]
  },
  "chartOption": {
    "tooltip": {},
    "backgroundColor": "#fff",
    "visualMap": {
      "show": false,
      "dimension": 2,
      "min": -1,
      "max": 1,
      "inRange": {
        "color": [
          "#313695",
          "#4575b4",
          "#74add1",
          "#abd9e9",
          "#e0f3f8",
          "#ffffbf",
          "#fee090",
          "#fdae61",
          "#f46d43",
          "#d73027",
          "#a50026"
        ]
      }
    },
    "xAxis3D": {
      "type": "value"
    },
    "yAxis3D": {
      "type": "value"
    },
    "zAxis3D": {
      "type": "value"
    },
    "grid3D": {
      "viewControl": {}
    },
    "series": [
      {
        "type": "surface",
        "wireframe": {},
        "equation": {
          "x": {
            "step": 0.05
          },
          "y": {
            "step": 0.05
          },
          "z": "__FUNCTION__:function(x, y) { if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) { return '-'; } return Math.sin(x * Math.PI) * Math.sin(y * Math.PI); }"
        }
      }
    ]
  },
  "rowsV2": [
    { "name": "React", "role": "Framework", "score": 95 },
    { "name": "TailwindCSS", "role": "Styling", "score": 93 },
    { "name": "TableV2", "role": "React Component", "score": 90 }
  ],
  "chartOption2": {
  "title": {
    "text": "Stacked Line"
  },
  "tooltip": {
    "trigger": "axis"
  },
  "legend": {
    "data": [
      "Email",
      "Union Ads",
      "Video Ads",
      "Direct",
      "Search Engine"
    ]
  },
  "grid": {
    "left": "3%",
    "right": "4%",
    "bottom": "3%",
    "containLabel": true
  },
  "toolbox": {
    "feature": {
      "saveAsImage": {}
    }
  },
  "xAxis": {
    "type": "category",
    "boundaryGap": false,
    "data": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "name": "Email",
      "type": "line",
      "stack": "Total",
      "data": [120, 132, 101, 134, 90, 230, 210]
    },
    {
      "name": "Union Ads",
      "type": "line",
      "stack": "Total",
      "data": [220, 182, 191, 234, 290, 330, 310]
    },
    {
      "name": "Video Ads",
      "type": "line",
      "stack": "Total",
      "data": [150, 232, 201, 154, 190, 330, 410]
    },
    {
      "name": "Direct",
      "type": "line",
      "stack": "Total",
      "data": [320, 332, 301, 334, 390, 330, 320]
    },
    {
      "name": "Search Engine",
      "type": "line",
      "stack": "Total",
      "data": [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}
}` */

const DEFAULT_DATA_JSON = `{
  "flightNumber": "OS 87",
  "date": "Mon, Dec 15",
  "origin": "Vienna",
  "destination": "New York",
  "departureTime": "10:15 AM",
  "status": "On Time",
  "arrivalTime": "2:30 PM",
  "chartOption1": {
    "title": {
      "text": "",
      "subtext": "Fake Data"
    },
    "tooltip": {
      "trigger": "axis"
    },
    "legend": {
      "data": ["Rainfall", "Evaporation"]
    },
    "toolbox": {
      "show": true,
      "feature": {
        "dataView": {
          "show": true,
          "readOnly": false
        },
        "magicType": {
          "show": true,
          "type": ["line", "bar"]
        },
        "restore": {
          "show": true
        },
        "saveAsImage": {
          "show": true
        }
      }
    },
    "calculable": true,
    "xAxis": [
      {
        "type": "category",
        "data": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    ],
    "yAxis": [
      {
        "type": "value"
      }
    ],
    "series": [
      {
        "name": "Rainfall",
        "type": "bar",
        "data": [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        "markPoint": {
          "data": [
            { "type": "max", "name": "Max" },
            { "type": "min", "name": "Min" }
          ]
        },
        "markLine": {
          "data": [
            { "type": "average", "name": "Avg" }
          ]
        }
      },
      {
        "name": "Evaporation",
        "type": "bar",
        "data": [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        "markPoint": {
          "data": [
            { "name": "Max", "value": 182.2, "xAxis": 7, "yAxis": 183 },
            { "name": "Min", "value": 2.3, "xAxis": 11, "yAxis": 3 }
          ]
        },
        "markLine": {
          "data": [
            { "type": "average", "name": "Avg" }
          ]
        }
      }
    ]
  },
  "rowsV2": [
    { "name": "React", "role": "Framework", "score": 95 },
    { "name": "TailwindCSS", "role": "Styling", "score": 93 },
    { "name": "TableV2", "role": "React Component", "score": 90 }
  ],
  "chartOption2": {
    "tooltip": {},
    "backgroundColor": "#fff",
    "visualMap": {
      "show": false,
      "dimension": 2,
      "min": -1,
      "max": 1,
      "inRange": {
        "color": [
          "#313695",
          "#4575b4",
          "#74add1",
          "#abd9e9",
          "#e0f3f8",
          "#ffffbf",
          "#fee090",
          "#fdae61",
          "#f46d43",
          "#d73027",
          "#a50026"
        ]
      }
    },
    "xAxis3D": {
      "type": "value"
    },
    "yAxis3D": {
      "type": "value"
    },
    "zAxis3D": {
      "type": "value"
    },
    "grid3D": {
      "viewControl": {}
    },
    "series": [
      {
        "type": "surface",
        "wireframe": {},
        "equation": {
          "x": {
            "step": 0.05
          },
          "y": {
            "step": 0.05
          },
          "z": "__FUNCTION__:function(x, y) { if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) { return '-'; } return Math.sin(x * Math.PI) * Math.sin(y * Math.PI); }"
        }
      }
    ]
  },
  "chartOption3": {
  "title": {
    "text": ""
  },
  "tooltip": {
    "trigger": "axis"
  },
  "legend": {
    "data": [
      "Email",
      "Union Ads",
      "Video Ads",
      "Direct",
      "Search Engine"
    ]
  },
  "grid": {
    "left": "3%",
    "right": "4%",
    "bottom": "3%",
    "containLabel": true
  },
  "toolbox": {
    "feature": {
      "saveAsImage": {}
    }
  },
  "xAxis": {
    "type": "category",
    "boundaryGap": false,
    "data": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "name": "Email",
      "type": "line",
      "stack": "Total",
      "data": [120, 132, 101, 134, 90, 230, 210]
    },
    {
      "name": "Union Ads",
      "type": "line",
      "stack": "Total",
      "data": [220, 182, 191, 234, 290, 330, 310]
    },
    {
      "name": "Video Ads",
      "type": "line",
      "stack": "Total",
      "data": [150, 232, 201, 154, 190, 330, 410]
    },
    {
      "name": "Direct",
      "type": "line",
      "stack": "Total",
      "data": [320, 332, 301, 334, 390, 330, 320]
    },
    {
      "name": "Search Engine",
      "type": "line",
      "stack": "Total",
      "data": [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}
}`

const DEFAULT_STYLES_JSON = `{
  "logoUrl": "https://alva-static.b-cdn.net/prd/avatar/2004400458097225728.jpeg"
}`

function parseJsonSafe(text: string): { value: unknown | null; error: string | null } {
  try {
    const v = JSON.parse(text)
    return { value: v, error: null }
  } catch (e) {
    return { value: null, error: e instanceof Error ? e.message : String(e) }
  }
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function isMessageLike(v: unknown): v is Record<string, unknown> {
  if (!isRecord(v)) return false
  return (
    'beginRendering' in v || 'surfaceUpdate' in v || 'dataModelUpdate' in v || 'deleteSurface' in v
  )
}

function isComponentInstanceLike(v: unknown): v is Record<string, unknown> {
  return isRecord(v) && typeof v.id === 'string' && isRecord(v.component)
}

function extractSurfaceIdFromMessages(messages: unknown[]): string | null {
  for (const m of messages) {
    if (!isRecord(m)) continue
    const begin = m.beginRendering
    if (isRecord(begin) && typeof begin.surfaceId === 'string') return begin.surfaceId
    const upd = m.surfaceUpdate
    if (isRecord(upd) && typeof upd.surfaceId === 'string') return upd.surfaceId
    const data = m.dataModelUpdate
    if (isRecord(data) && typeof data.surfaceId === 'string') return data.surfaceId
  }
  return null
}

function buildComponentMessages(
  v: unknown,
  opts: { surfaceId: string; rootId: string; styles: Record<string, unknown> },
): { messages: unknown[]; hint: string | null } {
  // 1) Google A2UI：ServerToClientMessage[]（包含 beginRendering/surfaceUpdate）
  if (Array.isArray(v)) {
    if (v.length > 0 && v.every(isMessageLike)) return { messages: v, hint: null }

    // 2) CopilotKit Composer：ComponentInstance[]
    if (v.length > 0 && v.every(isComponentInstanceLike)) {
      const ids = new Set(v.map((x) => (isRecord(x) ? String(x.id) : '')))
      const first = v[0]
      const root = ids.has(opts.rootId)
        ? opts.rootId
        : isRecord(first) && typeof first.id === 'string'
          ? first.id
          : opts.rootId

      return {
        messages: [
          { beginRendering: { surfaceId: opts.surfaceId, root, styles: opts.styles } },
          { surfaceUpdate: { surfaceId: opts.surfaceId, components: v } },
        ],
        hint:
          root === opts.rootId
            ? null
            : `未找到 rootId="${opts.rootId}"，已自动使用第一个组件 "${root}" 作为 root`,
      }
    }

    return { messages: [], hint: 'components JSON 不是可识别格式（既不是消息数组，也不是 ComponentInstance[]）' }
  }

  // 2) 单条消息（ServerToClientMessage）
  if (isMessageLike(v)) return { messages: [v], hint: null }

  // 3) 兼容一种“简化对象”：{ surfaceId, root, styles, components }
  if (isRecord(v) && typeof v.root === 'string' && Array.isArray(v.components)) {
    const surfaceId = typeof v.surfaceId === 'string' ? v.surfaceId : opts.surfaceId
    const styles = isRecord(v.styles) ? v.styles : opts.styles
    return {
      messages: [
        { beginRendering: { surfaceId, root: v.root, styles } },
        { surfaceUpdate: { surfaceId, components: v.components } },
      ],
      hint: '已把 {root, components} 自动转换为 beginRendering + surfaceUpdate',
    }
  }

  return { messages: [], hint: 'components JSON 不是可识别的官网格式' }
}

function buildDataMessages(v: unknown, surfaceId: string): { messages: unknown[]; hint: string | null } {
  // 1) 官网可能直接给 dataModelUpdate 消息（或消息数组）
  if (Array.isArray(v)) {
    if (v.length > 0 && v.every(isMessageLike)) return { messages: v, hint: null }
    // 也支持直接粘贴 ValueMap[]（官网 data.json）
    return {
      messages: [{ dataModelUpdate: { surfaceId, path: '/', contents: v } }],
      hint: null,
    }
  }

  if (isMessageLike(v)) return { messages: [v], hint: null }

  // 2) 允许直接粘贴普通对象，作为根 dataModel（path="/"）
  if (isRecord(v)) {
    return {
      messages: [{ dataModelUpdate: { surfaceId, path: '/', contents: v } }],
      hint: '已把普通对象当作根 dataModel 注入（path="/"）',
    }
  }

  return { messages: [], hint: 'data JSON 不是可识别的官网格式（建议粘贴 ValueMap[] 或 dataModelUpdate）' }
}

export function PlaygroundPage() {
  const [surfaceId, setSurfaceId] = useState(DEFAULT_SURFACE_ID)
  const [rootId, setRootId] = useState('root')
  const [stylesText, setStylesText] = useState(DEFAULT_STYLES_JSON)
  const [componentsText, setComponentsText] = useState(DEFAULT_COMPONENTS_JSON)
  const [dataText, setDataText] = useState(DEFAULT_DATA_JSON)

  const parsedStyles = useMemo(() => parseJsonSafe(stylesText), [stylesText])
  const parsedComponents = useMemo(() => parseJsonSafe(componentsText), [componentsText])
  const parsedData = useMemo(() => parseJsonSafe(dataText), [dataText])

  const compiled = useMemo(() => {
    if (parsedStyles.error) {
      return { error: `styles JSON 解析失败：${parsedStyles.error}` as string | null }
    }
    if (parsedComponents.error) {
      return { error: `components JSON 解析失败：${parsedComponents.error}` as string | null }
    }
    if (parsedData.error) {
      return { error: `data JSON 解析失败：${parsedData.error}` as string | null }
    }

    try {
      const styles = isRecord(parsedStyles.value) ? parsedStyles.value : {}

      const { messages: compMsgs, hint: compHint } = buildComponentMessages(parsedComponents.value, {
        surfaceId,
        rootId,
        styles,
      })
      const computedSurfaceId = extractSurfaceIdFromMessages(compMsgs) ?? surfaceId
      const { messages: dataMsgs, hint: dataHint } = buildDataMessages(parsedData.value, computedSurfaceId)

      if (compMsgs.length === 0) return { error: compHint ?? 'components JSON 无有效消息' }
      if (dataMsgs.length === 0) return { error: dataHint ?? 'data JSON 无有效消息' }

      const processor = new v0_8.Data.A2uiMessageProcessor()
      processor.processMessages([...compMsgs, ...dataMsgs] as ServerToClientMessage[])

      const surfaces = processor.getSurfaces()
      const surface =
        surfaces.get(computedSurfaceId) ?? (surfaces.size > 0 ? Array.from(surfaces.values())[0] : null)

      if (!surface) return { error: '未生成 surface（请确认 beginRendering/surfaceUpdate）' }

      return {
        error: null as string | null,
        surfaceId: computedSurfaceId,
        surface,
        processor,
        hint:
          compHint && dataHint
            ? `${compHint}；${dataHint}`
            : compHint
              ? compHint
              : dataHint
                ? dataHint
                : null,
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      const extra =
        msg.includes('Circular dependency for component') ?
          '（常见原因：某个 component id 恰好等于某个字符串属性值，比如 id="body" 与 usageHint="body" 冲突；把该组件 id 改个名字即可。）'
          : ''
      return { error: `${msg}${extra}` }
    }
  }, [
    parsedStyles.error,
    parsedStyles.value,
    parsedComponents.error,
    parsedComponents.value,
    parsedData.error,
    parsedData.value,
    surfaceId,
    rootId,
  ])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">输入（对齐官网格式）</div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              兼容两种“官网”：CopilotKit Composer（components 数组 + data 对象）与 Google A2UI（消息数组）
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              className="rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
              onClick={() => setComponentsText(DEFAULT_COMPONENTS_JSON)}
              type="button"
            >
              重置 components
            </button>
            <button
              className="rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
              onClick={() => setDataText(DEFAULT_DATA_JSON)}
              type="button"
            >
              重置 data
            </button>
            <button
              className="rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
              onClick={() => {
                setStylesText(DEFAULT_STYLES_JSON)
                setSurfaceId(DEFAULT_SURFACE_ID)
                setRootId('root')
              }}
              type="button"
            >
              重置 meta
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <label className="block">
              <div className="mb-1 text-xs font-semibold text-slate-700 dark:text-slate-200">surfaceId</div>
              <input
                value={surfaceId}
                onChange={(e) => setSurfaceId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-100 dark:focus:border-indigo-400/40"
              />
            </label>
            <label className="block">
              <div className="mb-1 text-xs font-semibold text-slate-700 dark:text-slate-200">rootId</div>
              <input
                value={rootId}
                onChange={(e) => setRootId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-100 dark:focus:border-indigo-400/40"
              />
            </label>
            <div />
          </div>

          <div>
            <div className="mb-2 text-xs font-semibold text-slate-700 dark:text-slate-200">styles JSON（可选）</div>
            <textarea
              value={stylesText}
              onChange={(e) => setStylesText(e.target.value)}
              spellCheck={false}
              className="h-[120px] w-full resize-none rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs leading-5 text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400/40"
            />
            {parsedStyles.error ? (
              <div className="mt-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-gray-100">
                <div className="font-semibold">styles JSON 解析失败</div>
                <div className="mt-1 break-words text-gray-600/90">{parsedStyles.error}</div>
              </div>
            ) : null}
          </div>

          <div>
            <div className="mb-2 text-xs font-semibold text-slate-700 dark:text-slate-200">components JSON</div>
            <textarea
              value={componentsText}
              onChange={(e) => setComponentsText(e.target.value)}
              spellCheck={false}
              className="h-[260px] w-full resize-none rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs leading-5 text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400/40"
            />
            {parsedComponents.error ? (
              <div className="mt-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-gray-600">
                <div className="font-semibold">components JSON 解析失败</div>
                <div className="mt-1 break-words text-gray-600/90">{parsedComponents.error}</div>
              </div>
            ) : null}
          </div>

          <div>
            <div className="mb-2 text-xs font-semibold text-slate-700 dark:text-slate-200">data JSON</div>
            <textarea
              value={dataText}
              onChange={(e) => setDataText(e.target.value)}
              spellCheck={false}
              className="h-[180px] w-full resize-none rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs leading-5 text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400/40"
            />
            {parsedData.error ? (
              <div className="mt-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-gray-600">
                <div className="font-semibold">data JSON 解析失败</div>
                <div className="mt-1 break-words text-gray-600/90">{parsedData.error}</div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
        <div className="text-sm font-semibold text-slate-900 dark:text-white">渲染预览</div>
        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          这里会渲染对应 JSON 生成的 UI（A2UI Web Components / Lit）
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/40">
          {compiled.error ? (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-gray-600">
              <div className="font-semibold">无法渲染</div>
              <div className="mt-1 break-words text-gray-600/90">{compiled.error}</div>
            </div>
          ) : (
            <a2ui-theme-provider>
              <A2UISurfaceView
                surface={compiled.surface}
                processor={compiled.processor}
                surfaceId={compiled.surfaceId}
                className="min-h-[460px] w-full overflow-auto rounded-xl bg-white p-4 ring-1 ring-slate-200 dark:bg-white/[0.02] dark:ring-white/10"
              />
            </a2ui-theme-provider>
          )}

          <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="text-slate-500 dark:text-slate-500">surfaceId：</span>
            <span className="text-slate-800 dark:text-slate-200">
              {'surfaceId' in compiled && compiled.surfaceId ? compiled.surfaceId : DEFAULT_SURFACE_ID}
            </span>
            {('hint' in compiled && compiled.hint) ? (
              <span className="ml-3">提示：{compiled.hint}</span>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}

