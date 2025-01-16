import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 })
  }

  // Retrieve the session using the request
  const session = await getServerSession({ req, ...authOptions })

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  // Get the data from the request body
  const { userId, quizId, score } = await req.json()

  if (!userId || !quizId || score === undefined) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
  }

  try {
    // Save the quiz result in the database
    const result = await prisma.userQuizResult.create({
      data: {
        userId,
        quizId,
        score,
      },
    })

    return NextResponse.json({ message: 'Quiz result submitted successfully', result }, { status: 201 })
  } catch (error) {
    console.error('Error submitting quiz result:', error)
    return NextResponse.json({ message: 'Error submitting quiz result' }, { status: 500 })
  }
}
