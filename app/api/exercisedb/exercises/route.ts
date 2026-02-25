import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const target = searchParams.get('target') || 'chest'
  const limit = searchParams.get('limit') || '10'

  try {
    const apiKey = process.env.EXERCISEDB_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ExerciseDB API key is not configured' },
        { status: 500 },
      )
    }

    const response = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/target/${target}?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': process.env.NEXT_PUBLIC_EXERCISEDB_HOST || 'exercisedb.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      console.log('[v0] ExerciseDB API error:', response.statusText)
      return NextResponse.json(
        { error: 'Failed to fetch exercises' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.log('[v0] Error fetching exercises:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
