// 1) 注册 A2UI 的 Web Components（a2ui-surface / a2ui-card / a2ui-text ...）
import '@a2ui/lit/ui'

// 2) 提供一个最小 Theme Provider，避免组件 consume themeContext 时拿到 undefined
import { ContextProvider } from '@lit/context'
import { html, LitElement } from 'lit'

import { Context } from '@a2ui/lit/ui'
import { defaultA2uiTheme } from './theme'

export class A2UIThemeProvider extends LitElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  #provider = new ContextProvider(this, Context.themeContext, defaultA2uiTheme)

  render() {
    return html`<slot></slot>`
  }
}

if (!customElements.get('a2ui-theme-provider')) {
  customElements.define('a2ui-theme-provider', A2UIThemeProvider)
}
