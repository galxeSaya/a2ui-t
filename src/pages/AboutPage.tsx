export function AboutPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">关于</h2>
      <div className="rounded-2xl border border-slate-200/70 bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:shadow-none">
        <p>
          这个项目用于演示最小的 React 应用结构，并集成 TailwindCSS 与 A2UI 相关组件库。
        </p>
        <p className="mt-3">
          你可以在 <span className="font-medium text-slate-900 dark:text-slate-100">A2UI Playground</span>{' '}
          页面输入 JSON，下面会渲染出对应的 UI。
        </p>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          注：React 官方渲染器仍在开发中（官网里标注 “Coming”），当前使用{' '}
          <code className="text-slate-800 dark:text-slate-200">@a2ui/lit/ui</code> 的 Web Components 方案。
        </p>
      </div>
    </div>
  )
}

