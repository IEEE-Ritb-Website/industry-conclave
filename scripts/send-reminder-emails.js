import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Email configuration
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@conclave.com';
const REPLY_TO = process.env.REPLY_TO || 'team@conclave.com';

// Email content template
const getEmailContent = () => {
  return "🚀 Important: Instructions & Schedule Reminder – Industry Conclave '25\n\n" +
    "Dear Participants,\n\n" +
    "Warm greetings from the organizing team of the **IEEE CIS Industry Conclave '25** at Ramaiah Institute of Technology!\n\n" +
    "This is your essential reminder that the Conclave is scheduled for the *5th and 6th of December*. We are excited to welcome you to this two-day event!\n\n" +
    "Lunch and refreshments are included with your pass for both days.\n\n" +
    "Please find the attached event brochure for further details.\n\n" +
    "*General Rules & Regulations:*\n\n" +
    "* Dress Code:* Please follow appropriate dress code for this professional event.\n" +
    "* Conduct:* Strict discipline and decorum must be maintained throughout.\n" +
    "* Mobile Use:* Please keep your mobile phones on *silent mode* during all sessions.\n" +
    "* Prohibitions:* Smoking, drinking, or possession of illegal substances is strictly prohibited on campus.\n" +
    "* Adherence:* Kindly follow all instructions given by event coordinators and volunteers. Misconduct will lead to immediate disqualification.\n" +
    "* Registration:* Registration passes will be issued at the *Apex Block Auditorium* upon arrival\n" +
    "* Verification:* Kindly carry a *valid college ID card* for verification.\n\n" +
    "We look forward to an insightful and engaging two days with you!\n\n" +
    "Warm regards,\n\n" +
    "*The Organizing Team*\n" +
    "IEEE Computational Intelligence Society (CIS), Ramaiah Institute of Technology";
};

// Function to send email via Resend (or your preferred email service)
async function sendEmail(toEmail, subject, htmlContent) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [toEmail],
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to send email:', errorData);
      return { success: false, error: errorData };
    }

    const data = await response.json();
    console.log(`Email sent successfully to ${toEmail}:`, data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

// Main function to send reminder emails
async function sendReminderEmails() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('MONGODB_URI environment variable is not set');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('conclave');
    const registrationsCollection = db.collection('registrations');

    // Get all participants with payment completed
    const participants = await registrationsCollection.find(
      { isPaymentCompleted: true },
      { 
        projection: { 
          email: 1, 
          fullName: 1,
          _id: 0 
        } 
      }
    ).toArray();

    if (participants.length === 0) {
      console.log('No participants found with completed payments');
      return;
    }

    console.log(`Found ${participants.length} participants to send reminder emails`);

    // Send emails to all participants
    let successCount = 0;
    let failureCount = 0;

    for (const participant of participants) {
      const result = await sendEmail(
        participant.email,
        '🚀 Important: Instructions & Schedule Reminder – Industry Conclave \'25',
        getEmailContent()
      );

      if (result.success) {
        successCount++;
        console.log(`✅ Email sent to ${participant.fullName} (${participant.email})`);
      } else {
        failureCount++;
        console.error(`❌ Failed to send email to ${participant.fullName} (${participant.email}):`, result.error);
      }

      // Add delay to avoid rate limiting (1 second between emails)
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n=== Email Sending Summary ===');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failureCount}`);
    console.log(`📊 Total: ${participants.length}`);

    if (failureCount > 0) {
      console.log('\nFailed email details:');
      console.log('Please check:');
      console.log('1. RESEND_API_KEY environment variable');
      console.log('2. Email service configuration');
      console.log('3. Network connectivity');
      console.log('4. Rate limits');
    }

  } catch (error) {
    console.error('Error connecting to MongoDB or sending emails:', error);
  } finally {
    await client.close();
    console.log('\nMongoDB connection closed');
  }
}

// Function to send to specific email list
async function sendToSpecificEmails(emailList) {
  if (!emailList || emailList.length === 0) {
    console.log('No email addresses provided');
    return;
  }

  console.log(`Sending reminder emails to ${emailList.length} specific addresses`);

  let successCount = 0;
  let failureCount = 0;

  for (const email of emailList) {
    const result = await sendEmail(
      email.trim(),
      '🚀 Important: Instructions & Schedule Reminder – Industry Conclave \'25',
      getEmailContent()
    );

    if (result.success) {
      successCount++;
      console.log(`✅ Email sent to ${email}`);
    } else {
      failureCount++;
      console.error(`❌ Failed to send email to ${email}:`, result.error);
    }

    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n=== Specific Email List Summary ===');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failureCount}`);
  console.log(`📊 Total: ${emailList.length}`);
}

// Function to send to participants from a specific college
async function sendToCollegeParticipants(collegeName) {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('MONGODB_URI environment variable is not set');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log(`Connected to MongoDB - filtering by college: ${collegeName}`);

    const db = client.db('conclave');
    const registrationsCollection = db.collection('registrations');

    const participants = await registrationsCollection.find(
      { 
        isPaymentCompleted: true,
        collegeName: { $regex: collegeName, $options: 'i' }
      },
      { 
        projection: { 
          email: 1, 
          fullName: 1,
          collegeName: 1,
          _id: 0 
        } 
      }
    ).toArray();

    if (participants.length === 0) {
      console.log(`No participants found from college: ${collegeName}`);
      return;
    }

    console.log(`Found ${participants.length} participants from ${collegeName}`);
    await sendEmailsToList(participants);
    
  } catch (error) {
    console.error('Error connecting to MongoDB or sending emails:', error);
  } finally {
    await client.close();
  }
}

// Function to send to participants by registration type
async function sendToTypeParticipants(registrationTypes) {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('MONGODB_URI environment variable is not set');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log(`Connected to MongoDB - filtering by types: ${registrationTypes.join(', ')}`);

    const db = client.db('conclave');
    const registrationsCollection = db.collection('registrations');

    const participants = await registrationsCollection.find(
      { 
        isPaymentCompleted: true,
        registrationType: { $in: registrationTypes }
      },
      { 
        projection: { 
          email: 1, 
          fullName: 1,
          registrationType: 1,
          _id: 0 
        } 
      }
    ).toArray();

    if (participants.length === 0) {
      console.log(`No participants found for types: ${registrationTypes.join(', ')}`);
      return;
    }

    console.log(`Found ${participants.length} participants for types: ${registrationTypes.join(', ')}`);
    await sendEmailsToList(participants);
    
  } catch (error) {
    console.error('Error connecting to MongoDB or sending emails:', error);
  } finally {
    await client.close();
  }
}

// Helper function to send emails to a list of participants
async function sendEmailsToList(participants) {
  let successCount = 0;
  let failureCount = 0;

  for (const participant of participants) {
    const result = await sendEmail(
      participant.email,
      '🚀 Important: Instructions & Schedule Reminder – Industry Conclave \'25',
      getEmailContent()
    );

    if (result.success) {
      successCount++;
      console.log(`✅ Email sent to ${participant.fullName} (${participant.email})`);
    } else {
      failureCount++;
      console.error(`❌ Failed to send email to ${participant.fullName} (${participant.email}):`, result.error);
    }

    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n=== Email Sending Summary ===');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failureCount}`);
  console.log(`📊 Total: ${participants.length}`);
}

// CLI handler
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
📧 IEEE Industry Conclave '25 - Email Reminder Script

Usage:
  node scripts/send-reminder-emails.js [option]

Options:
  1. Send to all participants with completed payments:
     node scripts/send-reminder-emails.js --all

  2. Send to specific email addresses:
     node scripts/send-reminder-emails.js --emails "email1@example.com,email2@example.com,email3@example.com"

  3. Send to participants from a specific college:
     node scripts/send-reminder-emails.js --college "Ramaiah Institute of Technology"

  4. Send to specific registration types:
     node scripts/send-reminder-emails.js --type "college_students,ieee_students"

Examples:
  node scripts/send-reminder-emails.js --all
  node scripts/send-reminder-emails.js --emails "student1@college.com,student2@college.com"
  node scripts/send-reminder-emails.js --college "MSRIT"
    `);
    process.exit(0);
  }

  const option = args[0];

  switch (option) {
    case '--all':
      await sendReminderEmails();
      break;
      
    case '--emails':
      const emailList = args[1]?.split(',').map(email => email.trim());
      if (!emailList || emailList.length === 0) {
        console.error('Please provide email addresses: --emails "email1@example.com,email2@example.com"');
        process.exit(1);
      }
      await sendToSpecificEmails(emailList);
      break;
      
    case '--college':
      const collegeName = args[1];
      if (!collegeName) {
        console.error('Please provide college name: --college "Ramaiah Institute of Technology"');
        process.exit(1);
      }
      await sendToCollegeParticipants(collegeName);
      break;
      
    case '--type':
      const registrationTypes = args[1]?.split(',').map(type => type.trim());
      if (!registrationTypes || registrationTypes.length === 0) {
        console.error('Please provide registration types: --type "college_students,ieee_students"');
        process.exit(1);
      }
      await sendToTypeParticipants(registrationTypes);
      break;
      
    default:
      console.error(`Unknown option: ${option}`);
      console.log('Use --all, --emails, --college, or --type');
      process.exit(1);
  }
}

// Run the script
main().catch(console.error);