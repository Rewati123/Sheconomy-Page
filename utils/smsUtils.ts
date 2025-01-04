// import twilio from 'twilio';

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// export async function sendOTPSMS(phoneNumber: string, otp: string): Promise<void> {
//   await client.messages.create({
//     body: `Your SHEconomy application OTP is: ${otp}. It will expire in 10 minutes.`,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: phoneNumber,
//   });
// }

import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendOTPSMS(phoneNumber: string, otp: string): Promise<void> {
  try {
    // Ensure the phone number is in E.164 format (including country code)
    const formattedPhoneNumber = `+${phoneNumber}`; // If 'phoneNumber' already has the country code, this will work directly

    await client.messages.create({
      body: `Your SHEconomy application OTP is: ${otp}. It will expire in 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,  // Ensure this is a valid Twilio number
      to: formattedPhoneNumber,
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Error sending OTP');
  }
}
