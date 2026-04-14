'use client'

import { useEffect, useState } from 'react'
import { supabase, CREDIT_COSTS } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const TOOL_LABELS: Record<string, string> = {
  rewriter: 'Rewriter',
  grammar: 'Grammar Checker',
  ai_detect: 'AI Detector',
  summarize: 'Summarizer',
  citation: 'Citation Generator',
  plagiarism: 'Plagiarism Checker',
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [credits, setCredits] = useState(0)
  const [plan, setPlan] = useState('free')
  const [usageLogs, setUsageLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }
      setUser(user)

      const { data: profile } = await supabase
        .from('users')
        .select('credits, plan')
        .eq('id', user.id)
        .single()
      if (profile) {
        setCredits(profile.credits)
        setPlan(profile.plan)
      }

      const { data: logs } = await supabase
        .from('usage_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)
      setUsageLogs(logs || [])
      setLoading(false)
    }
    getUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const totalUsage = usageLogs.reduce((sum, log) => sum + (log.credits_used || 0), 0)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-brand-600/30 border-t-brand-600 rounded-full animate-spin"></span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-bold text-lg text-gray-900">WritingTools</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* User Info */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {user?.email}
              </h1>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  plan === 'pro' ? 'bg-brand-100 text-brand-700' :
                  plan === 'team' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {plan} Plan
                </span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-gray-500 mb-1">Available Credits</p>
              <p className="text-3xl font-extrabold text-brand-600">{credits.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Stats */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
            <p className="text-3xl font-extrabold text-gray-900 mb-1">{credits.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Credits Remaining</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
            <p className="text-3xl font-extrabold text-gray-900 mb-1">{totalUsage}</p>
            <p className="text-sm text-gray-500">Total Credits Used</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
            <p className="text-3xl font-extrabold text-gray-900 mb-1">{usageLogs.length}</p>
            <p className="text-sm text-gray-500">Total Requests</p>
          </div>
        </div>

        {/* Usage Logs */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Recent Activity</h2>
          </div>
          {usageLogs.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-400 text-lg mb-4">No usage yet. Start exploring our tools!</p>
              <Link href="/tools" className="btn-primary">
                Browse Tools →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {usageLogs.map((log) => (
                <div key={log.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {log.tool === 'rewriter' ? '✍️' :
                       log.tool === 'grammar' ? '✅' :
                       log.tool === 'ai_detect' ? '🔍' :
                       log.tool === 'summarize' ? '📝' :
                       log.tool === 'citation' ? '📚' : '🛡️'}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">{TOOL_LABELS[log.tool] || log.tool}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(log.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-500">
                    -{CREDIT_COSTS[log.tool] || log.credits_used} credits
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upgrade CTA */}
        {plan === 'free' && (
          <div className="mt-8 bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Need more credits?</h3>
            <p className="text-brand-100 mb-6">Upgrade to Pro for 2,000 credits/month</p>
            <Link href="/pricing" className="inline-block px-8 py-3 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors">
              Upgrade to Pro →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
