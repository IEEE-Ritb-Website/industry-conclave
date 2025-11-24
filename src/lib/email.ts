import nodemailer from 'nodemailer'
import { CONFIG } from '@/configs/config'
import { MailOptions } from 'nodemailer/lib/json-transport'
import { calendar } from './calendar'

// TODO: Calendar integation

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

export const sendConfirmationEmail = async (email: string, name: string, registrationId: string) => {
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
            .registration-id {
              background: #e0e7ff;
              color: #4338ca;
              padding: 15px;
              border-radius: 8px;
              font-family: monospace;
              font-size: 18px;
              text-align: center;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              color: #6b7280;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 Registration Confirmed!</h1>
            <h2>IEEE CIS Industry Conclave 2025</h2>
            <p>${CONFIG.eventDetails.dates} | ${CONFIG.eventDetails.location}</p>
          </div>
          
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for registering for ${CONFIG.name}! We're excited to have you join us for this amazing 2-day event.</p>
                        
            <h3>🎫 What's Included</h3>
            <ul>
              <li>Access to all technical sessions and workshops</li>
              <li>Networking opportunities with industry experts</li>
              <li>Exciting goodies</li>
              <li>Food and refreshments during the event</li>
            </ul>
            
            <h3>📅 Event Schedule</h3>
            <p><strong>Day 1 (${CONFIG.eventDetails.day1}):</strong> Keynotes, Workshops, Technical Sessions</p>
            <p><strong>Day 2 (${CONFIG.eventDetails.day2}):</strong> Keynotes, Workshops, Technical Sessions</p>
            
            <p>Please arrive at the venue 30 minutes before the event starts. Don't forget to bring a valid ID proof for verification.</p>
            
            <p>If you have any questions, feel free to reach out to us at <a href="mailto:${CONFIG.profile.email}">${CONFIG.profile.email}</a></p>
            
            <p>See you there!</p>
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
    to: process.env.FROM_EMAIL!, // Send to the smtp sender
    cc: CONFIG.profile.email, // CC to the organizer's email
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