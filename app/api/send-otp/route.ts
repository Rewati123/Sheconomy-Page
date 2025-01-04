import { NextResponse } from 'next/server';
import { generateOTP } from '../../../utils/otpUtils'; 
import { sendOTPEmail } from '../../../utils/emailUtils'; 
import otpStore from '../../../utils/otpStore'; 
import { sendOTPSMS } from 'utils/smsUtils';

export async function POST(request: Request) {
  try {
    const { type, value } = await request.json();

    if (!type || !value) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    
    const otp = generateOTP();

   
    otpStore[value] = { otp, expires: Date.now() + 10 * 60 * 1000 }; 

    
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
