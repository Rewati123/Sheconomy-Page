import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { type, value, otp } = await request.json();

    if (!type || !value || !otp) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }


    const storedData = await prisma.oTP.findFirst({
      where: { type, value },
    });

    if (!storedData) {
      return NextResponse.json({ message: `No OTP found for this ${type}` }, { status: 400 });
    }

    if (new Date() > storedData.expiresAt) {
      await prisma.oTP.delete({ where: { id: storedData.id } }); // Clean up expired OTP
      return NextResponse.json({ message: 'OTP has expired' }, { status: 400 });
    }

    if (otp !== storedData.otp) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
    }

    // OTP is valid, delete it from the database
    await prisma.oTP.delete({ where: { id: storedData.id } });

    return NextResponse.json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ message: 'Error verifying OTP' }, { status: 500 });
  }
}
