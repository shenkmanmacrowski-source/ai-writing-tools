'use client'

import { useState, useCallback } from 'react'

interface ToolResult {
  result?: string
  corrected_text?: string
  errors?: any[]
  ai_probability?: number
  label?: string
  summary?: string
  keywords?: string[]
  citation?: string
  reference?: string
  originality_score?: number
  similar_sources?: any[]
  warnings?: string[]
  mode?: string
}

interface ToolResultsProps {
  onSubmit: (data: any) => Promise<ToolResult>
  resultRenderer: (result: ToolResult) => React.ReactNode
  inputPlaceholder: string
  creditCost: number
  toolName: string
  extraFields?: React.ReactNode
}

export default function ToolResults({
  onSubmit,
  resultRenderer,
  inputPlaceholder,
  creditCost,
  toolName,
  extraFields,
}: ToolResultsProps) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ToolResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(`/api/${toolName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, ...formData }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || 'Something went wrong')
      }

      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Failed to process. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [input, formData, toolName])

  const handleExtraFieldChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {extraFields && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
            {extraFields}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <textarea
            className="tool-input min-h-[180px] resize-y"
            placeholder={inputPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={5000}
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-400">
              {input.length} / 5000 chars
            </span>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-primary"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Processing...
                </span>
              ) : (
                `Submit (${creditCost} credits)`
              )}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700 text-sm font-medium">❌ {error}</p>
        </div>
      )}

      {result && (
        <div className="mt-8">
          {resultRenderer(result)}
        </div>
      )}
    </div>
  )
}
