import Link from 'next/link'

const TOOLS = [
  { id: 'rewriter', name: 'Rewriter', icon: '✍️', href: '/tools/rewriter', color: 'from-blue-500 to-indigo-600' },
  { id: 'grammar', name: 'Grammar Checker', icon: '✅', href: '/tools/grammar', color: 'from-emerald-500 to-teal-600' },
  { id: 'summarize', name: 'Summarizer', icon: '📝', href: '/tools/summarize', color: 'from-purple-500 to-pink-600' },
  { id: 'citation', name: 'Citation Generator', icon: '📚', href: '/tools/citation', color: 'from-rose-500 to-red-600' },

]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">AI Writing Tools</h1>
          <p className="text-gray-500 text-lg">Pick a tool and start writing better — 100 free credits, no signup required.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="tool-card group bg-white border border-gray-200 rounded-2xl p-6 hover:border-brand-200"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{tool.name}</h3>
              <p className="text-brand-600 text-sm font-medium group-hover:underline">Use tool →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
