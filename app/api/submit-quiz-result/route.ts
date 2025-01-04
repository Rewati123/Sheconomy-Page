import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { userId, quizId, score } = req.body

  if (!userId || !quizId || score === undefined) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const result = await prisma.userQuizResult.create({
      data: {
        userId,
        quizId,
        score,
      },
    })

    res.status(201).json({ message: 'Quiz result submitted successfully', result })
  } catch (error) {
    console.error('Error submitting quiz result:', error)
    res.status(500).json({ message: 'Error submitting quiz result' })
  }
}

