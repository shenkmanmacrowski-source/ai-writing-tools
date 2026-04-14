import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const apiUrl = process.env.API_URL || 'http://localhost:8000'

    const res = await fetch(`${apiUrl}/summarize/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const err = await res.json()
      return NextResponse.json(err, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { detail: 'Failed to connect to backend. Please try again.' },
      { status: 500 }
    )
  }
}
