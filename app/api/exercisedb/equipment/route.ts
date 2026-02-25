import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.EXERCISEDB_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ExerciseDB API key is not configured' },
        { status: 500 },
      )
    }

    const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/equipmentList', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': process.env.NEXT_PUBLIC_EXERCISEDB_HOST || 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      console.log('[v0] ExerciseDB API error:', response.statusText)
      return NextResponse.json(
        { error: 'Failed to fetch equipment' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.log('[v0] Error fetching equipment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
