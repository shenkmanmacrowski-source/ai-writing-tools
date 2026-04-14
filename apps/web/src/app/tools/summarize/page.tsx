'use client'

import { useState } from 'react'
import ToolPageClient from '@/components/ToolPageClient'
import ToolResults from '@/components/ToolResults'

const CONFIG = {
  name: 'Summarizer',
  description: 'Summarize long articles, papers, or documents into concise key points.',
  icon: '📝',
  color: 'from-purple-500 to-pink-600',
  creditCost: 15,
  inputPlaceholder: 'Paste the text or article you want to summarize...',
}

export default function SummarizePage() {
  const [length, setLength] = useState('medium')
  const [url, setUrl] = useState('')

  return (
    <ToolPageClient tool="summarize" config={CONFIG}>
      <ToolResults
        toolName="summarize"
        creditCost={CONFIG.creditCost}
        inputPlaceholder={CONFIG.inputPlaceholder}
        extraFields={
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Summary Length</label>
              <div className="flex gap-2">
                {[
                  { value: 'short', label: 'Short (2-3 sentences)' },
                  { value: 'medium', label: 'Medium (1-2 paragraphs)' },
                  { value: 'long', label: 'Long (comprehensive)' },
                ].map((l) => (
                  <button
                    key={l.value}
                    type="button"
                    onClick={() => setLength(l.value)}
                    className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      length === l.value
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Or paste a URL</label>
              <input
                type="url"
                className="tool-input"
                placeholder="https://example.com/article (optional)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-1.5">We'll fetch the article and summarize it automatically</p>
            </div>
          </div>
        }
        resultRenderer={(result) => (
          <div className="space-y-6">
            {result.summary && (
              <div className="result-box">
                <h3 className="font-semibold text-gray-800 mb-4">📝 Summary</h3>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{result.summary}</p>
              </div>
            )}

            {result.keywords && result.keywords.length > 0 && (
              <div className="result-box">
                <h3 className="font-semibold text-gray-800 mb-4">🏷️ Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((kw: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-sm font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      />
    </ToolPageClient>
  )
}
