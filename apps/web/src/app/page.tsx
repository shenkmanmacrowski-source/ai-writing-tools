import Link from 'next/link'

const TOOLS = [
  {
    id: 'rewriter',
    name: 'Rewriter',
    description: 'AI-powered text rewriting in multiple styles — social, academic, formal, or casual.',
    icon: '✍️',
    href: '/tools/rewriter',
    scene: ['Social Media', 'Academic'],
    credits: 10,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'grammar',
    name: 'Grammar Checker',
    description: 'Detect and fix grammar, spelling, punctuation, and word choice errors instantly.',
    icon: '✅',
    href: '/tools/grammar',
    scene: ['Social Media', 'Academic'],
    credits: 5,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'summarize',
    name: 'Summarizer',
    description: 'Summarize long articles, papers, or documents into concise key points.',
    icon: '📝',
    href: '/tools/summarize',
    scene: ['Academic'],
    credits: 15,
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'citation',
    name: 'Citation Generator',
    description: 'Auto-generate APA, MLA, Chicago, IEEE, and Harvard citations from DOI or title.',
    icon: '📚',
    href: '/tools/citation',
    scene: ['Academic'],
    credits: 3,
    color: 'from-rose-500 to-red-600',
  },
]

const SCENES = [
  {
    title: 'Social Media',
    description: 'Create engaging, natural-sounding posts for Twitter, LinkedIn, and Instagram without the awkward translations.',
    icon: '📱',
    tools: ['rewriter', 'grammar'],
  },
  {
    title: 'Academic Writing',
    description: 'Polish papers and generate citations — everything you need for academic success.',
    icon: '🎓',
    tools: ['rewriter', 'grammar', 'summarize', 'citation'],
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-100 text-brand-700 text-sm font-medium rounded-full mb-6">
            <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
            100 Free Credits — No Credit Card Required
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Write Better.<br />
            <span className="text-brand-600">Ship Faster.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            AI-powered writing tools for everyone — from social media managers to PhD candidates.
            Rewriter, Grammar Checker, Summarizer & Citation Generator.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tools" className="btn-primary text-base px-8 py-3.5 shadow-lg shadow-brand-200">
              Try All Tools Free →
            </Link>
            <Link href="/pricing" className="btn-secondary text-base px-8 py-3.5">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Scene-based entry */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">What do you need today?</h2>
          <p className="text-gray-500 text-center mb-12">Choose your scenario — we'll guide you to the right tool.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {SCENES.map((scene) => (
              <div key={scene.title} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{scene.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{scene.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{scene.description}</p>
                <div className="flex flex-wrap gap-2">
                  {scene.tools.map((toolId) => {
                    const tool = TOOLS.find((t) => t.id === toolId)
                    return tool ? (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-brand-300 hover:text-brand-600 transition-all"
                      >
                        <span>{tool.icon}</span>
                        <span>{tool.name}</span>
                      </Link>
                    ) : null
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">All Tools</h2>
            <p className="text-gray-500 text-lg">Powerful AI tools, simple to use. No signup required to start.</p>
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
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{tool.name}</h3>
                  <span className="text-xs text-gray-400 font-medium">{tool.credits} credits</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{tool.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tool.scene.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to level up your writing?</h2>
          <p className="text-brand-100 text-lg mb-10">Get 100 free credits. No credit card. No commitment.</p>
          <Link href="/auth#signup" className="inline-block px-10 py-4 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors text-base">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  )
}
