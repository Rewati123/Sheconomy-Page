import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOTPEmail(email: string, otp: string): Promise<void> {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Your OTP for SHEconomy Application',
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    html: `<p>Your OTP is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
  });
}

export async function sendVideoCompletionEmail(email: string, fullName: string, videoTitle: string): Promise<void> {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Congratulations on completing "${videoTitle}"!`,
    html: `
      <h1>Great job, ${fullName}!</h1>
      <p>You've successfully completed the video "${videoTitle}" in your SHEconomy program.</p>
      <p>Keep up the great work and continue your learning journey!</p>
      <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard">Return to your dashboard</a> to watch more videos.</p>
    `,
  });
}

export async function sendAdminNotification(userEmail: string, fullName: string, videoTitle: string): Promise<void> {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `User Completed Video: ${videoTitle}`,
    html: `
      <h1>Video Completion Notification</h1>
      <p>User ${fullName} (${userEmail}) has completed the video "${videoTitle}".</p>
      <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard">View Admin Dashboard</a></p>
    `,
  });
}

