import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateOTP } from '../../../utils/otpUtils';
import { sendOTPEmail } from '../../../utils/emailUtils';
import { sendOTPSMS } from '../../../utils/smsUtils';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { type, value } = await request.json();

    if (!type || !value) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 


    await prisma.oTP.create({
      data: {
        type,
        value,
        otp,
        expiresAt,
      },
    });


    if (type === 'email') {
      await sendOTPEmail(value, otp);
    } else if (type === 'phone') {
      await sendOTPSMS(value, otp);
    } else {
      return NextResponse.json({ message: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ message: 'Error sending OTP' }, { status: 500 });
  }
}
