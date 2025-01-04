import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { videoId } = req.query

  if (!videoId) {
    return res.status(400).json({ message: 'Missing videoId' })
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
      return res.status(404).json({ message: 'Quiz not found' })
    }

    res.status(200).json({ quiz })
  } catch (error) {
    console.error('Error fetching quiz:', error)
    res.status(500).json({ message: 'Error fetching quiz' })
  }
}

