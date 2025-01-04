import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

import PDFDocument from 'pdfkit'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { userId } = req.query

  if (!userId) {
    return res.status(400).json({ message: 'Missing userId' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: {
        application: true,
        videoProgress: {
          include: {
            video: true,
          },
        },
        quizResults: true,
      },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const totalVideos = await prisma.video.count()
    const completedVideos = user.videoProgress.filter(vp => vp.completed).length

    if (completedVideos < totalVideos) {
      return res.status(400).json({ message: 'Course not completed yet' })
    }

    // Generate PDF certificate
    const doc = new PDFDocument()
    
    // Set the response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=certificate_${user.id}.pdf`)

    // Pipe the PDF document to the response
    doc.pipe(res)

    // Add content to the PDF
    doc.fontSize(24).text('Certificate of Completion', 100, 100)
    doc.fontSize(16).text(`This is to certify that`, 100, 150)
    doc.fontSize(18).text(`${user.application.fullName}`, 100, 180)
    doc.fontSize(16).text(`has successfully completed the SHEconomy Women in Digital Startup Program`, 100, 220)
    doc.fontSize(14).text(`Date: ${new Date().toLocaleDateString()}`, 100, 300)

    // Finalize the PDF and end the response
    doc.end()

  } catch (error) {
    console.error('Error generating certificate:', error)
    res.status(500).json({ message: 'Error generating certificate' })
  }
}

