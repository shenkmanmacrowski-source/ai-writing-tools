import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'AI Writing Tools — Write Better, Faster',
  description: 'Free AI-powered writing tools: Rewriter, Grammar Checker, AI Detector, Summarizer, Citation Generator & Plagiarism Checker for global users.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-bold text-lg text-gray-900">WritingTools</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/tools" className="text-gray-600 hover:text-brand-600 transition-colors text-sm font-medium">Tools</a>
            <a href="/pricing" className="text-gray-600 hover:text-brand-600 transition-colors text-sm font-medium">Pricing</a>
            <a href="/docs/MVP-Requirements" className="text-gray-600 hover:text-brand-600 transition-colors text-sm font-medium">Docs</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="/auth" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">Sign In</a>
            <a href="/auth#signup" className="px-4 py-2 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors">
              Get Started Free
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">AI</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm">WritingTools</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="/privacy" className="hover:text-brand-600 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-brand-600 transition-colors">Terms of Service</a>
            <span>© 2026 AI Writing Tools</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
