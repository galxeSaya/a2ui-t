import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { applyThemeMode, getInitialThemeMode, resolveScheme, type ThemeMode } from '../theme'

/* const navItems = [
  { to: '/', label: '首页', end: true },
  { to: '/playground', label: 'A2UI Playground' },
  { to: '/about', label: '关于' },
] as const

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
} */

export function AppShell() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => getInitialThemeMode())

  useEffect(() => {
    applyThemeMode(themeMode)
  }, [themeMode])

  const scheme = resolveScheme(themeMode)

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950 dark:text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-500/12 ring-1 ring-indigo-400/20 dark:bg-indigo-500/15">
              <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-200">A2</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900 dark:text-white">A2UI</div>
              <div className="text-xs text-slate-600 dark:text-slate-300/80">JSON → UI 预览</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <nav className="flex items-center gap-1">
            {/* {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={'end' in item ? item.end : undefined}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-1.5 text-sm transition',
                    isActive
                      ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                      : 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))} */}
            </nav>

            <button
              type="button"
              onClick={() =>
                setThemeMode((m) => {
                  const next: ThemeMode = resolveScheme(m) === 'dark' ? 'light' : 'dark'
                  return next
                })
              }
              className="rounded-lg px-3 py-1.5 text-sm text-slate-700 ring-1 ring-slate-200 hover:bg-slate-900/5 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-white/5"
              title="切换浅色/深色"
            >
              {scheme === 'dark' ? '深色' : '浅色'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="border-t border-slate-200/70 pt-6 dark:border-white/10">
          <span className="text-slate-600 dark:text-slate-400">A2UI Playground</span>
          <span className="px-2 text-slate-400 dark:text-slate-600">·</span>
          <span className="text-slate-500 dark:text-slate-500">React + Tailwind + A2UI</span>
        </div>
      </footer>
    </div>
  )
}

