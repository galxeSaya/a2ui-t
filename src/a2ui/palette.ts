const SHADES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100] as const

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x))
}

function hslToHex(h: number, s: number, l: number) {
  // h: 0-360, s/l: 0-1
  const C = (1 - Math.abs(2 * l - 1)) * s
  const Hp = (h % 360) / 60
  const X = C * (1 - Math.abs((Hp % 2) - 1))

  let r1 = 0,
    g1 = 0,
    b1 = 0
  if (Hp >= 0 && Hp < 1) [r1, g1, b1] = [C, X, 0]
  else if (Hp < 2) [r1, g1, b1] = [X, C, 0]
  else if (Hp < 3) [r1, g1, b1] = [0, C, X]
  else if (Hp < 4) [r1, g1, b1] = [0, X, C]
  else if (Hp < 5) [r1, g1, b1] = [X, 0, C]
  else [r1, g1, b1] = [C, 0, X]

  const m = l - C / 2
  const r = Math.round((r1 + m) * 255)
  const g = Math.round((g1 + m) * 255)
  const b = Math.round((b1 + m) * 255)

  const to2 = (n: number) => n.toString(16).padStart(2, '0')
  return `#${to2(r)}${to2(g)}${to2(b)}`
}

function makePalette(prefix: 'n' | 'nv' | 'p' | 's' | 't' | 'e', hue: number, sat: number) {
  const out: Record<string, string> = {}
  for (const shade of SHADES) {
    // 让 0 最暗、100 最亮（符合 getInverseKey 的预期）
    // 用轻微曲线让中间更有层次
    const x = shade / 100
    const l = clamp01(0.06 + 0.92 * Math.pow(x, 1.05))
    out[`${prefix}${shade}`] = hslToHex(hue, sat, l)
  }
  return out
}

export type A2uiColorScheme = 'light' | 'dark'

export function applyA2uiDefaultPalette(mode: A2uiColorScheme) {
  const root = document.documentElement

  // A2UI 内部使用 light-dark(...) + getInverseKey(...)，
  // 我们通过设定 --color-scheme 决定使用暗色分支。
  root.style.setProperty('--color-scheme', mode)

  const palettes = {
    neutral: makePalette('n', 220, 0.08),
    neutralVariant: makePalette('nv', 220, 0.14),
    primary: makePalette('p', 245, 0.78),
    secondary: makePalette('s', 200, 0.75),
    tertiary: makePalette('t', 280, 0.72),
    error: makePalette('e', 0, 0.75),
  } as const

  // 对应 @a2ui/lit 的 toProp(key)：n10 -> --n-10, nv10 -> --nv-10
  for (const [groupName, group] of Object.entries(palettes)) {
    void groupName
    for (const [k, v] of Object.entries(group)) {
      const prefix = k.startsWith('nv') ? 'nv' : k[0]
      const shade = prefix === 'nv' ? k.slice(2) : k.slice(1)
      root.style.setProperty(`--${prefix}-${shade}`, v)
    }
  }
}

