import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { generateTemporaryPassword } from '../../../utils/passwordUtils'
import { sendWelcomeEmail } from '../../../utils/emailUtils'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  // Parse JSON body
  const body = await req.json()
  const { fullName, email, phone, startupName, description, profileLink } = body

  // Check if all required fields are provided
  if (!fullName || !email || !phone || !startupName || !description || !profileLink) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
  }

  try {
    // Create application record
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

    // Generate a temporary password and hash it
    const temporaryPassword = generateTemporaryPassword()
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10)

    // Create user record
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        applicationId: application.id,
      },
    });
    
    if (!user) {
      return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
    }
    

    // Send welcome email with temporary password
    await sendWelcomeEmail(email, fullName, temporaryPassword)

    // Return success response
    return NextResponse.json({ message: 'Application submitted successfully', application }, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error submitting application:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
    return NextResponse.json({ message: 'Error submitting application' }, { status: 500 });
  }
  
}
