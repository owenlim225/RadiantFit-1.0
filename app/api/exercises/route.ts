import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const count = searchParams.get('count') || '10'
    const muscle = searchParams.get('muscle')

    let url = 'https://api.workoutapi.com/exercises/random'
    const params = new URLSearchParams()
    params.append('count', count)
    
    if (muscle) {
      params.append('muscle', muscle)
    }

    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Workout API returned ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching exercises:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exercises' },
      { status: 500 }
    )
  }
}
