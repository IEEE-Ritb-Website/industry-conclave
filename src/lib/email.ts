import nodemailer from 'nodemailer'
import { CONFIG } from '@/configs/config'
import { calendar } from './calendar'
import { RegistrationTypeNames, RegistrationTypes } from '@/types'
import { MailOptions } from 'nodemailer/lib/json-transport'

// Create transporter with SMTP configuration
const createTransporter = () => {
  const smtpHost = process.env.SMTP_HOST!
  const smtpPort = parseInt(process.env.SMTP_PORT!)
  const smtpUser = process.env.SMTP_USER!
  const smtpPass = process.env.SMTP_PASS!

  if (!smtpUser || !smtpPass) {
    console.log('SMTP credentials not configured, skipping email sending')
    return null
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    // Enable TLS for secure connection
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates in development
    },
    // Add connection timeout
    connectionTimeout: 10000, // 10 seconds
    socketTimeout: 10000, // 10 seconds
  })
}

export const sendVerificationPendingEmail = async (
  email: string,
  name: string,
  registrationId: string,
  registrationType: RegistrationTypes,
  registrationData: {
    phone: string;
    collegeName?: string;
    organizationName?: string;
    ieeeMemberId?: string;
    attendingWorkshop: boolean;
    howDidYouHearAboutUs: string;
    couponCode?: string;
    finalAmount: number;
  }
) => {
  const transporter = createTransporter()
  if (!transporter) {
    console.log('Email transporter not configured, skipping verification pending email sending')
    return // Silently skip if not configured
  }

  const msg: MailOptions = {
    from: process.env.FROM_EMAIL!,
    to: email,
    subject: `Registration Submitted - ${CONFIG.name}`,
    html: `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Submitted</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: #f3f4f6;
      }
      .header {
        background: #1e3a8a;
        color: white;
        padding: 32px 24px;
        border-radius: 16px;
        text-align: center;
        margin-bottom: 26px;
      }
      .header h1 {
        margin: 0;
        font-size: 26px;
        font-weight: 700;
      }
      .header h2 {
        margin: 4px 0 10px;
        font-size: 18px;
        font-weight: 500;
        opacity: 0.9;
      }
      .content {
        background: white;
        padding: 28px;
        border-radius: 16px;
        margin-bottom: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      }
      h3 {
        margin-top: 26px;
        margin-bottom: 10px;
        color: #1e3a8a;
      }
      .info-box {
        background: #fef3c7;
        padding: 16px;
        border-radius: 10px;
        margin: 16px 0;
        border-left: 4px solid #f59e0b;
      }
      .success-box {
        background: #d1fae5;
        padding: 16px;
        border-radius: 10px;
        margin: 16px 0;
        border-left: 4px solid #10b981;
      }
      .footer {
        text-align: center;
        color: #6b7280;
        font-size: 13px;
        margin-top: 20px;
      }
      a {
        color: #1e40af;
      }
      .registration-summary {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 20px;
        margin: 20px 0;
      }
      .summary-row {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
        font-size: 14px;
      }
      .summary-label {
        color: #64748b;
        font-weight: 500;
      }
      .summary-value {
        color: #1e293b;
        font-weight: 600;
      }
      .price-highlight {
        background: #dcfce7;
        color: #166534;
        padding: 4px 8px;
        border-radius: 6px;
        font-weight: 600;
      }
    </style>
  </head>
  <body>

    <div class="header">
      <h1>📝 Registration Submitted!</h1>
      <h2>${CONFIG.name}</h2>
      <p>${CONFIG.eventDetails.dates} • ${CONFIG.eventDetails.location}</p>
    </div>

    <div class="content">
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for registering for ${CONFIG.name}! Your registration has been successfully submitted and is now pending payment verification.</p>

      <div class="info-box">
        <p><strong>Registration ID:</strong> ${registrationId}</p>
        <p><strong>Category:</strong> ${RegistrationTypeNames[registrationType]}</p>
        <p><strong>Amount Paid:</strong> <span class="price-highlight">₹${registrationData.finalAmount}</span></p>
        ${registrationData.couponCode ? `<p><strong>Coupon Applied:</strong> ${registrationData.couponCode}</p>` : ''}
      </div>

      <h3>🔍 What Happens Next?</h3>
      <ul>
        <li>Our team will verify your payment screenshot within 48 hours</li>
        <li>Once verified, you'll receive a confirmation email with your ticket</li>
        <li>You'll get access to event details and schedule</li>
      </ul>

      <div class="success-box">
        <p><strong>Important:</strong> Please keep your Registration ID (${registrationId}) safe for future reference.</p>
      </div>

      <h3>📅 Event Details</h3>
      <p><strong>Dates:</strong> ${CONFIG.eventDetails.dates}</p>
      <p><strong>Venue:</strong> ${CONFIG.eventDetails.location}</p>

      <h3>❓ Need Help?</h3>
      <p>If you don't receive confirmation within 48 hours, or if you have any questions, please contact us at  
        <a href="mailto:${CONFIG.profile.email}">${CONFIG.profile.email}</a>
      </p>

      <p>We're excited to have you join us for this incredible tech event! 🚀</p>

      <p><strong>Team ${CONFIG.name}</strong></p>
    </div>

    <div class="footer">
      <p>This is an automated email. Please do not reply to this message.</p>
    </div>

  </body>
</html>
`,
  }

  try {
    const info = await transporter.sendMail(msg)
    console.log('Verification pending email sent successfully:', info.messageId)
  } catch (error) {
    console.error('Error sending verification pending email:', error)
    throw error
  }
}

export const sendConfirmationEmail = async (email: string, name: string, registrationId: string, registrationType: RegistrationTypes) => {
  const transporter = createTransporter()
  if (!transporter) {
    console.log('Email transporter not configured, skipping email sending')
    return // Silently skip if not configured
  }

  const msg: MailOptions = {
    from: process.env.FROM_EMAIL!,
    to: email,
    subject: `Registration Confirmed - ${CONFIG.name}`,
    attachments: [
      {
        filename: "event.ics",
        content: calendar.toString(),
        contentType: "text/calendar",
      }
    ],
    html: `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: #f3f4f6;
      }
      .header {
        background: #1e3a8a;
        color: white;
        padding: 32px 24px;
        border-radius: 16px;
        text-align: center;
        margin-bottom: 26px;
      }
      .header h1 {
        margin: 0;
        font-size: 26px;
        font-weight: 700;
      }
      .header h2 {
        margin: 4px 0 10px;
        font-size: 18px;
        font-weight: 500;
        opacity: 0.9;
      }
      .content {
        background: white;
        padding: 28px;
        border-radius: 16px;
        margin-bottom: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      }
      h3 {
        margin-top: 26px;
        margin-bottom: 10px;
        color: #1e3a8a;
      }
      ul {
        padding-left: 20px;
        margin-bottom: 16px;
      }
      .info-box {
        background: #eef2ff;
        padding: 16px;
        border-radius: 10px;
        margin: 16px 0;
        border-left: 4px solid #4f46e5;
      }
      .footer {
        text-align: center;
        color: #6b7280;
        font-size: 13px;
        margin-top: 20px;
      }
      a {
        color: #1e40af;
      }
    </style>
  </head>
  <body>

    <div class="header">
      <h1>🎉 Registration Confirmed!</h1>
      <h2>${CONFIG.name}</h2>
      <p>${CONFIG.eventDetails.dates} • ${CONFIG.eventDetails.location}</p>
    </div>

    <div class="content">
      <p>Hi <strong>${name}</strong>,</p>
      <p>Great news — your registration is confirmed! Get ready to be part of one of most exciting tech and innovation gatherings of year.</p>

      <h3>🧾 Your Registration Details</h3>

      <div class="info-box">
        <p><strong>Name:</strong> ${name}<br>
        <strong>Registration ID:</strong> ${registrationId}</p>
        <strong>Category:</strong> ${RegistrationTypeNames[registrationType]}</p>
      </div>

      <h3>✨ What Awaits You</h3>
      <ul>
        <li>🔥 Inspiring keynotes & hands-on workshops</li>
        <li>🤝 Networking with industry pioneers & innovators</li>
        <li>🎁 Exclusive participant goodies</li>
        <li>🍽️ Food & refreshments to keep you powered up</li>
      </ul>

      <h3>🕒 Event Schedule</h3>
      <p><strong>Day 1 (${CONFIG.eventDetails.day1}):</strong> Keynotes, Workshops, Technical Sessions</p>
      <p><strong>Day 2 (${CONFIG.eventDetails.day2}):</strong> Keynotes, Workshops, Technical Sessions</p>

      <h3>📍 Venue</h3>
      <p>${CONFIG.eventDetails.location}</p>

      <h3>Before You Arrive</h3>
      <ul>
        <li>Reach 30 minutes early for smooth entry</li>
        <li>Carry a valid ID proof for verification</li>
      </ul>

      <p>Have any questions? Reach out to us at  
        <a href="mailto:${CONFIG.profile.email}">${CONFIG.profile.email}</a>
      </p>

      <p>We can't wait to welcome you — expect ideas, inspiration, and incredible tech energy! 🚀</p>

      <p><strong>Team ${CONFIG.name}</strong></p>
    </div>

    <div class="footer">
      <p>This is an automated confirmation email. Please do not reply to this message.</p>
    </div>

  </body>
</html>
`,
  }

  try {
    const info = await transporter.sendMail(msg)
    // console.log('Confirmation email sent successfully:', info.messageId)
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    throw error
  }
}

export const sendContactEmail = async (name: string, email: string, message: string) => {
  const transporter = createTransporter()
  if (!transporter) {
    console.log('Email transporter not configured, skipping contact email sending')
    return // Silently skip if not configured
  }

  const msg = {
    from: process.env.FROM_EMAIL!,
    to: process.env.FROM_EMAIL!, // Send to smtp sender
    cc: CONFIG.profile.email, // CC to organizer's email
    subject: `New Contact Form Message from ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 16px;
              text-align: center;
              margin-bottom: 30px;
            }
            .content {
              background: #f8fafc;
              padding: 30px;
              border-radius: 16px;
              margin-bottom: 20px;
            }
            .user-info {
              background: #e0e7ff;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .message {
              background: #f1f5f9;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #667eea;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📬 New Contact Message</h1>
            <h2>${CONFIG.name}</h2>
          </div>

          <div class="content">
            <div class="user-info">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
            </div>

            <div class="message">
              <h3>Message:</h3>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }

  try {
    const info = await transporter.sendMail(msg)
    console.log('Contact email sent successfully:', info.messageId)
  } catch (error) {
    console.error('Error sending contact email (non-critical):', error)
    // Don't throw - contact form should succeed even if email fails
  }
}