import { NextResponse } from 'next/server'

const EXERCISEDB_API_URL = 'https://exercisedb.p.rapidapi.com/status'

export async function GET() {
  try {
    const apiKey = process.env.EXERCISEDB_API_KEY

    if (!apiKey) {
      console.error('EXERCISEDB_API_KEY is not set')
      return NextResponse.json(
        { error: 'ExerciseDB API key is not configured' },
        { status: 500 },
      )
    }

    const response = await fetch(EXERCISEDB_API_URL, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
      },
      // Keep this dynamic; status should always be fresh
      cache: 'no-store',
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('ExerciseDB status error:', response.status, text)
      return NextResponse.json(
        { error: 'Failed to fetch ExerciseDB status' },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('ExerciseDB status exception:', error)
    return NextResponse.json(
      { error: 'Error checking ExerciseDB status' },
      { status: 500 },
    )
  }
}

