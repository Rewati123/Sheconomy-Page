import { NextResponse } from 'next/server';
import otpStore from '../../../utils/otpStore'; // Shared OTP store

export async function POST(request: Request) {
  try {
    const { type, value, otp } = await request.json();

    if (!type || !value || !otp) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    console.log('otpStore during verification:', otpStore);
    console.log('value:', value);
    
    const storedData = otpStore[value];

    if (!storedData) {
      return NextResponse.json({ message: `No OTP found for this ${type}` }, { status: 400 });
    }

    if (Date.now() > storedData.expires) {
      delete otpStore[value];
      return NextResponse.json({ message: 'OTP has expired' }, { status: 400 });
    }

    if (otp !== storedData.otp) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
    }

    // OTP is valid, remove it from the store
    delete otpStore[value];

    return NextResponse.json({ message: 'OTP verified successfully' });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ message: 'Error verifying OTP' }, { status: 500 });
  }
}
