'use client'

import { useState } from 'react'
import ToolPageClient from '@/components/ToolPageClient'
import ToolResults from '@/components/ToolResults'

const CONFIG = {
  name: 'Citation Generator',
  description: 'Auto-generate APA, MLA, Chicago, IEEE, and Harvard citations from DOI or title.',
  icon: '📚',
  color: 'from-rose-500 to-red-600',
  creditCost: 3,
  inputPlaceholder: 'Enter the citation title or DOI...',
}

const SOURCE_TYPES = [
  { value: 'journal_article', label: 'Journal Article' },
  { value: 'book', label: 'Book' },
  { value: 'website', label: 'Website' },
  { value: 'conference_paper', label: 'Conference Paper' },
]

const CITATION_FORMATS = [
  { value: 'apa7', label: 'APA 7th' },
  { value: 'mla9', label: 'MLA 9th' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'ieee', label: 'IEEE' },
  { value: 'harvard', label: 'Harvard' },
]

export default function CitationPage() {
  const [sourceType, setSourceType] = useState('journal_article')
  const [citationFormat, setCitationFormat] = useState('apa7')
  const [title, setTitle] = useState('')
  const [doi, setDoi] = useState('')
  const [authors, setAuthors] = useState('')
  const [year, setYear] = useState('')
  const [url, setUrl] = useState('')
  const [journal, setJournal] = useState('')
  const [volume, setVolume] = useState('')
  const [issue, setIssue] = useState('')
  const [pages, setPages] = useState('')
  const [publisher, setPublisher] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/citation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_type: sourceType,
          format: citationFormat,
          title,
          doi,
          authors,
          year,
          url,
          journal,
          volume,
          issue,
          pages,
          publisher,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || 'Something went wrong')
      }

      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Failed to generate citation.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolPageClient tool="citation" config={CONFIG}>
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
          {/* Format & Type */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Citation Format</label>
              <select
                value={citationFormat}
                onChange={(e) => setCitationFormat(e.target.value)}
                className="tool-input"
              >
                {CITATION_FORMATS.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Source Type</label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value)}
                className="tool-input"
              >
                {SOURCE_TYPES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              className="tool-input"
              placeholder="Enter the title of your source"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* DOI */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">DOI (auto-fills other fields)</label>
            <input
              type="text"
              className="tool-input"
              placeholder="10.1000/xyz123"
              value={doi}
              onChange={(e) => setDoi(e.target.value)}
            />
          </div>

          {/* Authors */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Authors</label>
            <input
              type="text"
              className="tool-input"
              placeholder="Smith, John; Doe, Jane"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
              <input
                type="text"
                className="tool-input"
                placeholder="2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">URL</label>
              <input
                type="url"
                className="tool-input"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          {(sourceType === 'journal_article' || sourceType === 'conference_paper') && (
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Journal/Conference</label>
                <input
                  type="text"
                  className="tool-input"
                  placeholder="Nature"
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Volume</label>
                <input
                  type="text"
                  className="tool-input"
                  placeholder="12"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Issue</label>
                <input
                  type="text"
                  className="tool-input"
                  placeholder="3"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pages</label>
              <input
                type="text"
                className="tool-input"
                placeholder="1-15"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Publisher</label>
              <input
                type="text"
                className="tool-input"
                placeholder="Oxford University Press"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-gray-400">* Required field</span>
            <button
              type="submit"
              disabled={loading || !title.trim()}
              className="btn-primary"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Generating...
                </span>
              ) : (
                `Generate Citation (${CONFIG.creditCost} credits)`
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm font-medium">❌ {error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            {result.citation && (
              <div className="result-box">
                <h3 className="font-semibold text-gray-800 mb-4">📖 Citation (In-text)</h3>
                <p className="text-gray-700 leading-relaxed">{result.citation}</p>
              </div>
            )}
            {result.reference && (
              <div className="result-box">
                <h3 className="font-semibold text-gray-800 mb-4">📚 Reference Entry</h3>
                <p className="text-gray-700 leading-relaxed">{result.reference}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(result.reference || '')}
                  className="btn-secondary text-sm mt-4"
                >
                  📋 Copy Reference
                </button>
              </div>
            )}
            {result.warnings && result.warnings.length > 0 && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-amber-700 text-sm font-semibold mb-2">⚠️ Warnings:</p>
                <ul className="list-disc list-inside text-amber-700 text-sm space-y-1">
                  {result.warnings.map((w: string, i: number) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPageClient>
  )
}
