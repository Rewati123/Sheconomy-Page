import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendOTPSMS(phoneNumber: string, otp: string): Promise<void> {
  await client.messages.create({
    body: `Your SHEconomy application OTP is: ${otp}. It will expire in 10 minutes.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });
}

