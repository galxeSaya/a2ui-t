import { createRoot, Root } from 'react-dom/client'
import { TableV2 } from './table-v2'

type Column = {
  key: string
  label?: string
  width?: number | string
}

type ProcessorLike = {
  getData: (node: unknown, relativePath: string, surfaceId?: string) => unknown
}

export class TableV2Element extends HTMLElement {
  static observedAttributes = ['data-path', 'surface-id']

  private _root: Root | null = null
  private _columns: Column[] | null = null
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
    // 从 component.properties 中提取 columns 和 dataPath
    if (value && typeof value === 'object' && 'properties' in value) {
      const props = (value as { properties?: Record<string, unknown> }).properties
      if (props) {
        if ('columns' in props) {
          this._columns = props.columns as Column[] | null
        }
        if ('dataPath' in props && typeof props.dataPath === 'string') {
          this._dataPath = props.dataPath
        }
      }
    }
    this.render()
  }

  get component(): unknown | null {
    return this._component
  }

  set columns(value: Column[] | null) {
    this._columns = value
    this.render()
  }

  get columns(): Column[] | null {
    return this._columns
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
      <TableV2
        columns={this._columns}
        dataPath={this._dataPath}
        data={this._data}
        processor={this._processor}
        component={this._component}
        surfaceId={this._surfaceId}
      />,
    )
  }
}

if (!customElements.get('table-v2')) {
  customElements.define('table-v2', TableV2Element)
}
