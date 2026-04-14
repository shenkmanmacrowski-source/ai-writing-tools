import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy initialization to avoid build-time errors when env vars aren't loaded
let _supabase: SupabaseClient | null = null

function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  _supabase = createClient(supabaseUrl, supabaseAnonKey)
  return _supabase
}

// For backward compatibility - used in client components
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getSupabase() as any)[prop]
  },
})

export interface User {
  id: string
  email: string
  display_name: string | null
  plan: 'free' | 'pro' | 'team'
  credits: number
}

export interface UsageLog {
  id: string
  user_id: string
  tool: string
  input_tokens: number | null
  output_tokens: number | null
  credits_used: number
  created_at: string
}

export const CREDIT_COSTS: Record<string, number> = {
  rewriter: 10,
  grammar: 5,
  ai_detect: 8,
  summarize: 15,
  citation: 3,
  plagiarism: 20,
}

export async function getUserCredits(userId: string): Promise<number> {
  const { data } = await getSupabase()
    .from('users')
    .select('credits')
    .eq('id', userId)
    .single()
  return data?.credits ?? 0
}

export async function checkCredits(userId: string, tool: string): Promise<{ hasCredits: boolean; cost: number }> {
  const cost = CREDIT_COSTS[tool] ?? 1
  const credits = await getUserCredits(userId)
  return { hasCredits: credits >= cost, cost }
}

export async function deductCredits(userId: string, tool: string): Promise<boolean> {
  const cost = CREDIT_COSTS[tool] ?? 1
  const { error } = await getSupabase().rpc('deduct_credits', {
    user_id: userId,
    amount: cost,
  })
  if (error) {
    console.error('Credit deduction failed:', error)
    return false
  }
  return true
}
