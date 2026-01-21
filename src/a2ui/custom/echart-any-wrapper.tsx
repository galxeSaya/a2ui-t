import { createRoot, Root } from 'react-dom/client'
import { EchartAny } from './echart-any'

type ProcessorLike = {
  getData: (node: unknown, relativePath: string, surfaceId?: string) => unknown
}

export class EchartAnyElement extends HTMLElement {
  static observedAttributes = ['data-path', 'surface-id']

  private _root: Root | null = null
  private _dataPath: string | null = null
  private _data: unknown = null
  private _processor: ProcessorLike | null = null
  private _component: unknown | null = null
  private _surfaceId: string | null = null

  connectedCallback() {
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

  set processor(value: ProcessorLike | null) {
    this._processor = value
    this.render()
  }
  get processor(): ProcessorLike | null {
    return this._processor
  }

  set component(value: unknown | null) {
    this._component = value
    if (value && typeof value === 'object' && 'properties' in value) {
      const props = (value as { properties?: Record<string, unknown> }).properties
      if (props) {
        if ('dataPath' in props && typeof props.dataPath === 'string') this._dataPath = props.dataPath
        if ('data' in props) this._data = props.data
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
      <EchartAny
        dataPath={this._dataPath}
        data={this._data}
        processor={this._processor}
        component={this._component}
        surfaceId={this._surfaceId}
      />,
    )
  }
}

if (!customElements.get('echart-any')) {
  customElements.define('echart-any', EchartAnyElement)
}
