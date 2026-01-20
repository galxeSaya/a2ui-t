import { applyA2uiDefaultPalette, type A2uiColorScheme } from './a2ui/palette'

const STORAGE_KEY = 'theme'
export type ThemeMode = 'light' | 'dark' | 'system'

export function getInitialThemeMode(): ThemeMode {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === 'light' || raw === 'dark' || raw === 'system') return raw
  return 'system'
}

export function resolveScheme(mode: ThemeMode): A2uiColorScheme {
  if (mode === 'light' || mode === 'dark') return mode
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyThemeMode(mode: ThemeMode) {
  localStorage.setItem(STORAGE_KEY, mode)
  const scheme = resolveScheme(mode)

  const root = document.documentElement
  root.classList.toggle('dark', scheme === 'dark')

  // 让原生表单控件也跟随（并与 A2UI 的 light-dark(...) 一致）
  root.style.colorScheme = scheme

  // 注入 / 更新 A2UI 所需 CSS 变量
  applyA2uiDefaultPalette(scheme)
}

