'use client'

import ToolPageClient from '@/components/ToolPageClient'
import ToolResults from '@/components/ToolResults'

const CONFIG = {
  name: 'Plagiarism Checker',
  description: 'Check your text originality against billions of web pages for plagiarism.',
  icon: '🛡️',
  color: 'from-cyan-500 to-blue-600',
  creditCost: 20,
  inputPlaceholder: 'Paste your text here to check for plagiarism (minimum 100 characters)...',
}

export default function PlagiarismPage() {
  return (
    <ToolPageClient tool="plagiarism" config={CONFIG}>
      <ToolResults
        toolName="plagiarism"
        creditCost={CONFIG.creditCost}
        inputPlaceholder={CONFIG.inputPlaceholder}
        resultRenderer={(result) => (
          <div className="space-y-6">
            <div className="result-box">
              <div className="text-center mb-6">
                <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-lg font-bold mb-4 ${
                  (result.originality_score || 0) >= 80 ? 'bg-green-100 text-green-700' :
                  (result.originality_score || 0) >= 50 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {(result.originality_score || 0) >= 80 ? '✅ Good Originality' :
                   (result.originality_score || 0) >= 50 ? '⚠️ Some Similarities Found' :
                   '🚫 High Plagiarism Risk'}
                </div>

                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                    <circle
                      cx="60" cy="60" r="50"
                      fill="none"
                      stroke={(result.originality_score || 0) >= 80 ? '#22c55e' : (result.originality_score || 0) >= 50 ? '#eab308' : '#ef4444'}
                      strokeWidth="12"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - (result.originality_score || 0) / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-3xl font-extrabold text-gray-900">{result.originality_score || 0}%</span>
                      <p className="text-xs text-gray-400 font-medium mt-1">Original</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between items-center">
                  <span>High Originality (80-100%)</span>
                  <span className="font-medium text-green-600">✅ Safe</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Some Similarities (50-79%)</span>
                  <span className="font-medium text-yellow-600">⚠️ Review</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>High Plagiarism (0-49%)</span>
                  <span className="font-medium text-red-600">🚫 Revise</span>
                </div>
              </div>
            </div>

            {result.similar_sources && result.similar_sources.length > 0 && (
              <div className="result-box">
                <h3 className="font-semibold text-gray-800 mb-4">🔗 Similar Sources Found</h3>
                <div className="space-y-3">
                  {result.similar_sources.map((src: any, i: number) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-600 hover:underline truncate">
                          {src.url}
                        </a>
                        <span className="text-xs font-semibold text-red-500 ml-2">{src.similarity_percent}% similar</span>
                      </div>
                      <p className="text-xs text-gray-500 italic line-clamp-2">"{src.matched_text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-blue-700 text-xs leading-relaxed">
                💡 <strong>Tip:</strong> For best results, check sections of your document individually.
                Combine with our AI Detector to ensure your writing is both original and natural.
              </p>
            </div>
          </div>
        )}
      />
    </ToolPageClient>
  )
}
