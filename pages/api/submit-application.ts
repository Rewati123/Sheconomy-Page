import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { generateTemporaryPassword } from '@/utils/passwordUtils'
import { sendWelcomeEmail } from '@/utils/emailUtils'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { fullName, email, phone, startupName, description, profileLink } = req.body

  if (!fullName || !email || !phone || !startupName || !description || !profileLink) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const application = await prisma.application.create({
      data: {
        fullName,
        email,
        phone,
        startupName,
        description,
        profileLink,
      },
    })

    const temporaryPassword = generateTemporaryPassword()
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        applicationId: application.id,
      },
    })

    await sendWelcomeEmail(email, fullName, temporaryPassword)

    res.status(201).json({ message: 'Application submitted successfully', application })
  } catch (error) {
    console.error('Error submitting application:', error)
    res.status(500).json({ message: 'Error submitting application' })
  }
}

