// 1) 注册 A2UI 的 Web Components（a2ui-surface / a2ui-card / a2ui-text ...）
import '@a2ui/lit/ui'
import './custom/table-v1'
import './custom/table-v2-wrapper.tsx'
import './custom/echart-simple-surface-wrapper.tsx'
import './custom/echart-any-wrapper.tsx'

// 2) 初始化调色板（必须在组件使用前初始化）
import { applyA2uiDefaultPalette } from './palette'

// 初始化调色板（默认浅色模式，会在 main.tsx 中根据用户偏好更新）
// 这确保了 A2UI 组件在首次渲染时就有正确的 CSS 变量
if (typeof document !== 'undefined') {
  const savedMode = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const scheme = savedMode === 'dark' ? 'dark' : savedMode === 'system' ? (prefersDark ? 'dark' : 'light') : 'light'
  applyA2uiDefaultPalette(scheme)
}

// 3) 提供一个最小 Theme Provider，避免组件 consume themeContext 时拿到 undefined
import { ContextProvider } from '@lit/context'
import { html, LitElement } from 'lit'

import { Context } from '@a2ui/lit/ui'
import { defaultA2uiTheme } from './theme'

export class A2UIThemeProvider extends LitElement {
  // ContextProvider 会在构造函数中自动提供主题，即使不直接使用也是必要的
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly #provider = new ContextProvider(this, Context.themeContext, defaultA2uiTheme as any)

  render() {
    // 标记私有字段为已使用，避免 lint 报未使用
    void this.#provider
    return html`<slot></slot>`
  }
}

if (!customElements.get('a2ui-theme-provider')) {
  customElements.define('a2ui-theme-provider', A2UIThemeProvider)
}
