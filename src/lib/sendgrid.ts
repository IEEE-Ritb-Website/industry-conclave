import { CONFIG } from '@/configs/config'
import sgMail from '@sendgrid/mail'

// Only set API key if it's properly configured
if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith('SG.')) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export const sendConfirmationEmail = async (email: string, name: string, registrationId: string) => {
  // Check if SendGrid is properly configured
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_API_KEY.startsWith('SG.')) {
    console.log('SendGrid not configured, skipping email sending')
    return // Silently skip if not configured
  }

  const msg = {
    to: email,
    from: process.env.FROM_EMAIL!,
    subject: 'Registration Confirmed - Tech Conclave 2025',
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
            <h2>Tech Conclave 2025</h2>
            <p>March 15-16, 2025 | Engineering College Campus</p>
          </div>
          
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for registering for Tech Conclave 2025! We're excited to have you join us for this amazing 2-day event.</p>
            
            <h3>📋 Registration Details</h3>
            <div class="registration-id">
              Registration ID: ${registrationId}
            </div>
            
            <h3>🎫 What's Included</h3>
            <ul>
              <li>Access to all technical sessions and workshops</li>
              <li>Networking opportunities with industry experts</li>
              <li>Event merchandise and certificate</li>
              <li>Meals and refreshments during the event</li>
            </ul>
            
            <h3>📅 Event Schedule</h3>
            <p><strong>Day 1 (March 15):</strong> Keynotes, Technical Sessions, Hackathon Kickoff</p>
            <p><strong>Day 2 (March 16):</strong> Workshops, Project Showcase, Closing Ceremony</p>
            
            <p>Please arrive at the venue 30 minutes before the event starts. Don't forget to bring a valid ID proof for verification.</p>
            
            <p>If you have any questions, feel free to reach out to us at <a href={mailto:${CONFIG.profile.email}}>${CONFIG.profile.email}</a></p>
            
            <p>See you there!</p>
            <p><strong>Team Tech Conclave</strong></p>
          </div>
          
          <div class="footer">
            <p>This is an automated confirmation email. Please do not reply to this message.</p>
          </div>
        </body>
      </html>
    `,
  }

  try {
    await sgMail.send(msg)
    console.log('Confirmation email sent successfully')
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    throw error
  }
}