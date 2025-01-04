import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next' // Correct import
import { authOptions } from '../auth/[...nextauth]' // Assuming authOptions are correct for your project
import prisma from '../../../lib/prisma'
import PDFDocument from 'pdfkit'

// Function to handle GET request
export async function GET(req: NextRequest) {
  // Extracting userId from query params
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ message: 'Missing userId' }, { status: 400 })
  }

  // Correct usage of getServerSession
  const session = await getServerSession({ 
    req, 
    ...authOptions // Ensure authOptions are spread correctly
  })

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Validate userId is a number
    const userIdNumber = Number(userId)
    if (isNaN(userIdNumber)) {
      return NextResponse.json({ message: 'Invalid userId' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userIdNumber },
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
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const totalVideos = await prisma.video.count()
    const completedVideos = user.videoProgress.filter(vp => vp.completed).length

    if (completedVideos < totalVideos) {
      return NextResponse.json({ message: 'Course not completed yet' }, { status: 400 })
    }

    // Generate PDF certificate
    const doc = new PDFDocument()

    // Set the response headers for PDF download
    const response = new NextResponse()
    response.headers.set('Content-Type', 'application/pdf')
    response.headers.set('Content-Disposition', `attachment; filename=certificate_${user.id}.pdf`)

    // Pipe the PDF document to the response
    doc.pipe(response)

    // Add content to the PDF
    doc.fontSize(24).text('Certificate of Completion', 100, 100)
    doc.fontSize(16).text(`This is to certify that`, 100, 150)
    doc.fontSize(18).text(`${user.application.fullName}`, 100, 180)
    doc.fontSize(16).text(`has successfully completed the SHEconomy Women in Digital Startup Program`, 100, 220)
    doc.fontSize(14).text(`Date: ${new Date().toLocaleDateString()}`, 100, 300)

    // Finalize the PDF and end the response
    doc.end()

    return response
  } catch (error) {
    console.error('Error generating certificate:', error)
    return NextResponse.json({ message: 'Error generating certificate' }, { status: 500 })
  }
}
