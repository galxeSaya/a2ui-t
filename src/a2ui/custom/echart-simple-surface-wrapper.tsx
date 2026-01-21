import { createRoot, Root } from 'react-dom/client'
import { EchartSimpleSurface } from './echart-simple-surface'

type ProcessorLike = {
  getData: (node: unknown, relativePath: string, surfaceId?: string) => unknown
}

export class SurfaceChartElement extends HTMLElement {
  static observedAttributes = ['data-path', 'surface-id']

  private _root: Root | null = null
  private _dataPath: string | null = null
  private _data: unknown = null
  private _processor: ProcessorLike | null = null
  private _component: unknown | null = null
  private _surfaceId: string | null = null

  connectedCallback() {
    // 创建一个容器 div，不使用 Shadow DOM 以便 TailwindCSS 能正常工作
    if (!this._root) {
      const container = document.createElement('div')
      this.appendChild(container)
      this._root = createRoot(container)
      this.render()
    }
  }

  disconnectedCallback() {
    if (this._root) {
      this._root.unmount()
      this._root = null
    }
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'data-path') {
      this._dataPath = newValue
    } else if (name === 'surface-id') {
      this._surfaceId = newValue
    }
    this.render()
  }

  // Root 会自动注入这些字段（见 @a2ui/lit/ui/root.js）
  set processor(value: ProcessorLike | null) {
    this._processor = value
    this.render()
  }

  get processor(): ProcessorLike | null {
    return this._processor
  }

  set component(value: unknown | null) {
    this._component = value
    // 从 component.properties 中提取 dataPath
    if (value && typeof value === 'object' && 'properties' in value) {
      const props = (value as { properties?: Record<string, unknown> }).properties
      if (props) {
        if ('dataPath' in props && typeof props.dataPath === 'string') {
          this._dataPath = props.dataPath
        }
        // 如果直接传入了 data（option），也提取出来
        if ('data' in props) {
          this._data = props.data
        }
      }
    }
    this.render()
  }

  get component(): unknown | null {
    return this._component
  }

  set dataPath(value: string | null) {
    this._dataPath = value
    this.render()
  }

  get dataPath(): string | null {
    return this._dataPath
  }

  set data(value: unknown) {
    this._data = value
    this.render()
  }

  get data(): unknown {
    return this._data
  }

  private render() {
    if (!this._root) return

    this._root.render(
      <EchartSimpleSurface
        dataPath={this._dataPath}
        data={this._data}
        processor={this._processor}
        component={this._component}
        surfaceId={this._surfaceId}
      />,
    )
  }
}

if (!customElements.get('surface-chart')) {
  customElements.define('surface-chart', SurfaceChartElement)
}
