'use client'

import { useState, ReactNode } from 'react'
import Link from 'next/link'

interface ToolConfig {
  name: string
  description: string
  icon: string
  color: string
  creditCost: number
  inputPlaceholder: string
  modes?: { value: string; label: string }[]
}

interface ToolPageClientProps {
  tool: string
  config: ToolConfig
  children: ReactNode
}

export default function ToolPageClient({ tool, config, children }: ToolPageClientProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors text-sm">← Home</Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-600 text-sm font-medium">{config.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                <span>{config.creditCost} credits per use</span>
              </div>
              <Link href="/auth" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
                Sign in to use →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tool */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${config.color} text-3xl mb-4`}>
            {config.icon}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{config.name}</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{config.description}</p>
        </div>

        {children}
      </div>
    </div>
  )
}
