'use client'

import ToolPageClient from '@/components/ToolPageClient'
import ToolResults from '@/components/ToolResults'

const CONFIG = {
  name: 'Grammar Checker',
  description: 'Detect and fix grammar, spelling, punctuation, and word choice errors instantly.',
  icon: '✅',
  color: 'from-emerald-500 to-teal-600',
  creditCost: 5,
  inputPlaceholder: 'Paste your text here to check for grammar, spelling, and punctuation errors...',
}

export default function GrammarPage() {
  return (
    <ToolPageClient tool="grammar" config={CONFIG}>
      <ToolResults
        toolName="grammar"
        creditCost={CONFIG.creditCost}
        inputPlaceholder={CONFIG.inputPlaceholder}
        resultRenderer={(result) => (
          <div className="space-y-6">
            {result.corrected_text && (
              <div className="result-box">
                <h3 className="font-semibold text-gray-800 mb-4">✅ Corrected Text</h3>
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed mb-4">{result.corrected_text}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(result.corrected_text || '')}
                  className="btn-secondary text-sm"
                >
                  📋 Copy Corrected Text
                </button>
              </div>
            )}

            {result.errors && result.errors.length > 0 && (
              <div className="result-box">
                <h3 className="font-semibold text-gray-800 mb-4">🚫 Errors Found ({result.errors.length})</h3>
                <div className="space-y-3">
                  {result.errors.map((err: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        err.error_type === 'Grammar' ? 'bg-red-100 text-red-700' :
                        err.error_type === 'Spelling' ? 'bg-orange-100 text-orange-700' :
                        err.error_type === 'Punctuation' ? 'bg-yellow-100 text-yellow-700' :
                        err.error_type === 'Word Choice' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {err.error_type === 'Grammar' ? 'G' :
                         err.error_type === 'Spelling' ? 'S' :
                         err.error_type === 'Punctuation' ? 'P' :
                         err.error_type === 'Word Choice' ? 'W' : '?'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-red-500 line-through font-medium">{err.original}</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-sm text-green-600 font-semibold">{err.suggestion}</span>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">{err.error_type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(!result.errors || result.errors.length === 0) && !result.corrected_text && (
              <div className="result-box text-center py-12">
                <p className="text-gray-500 text-lg">✅ No errors found! Your text looks great.</p>
              </div>
            )}
          </div>
        )}
      />
    </ToolPageClient>
  )
}
