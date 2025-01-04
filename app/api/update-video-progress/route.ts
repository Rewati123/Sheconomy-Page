import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { sendVideoCompletionEmail, sendAdminNotification } from '../../../utils/emailUtils'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { userId, videoId, progress, completed } = req.body

  if (!userId || !videoId || progress === undefined || completed === undefined) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const updatedProgress = await prisma.videoProgress.upsert({
      where: {
        userId_videoId: {
          userId,
          videoId,
        },
      },
      update: {
        progress,
        completed,
      },
      create: {
        userId,
        videoId,
        progress,
        completed,
      },
    })

    if (completed) {
      // Send notification email
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { application: true },
      })

      const video = await prisma.video.findUnique({
        where: { id: videoId },
      })

      if (user && video) {
        await sendVideoCompletionEmail(user.email, user.application.fullName, video.title)
        await sendAdminNotification(user.email, user.application.fullName, video.title)
      }
    }

    res.status(200).json({ message: 'Video progress updated successfully', progress: updatedProgress })
  } catch (error) {
    console.error('Error updating video progress:', error)
    res.status(500).json({ message: 'Error updating video progress' })
  }
}

