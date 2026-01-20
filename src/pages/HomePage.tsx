import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200/70 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-700 ring-1 ring-indigo-400/20 dark:text-indigo-200">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-300" />
            JSON 驱动 UI
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            一个最简单、但好看的 A2UI 预览器
          </h1>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            这是一个最小可用的 React 应用：3 个路由 + 顶部导航 + Tailwind
            美化，并提供一个 Playground 页面可以输入 a2ui 需要的 JSON，实时渲染 UI。
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/playground"
              className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-400"
            >
              打开 Playground
            </Link>
            <Link
              to="/about"
              className="rounded-xl bg-slate-900/5 px-4 py-2 text-sm font-medium text-slate-800 ring-1 ring-slate-200 hover:bg-slate-900/10 dark:bg-white/5 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-white/10"
            >
              查看项目说明
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: 'React + Router',
            desc: '3 个页面、可切换导航、路由兜底重定向。',
          },
          {
            title: 'TailwindCSS',
            desc: '快速做出现代化 UI：卡片、渐变、暗色主题、响应式。',
          },
          {
            title: 'A2UI',
            desc: '输入 JSON → 解析校验 → 渲染 UI（含错误提示）。',
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none"
          >
            <div className="text-sm font-semibold text-slate-900 dark:text-white">{card.title}</div>
            <div className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {card.desc}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

