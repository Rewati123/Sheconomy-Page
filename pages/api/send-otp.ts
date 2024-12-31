import { NextApiRequest, NextApiResponse } from 'next';
import { generateOTP } from '@/utils/otpUtils';
import { sendOTPEmail } from '@/utils/emailUtils';
import { sendOTPSMS } from '@/utils/smsUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { type, value } = req.body;

  if (!type || !value) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const otp = generateOTP();
    
    // In a real application, you would store the OTP in a database with an expiration time
    // For this example, we'll use a simple in-memory store
    const otpStore: { [key: string]: { otp: string, expires: number } } = {};
    otpStore[value] = { otp, expires: Date.now() + 600000 }; // 10 minutes expiration

    if (type === 'email') {
      await sendOTPEmail(value, otp);
    } else if (type === 'phone') {
      await sendOTPSMS(value, otp);
    } else {
      return res.status(400).json({ message: 'Invalid type' });
    }

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
}

