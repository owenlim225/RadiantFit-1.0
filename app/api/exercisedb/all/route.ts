import { NextResponse } from 'next/server'

const EXERCISEDB_BASE_URL =
  process.env.NEXT_PUBLIC_EXERCISEDB_HOST || 'exercisedb.p.rapidapi.com'

export async function GET(request: Request) {
  try {
    const apiKey = process.env.EXERCISEDB_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'ExerciseDB API key is not configured' },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') // optional: soft client-side limit

    const response = await fetch(`https://${EXERCISEDB_BASE_URL}/exercises`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': EXERCISEDB_BASE_URL,
        'x-rapidapi-key': apiKey,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      console.log('[v0] ExerciseDB all-exercises error:', response.statusText)
      return NextResponse.json(
        { error: 'Failed to fetch all exercises' },
        { status: response.status },
      )
    }

    const data = await response.json()

    // Optionally slice on the server if a limit query param is provided
    const limited =
      Array.isArray(data) && limit ? data.slice(0, Number(limit) || 0) : data

    return NextResponse.json(limited)
  } catch (error) {
    console.log('[v0] Error fetching all exercises:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

