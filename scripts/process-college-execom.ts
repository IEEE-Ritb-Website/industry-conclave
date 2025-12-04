import { MongoClient } from 'mongodb'
import { sendConfirmationEmail } from '../src/lib/email'
import { RegistrationTypes } from '../src/types'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// List of college execom registrations to process
const collegeExecomList = [
  {
    email: 'test@gmail.com',
    name: 'test',
    usn: 'test usn',
    phone: 'asdfasdf',
    altEmail: 'test@gmail.com',
    registrationId: 'testid'
  },
]

// MongoDB connection
const getUri = (): string => {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is not configured')
  }
  return uri
}

const processCollegeExecom = async () => {
  const client = new MongoClient(getUri())
  
  try {
    await client.connect()
    const db = client.db('conclave')
    const registrationsCollection = db.collection('registrations')
    
    console.log(`Processing ${collegeExecomList.length} college execom registrations...`)
    
    for (const person of collegeExecomList) {
      console.log(`\nProcessing: ${person.name} (${person.email})`)
      
      try {
        // Check if registration already exists
        const existingReg = await registrationsCollection.findOne({
          $or: [
            { email: person.email },
            { email: person.altEmail }
          ]
        })
        
        if (existingReg) {
          console.log(`Registration already exists for ${person.email}`)
          
          // Update to college_execom type if not already set
          if (existingReg.registrationType !== RegistrationTypes.COLLEGE_EXECOM) {
            await registrationsCollection.updateOne(
              { _id: existingReg._id },
              { 
                $set: { 
                  registrationType: RegistrationTypes.COLLEGE_EXECOM,
                  updatedAt: new Date()
                }
              }
            )
            console.log(`Updated registration type to college_execom for ${person.email}`)
          }
          
          // Send confirmation email if not already sent
          if (!existingReg.confirmationSent) {
            try {
              await sendConfirmationEmail(
                person.email,
                person.name,
                existingReg._id.toString(),
                RegistrationTypes.COLLEGE_EXECOM
              )
              
              // Mark confirmation as sent
              await registrationsCollection.updateOne(
                { _id: existingReg._id },
                { 
                  $set: { 
                    confirmationSent: true,
                    updatedAt: new Date()
                  }
                }
              )
              
              console.log(`Confirmation email sent to ${person.email}`)
            } catch (emailError) {
              console.error(`Failed to send confirmation email to ${person.email}:`, emailError)
            }
          } else {
            console.log(`Confirmation email already sent to ${person.email}`)
          }
        } else {
          console.log(`Creating new registration for ${person.email}`)
          
          // Create new registration
          const now = new Date()
          const result = await registrationsCollection.insertOne({
            fullName: person.name,
            email: person.email,
            phone: person.phone,
            registrationType: RegistrationTypes.COLLEGE_EXECOM,
            collegeName: 'MSRIT',
            attendingWorkshop: true,
            isPaymentCompleted: true,
            confirmationSent: false,
            howDidYouHearAboutUs: 'College Execom',
            createdAt: now,
            updatedAt: now
          })
          
          console.log(`Created new registration with ID: ${result.insertedId}`)
          
          // Send confirmation email
          try {
            await sendConfirmationEmail(
              person.email,
              person.name,
              result.insertedId.toString(),
              RegistrationTypes.COLLEGE_EXECOM
            )
            
            // Mark confirmation as sent
            await registrationsCollection.updateOne(
              { _id: result.insertedId },
              { 
                $set: { 
                  confirmationSent: true,
                  updatedAt: new Date()
                }
              }
            )
            
            console.log(`Confirmation email sent to ${person.email}`)
          } catch (emailError) {
            console.error(`Failed to send confirmation email to ${person.email}:`, emailError)
          }
        }
      } catch (error) {
        console.error(`Error processing ${person.email}:`, error)
      }
    }
    
    console.log('\n✅ College execom processing completed!')
    
  } catch (error) {
    console.error('❌ Error in processCollegeExecom:', error)
  } finally {
    await client.close()
  }
}

// Run the script
processCollegeExecom().catch(console.error)