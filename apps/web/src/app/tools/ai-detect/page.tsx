'use client'

import ToolPageClient from '@/components/ToolPageClient'
import ToolResults from '@/components/ToolResults'

const CONFIG = {
  name: 'AI Detector',
  description: 'Check if your text was written by AI or a human — perfect for academic submissions.',
  icon: '🔍',
  color: 'from-amber-500 to-orange-600',
  creditCost: 8,
  inputPlaceholder: 'Paste your text here (minimum 50 characters) to detect if it was written by AI...',
}

export default function AIDetectorPage() {
  return (
    <ToolPageClient tool="ai_detect" config={CONFIG}>
      <ToolResults
        toolName="ai-detect"
        creditCost={CONFIG.creditCost}
        inputPlaceholder={CONFIG.inputPlaceholder}
        resultRenderer={(result) => (
          <div className="space-y-6">
            <div className="result-box">
              <div className="text-center mb-6">
                <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-lg font-bold mb-4 ${
                  result.label === 'AI Generated' ? 'bg-red-100 text-red-700' :
                  result.label === 'Human Written' ? 'bg-green-100 text-green-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {result.label === 'AI Generated' ? '🤖 AI Generated' :
                   result.label === 'Human Written' ? '👤 Human Written' :
                   '⚠️ Mixed Content'}
                </div>
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                    <circle
                      cx="60" cy="60" r="50"
                      fill="none"
                      stroke={result.ai_probability > 70 ? '#ef4444' : result.ai_probability < 30 ? '#22c55e' : '#eab308'}
                      strokeWidth="12"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - (result.ai_probability || 0) / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-3xl font-extrabold text-gray-900">{result.ai_probability || 0}%</span>
                      <p className="text-xs text-gray-400 font-medium mt-1">AI Probability</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Human Written Zone</span>
                  <span className="font-medium text-gray-700">0–30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Mixed Zone</span>
                  <span className="font-medium text-gray-700">30–70%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">AI Generated Zone</span>
                  <span className="font-medium text-gray-700">70–100%</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-amber-700 text-xs leading-relaxed">
                  ⚠️ <strong>Disclaimer:</strong> This tool provides probability estimates, not definitive answers.
                  Always review your work carefully before academic submissions.
                </p>
              </div>
            </div>
          </div>
        )}
      />
    </ToolPageClient>
  )
}
