import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { type, value, otp } = req.body;

  if (!type || !value || !otp) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // In a real application, you would fetch the stored OTP from a database
    // For this example, we'll use the simple in-memory store from the send-otp route
    const otpStore: { [key: string]: { otp: string, expires: number } } = {};
    const storedData = otpStore[value];

    if (!storedData) {
      return res.status(400).json({ message: 'No OTP found for this ' + type });
    }

    if (Date.now() > storedData.expires) {
      delete otpStore[value];
      return res.status(400).json({ message: 'OTP has expired' });
    }

    if (otp !== storedData.otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, remove it from the store
    delete otpStore[value];

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
}

