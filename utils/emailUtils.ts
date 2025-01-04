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

export async function sendAdminNotification(userEmail: string, fullName: string, videoTitle: string,adminEmail: string): Promise<void> {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: adminEmail,
    subject: `User Completed Video: ${videoTitle}`,
    html: `
      <h1>Video Completion Notification</h1>
      <p>User ${fullName} (${userEmail}) has completed the video "${videoTitle}".</p>
      <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard">View Admin Dashboard</a></p>
    `,
  });
}

/**
 * Sends a welcome email to the user with a temporary password.
 */
export async function sendWelcomeEmail(email: string, fullName: string, temporaryPassword: string): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to SHEconomy!',
      html: `
        <h1>Welcome to SHEconomy, ${fullName}!</h1>
        <p>We are excited to have you on board.</p>
        <p>Your account has been created successfully. Here are your temporary login credentials:</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Temporary Password:</strong> ${temporaryPassword}</li>
        </ul>
        <p>Please log in and update your password as soon as possible.</p>
        <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/login">Click here to log in</a></p>
        <p>Best regards,<br>The SHEconomy Team</p>
      `,
    });
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw new Error('Failed to send welcome email');
  }
}
