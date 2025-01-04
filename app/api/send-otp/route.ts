import { NextResponse } from 'next/server';
import { generateOTP } from '../../../utils/otpUtils'; // OTP जनरेट करने का फंक्शन
import { sendOTPEmail } from '../../../utils/emailUtils'; // OTP भेजने का फंक्शन
import otpStore from '../../../utils/otpStore'; // साझा OTP स्टोर
import { sendOTPSMS } from 'utils/smsUtils';

export async function POST(request: Request) {
  try {
    const { type, value } = await request.json();

    if (!type || !value) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // OTP जनरेट करें
    const otp = generateOTP();

    // OTP स्टोर करें
    otpStore[value] = { otp, expires: Date.now() + 10 * 60 * 1000 }; // 10 मिनट में एक्सपायर होगा

    // ईमेल या SMS के जरिए OTP भेजें
    if (type === 'email') {
      await sendOTPEmail(value, otp);
    } else if (type === 'phone') {
      // SMS भेजने का फंक्शन
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
