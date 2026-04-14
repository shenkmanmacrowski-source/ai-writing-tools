'use client'

import { useState } from 'react'
import ToolPageClient from '@/components/ToolPageClient'
import ToolResults from '@/components/ToolResults'

const CONFIG = {
  name: 'Rewriter',
  description: 'AI-powered text rewriting in multiple styles — social, academic, formal, or casual.',
  icon: '✍️',
  color: 'from-blue-500 to-indigo-600',
  creditCost: 10,
  inputPlaceholder: 'Paste your text here and choose a rewriting style...',
  modes: [
    { value: 'social', label: '📱 Social Media' },
    { value: 'academic', label: '🎓 Academic' },
    { value: 'formal', label: '💼 Formal' },
    { value: 'casual', label: '💬 Casual' },
  ],
}

export default function RewriterPage() {
  const [mode, setMode] = useState('social')

  return (
    <ToolPageClient tool="rewriter" config={CONFIG}>
      <ToolResults
        toolName="rewrite"
        creditCost={CONFIG.creditCost}
        inputPlaceholder={CONFIG.inputPlaceholder}
        extraFields={
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Rewriting Style</label>
            <div className="flex flex-wrap gap-2">
              {CONFIG.modes!.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMode(m.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    mode === m.value
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <input type="hidden" name="mode" value={mode} />
          </div>
        }
        resultRenderer={(result) => (
          <div className="space-y-6">
            <div className="result-box">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Rewritten Result</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  result.mode === 'social' ? 'bg-blue-100 text-blue-700' :
                  result.mode === 'academic' ? 'bg-amber-100 text-amber-700' :
                  result.mode === 'formal' ? 'bg-gray-100 text-gray-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {result.mode}
                </span>
              </div>
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{result.result}</p>
            </div>
            <div className="text-center">
              <button
                onClick={() => navigator.clipboard.writeText(result.result || '')}
                className="btn-secondary text-sm"
              >
                📋 Copy to Clipboard
              </button>
            </div>
          </div>
        )}
      />
    </ToolPageClient>
  )
}
