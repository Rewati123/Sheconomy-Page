import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export async function GET(req: NextRequest) {
  // Extract videoId from query parameters using .get() method
  const videoId = req.nextUrl.searchParams.get('videoId')

  if (!videoId) {
    return NextResponse.json({ message: 'Missing videoId' }, { status: 400 })
  }

  const session = await getServerSession({ req, ...authOptions }) // Adjusted this to use an object with 'req'

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { videoId: Number(videoId) },
      include: {
        questions: {
          include: {
            options: {
              select: {
                id: true,
                text: true,
              },
            },
          },
        },
      },
    })

    if (!quiz) {
      return NextResponse.json({ message: 'Quiz not found' }, { status: 404 })
    }

    return NextResponse.json({ quiz })
  } catch (error) {
    console.error('Error fetching quiz:', error)
    return NextResponse.json({ message: 'Error fetching quiz' }, { status: 500 })
  }
}
