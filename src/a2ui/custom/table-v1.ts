import { css, html, LitElement } from 'lit'
import { v0_8 } from '@a2ui/lit'

type Column = {
  key: string
  label?: string
  width?: number | string
}

type ProcessorLike = {
  getData: (node: unknown, relativePath: string, surfaceId?: string) => unknown
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

export class TableV1Element extends LitElement {
  static properties = {
    columns: { attribute: false },
    dataPath: { type: String },
    data: { attribute: false },
    // Root 会自动注入这些字段（见 @a2ui/lit/ui/root.js）
    processor: { attribute: false },
    component: { attribute: false },
    surfaceId: { type: String },
  }

  declare columns: Column[] | null
  declare dataPath: string | null
  declare data: unknown
  declare processor: ProcessorLike | null
  declare component: unknown | null
  declare surfaceId: string | null

  constructor() {
    super()
    this.columns = null
    this.dataPath = null
    this.data = null
    this.processor = null
    this.component = null
    this.surfaceId = null
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .wrap {
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid light-dark(var(--n-80), var(--n-20));
      background: light-dark(var(--n-100), var(--n-5));
    }

    .title {
      padding: 10px 12px;
      font: 600 12px/1.2 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
      color: light-dark(var(--n-30), var(--n-90));
      border-bottom: 1px solid light-dark(var(--n-90), var(--n-15));
      background: linear-gradient(
        135deg,
        light-dark(rgba(99, 102, 241, 0.08), rgba(99, 102, 241, 0.18)),
        light-dark(rgba(34, 211, 238, 0.08), rgba(34, 211, 238, 0.14))
      );
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font: 12px/1.4 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
      color: light-dark(var(--n-20), var(--n-95));
    }

    thead th {
      text-align: left;
      padding: 10px 12px;
      background: light-dark(var(--n-98), var(--n-10));
      color: light-dark(var(--n-30), var(--n-90));
      border-bottom: 1px solid light-dark(var(--n-90), var(--n-15));
      font-weight: 600;
      white-space: nowrap;
    }

    tbody td {
      padding: 10px 12px;
      border-bottom: 1px solid light-dark(var(--n-95), var(--n-15));
      color: light-dark(var(--n-20), var(--n-95));
      vertical-align: top;
      word-break: break-word;
    }

    tbody tr:hover td {
      background: light-dark(rgba(99, 102, 241, 0.06), rgba(99, 102, 241, 0.10));
    }

    .empty {
      padding: 14px 12px;
      color: light-dark(var(--n-40), var(--n-70));
      font-size: 12px;
    }
  `

  private getRows(): Array<Record<string, unknown>> {
    if (this.data !== null && this.data !== undefined) {
      return normalizeRows(this.data)
    }
    if (this.dataPath && this.processor && this.component) {
      const sid = this.surfaceId ?? v0_8.Data.A2uiMessageProcessor.DEFAULT_SURFACE_ID
      const v = this.processor.getData(this.component, this.dataPath, sid)
      return normalizeRows(v)
    }
    return []
  }

  private getColumns(rows: Array<Record<string, unknown>>): Column[] {
    if (this.columns && Array.isArray(this.columns) && this.columns.length > 0) return this.columns
    const first = rows[0] ?? {}
    return Object.keys(first).map((k) => ({ key: k, label: k }))
  }

  render() {
    const rows = this.getRows()
    const cols = this.getColumns(rows)

    return html`
      <div class="wrap">
        <div class="title">table-v1</div>
        ${rows.length === 0
          ? html`<div class="empty">暂无数据（请在 data 里提供数组，或设置 dataPath 指向数组）</div>`
          : html`
              <table>
                <thead>
                  <tr>
                    ${cols.map(
                      (c) =>
                        html`<th style=${c.width ? `width:${String(c.width)}` : ''}>
                          ${c.label ?? c.key}
                        </th>`,
                    )}
                  </tr>
                </thead>
                <tbody>
                  ${rows.map(
                    (r) => html`<tr>
                      ${cols.map((c) => html`<td>${String(r[c.key] ?? '')}</td>`)}
                    </tr>`,
                  )}
                </tbody>
              </table>
            `}
      </div>
    `
  }
}

if (!customElements.get('table-v1')) {
  customElements.define('table-v1', TableV1Element)
}
