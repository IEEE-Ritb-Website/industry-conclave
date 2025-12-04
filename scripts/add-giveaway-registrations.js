import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Giveaway registrations data
const giveawayRegistrations = [
  {
    fullName: "Ankitha B",
    email: "ankithab0802@gmail.com",
    phone: "6366798046",
    usn: "1MS25DS002-T",
  },
  {
    fullName: "Vishal B R",
    email: "visbr7@gmail.com",
    phone: "9008103087",
    usn: "1MS25DS004-T",
  },
  {
    fullName: "Darshan C",
    email: "darshanchannegowda21@gmail.com",
    phone: "8296142845",
    usn: "1MS25DS014-T",
  },
  {
    fullName: "Hemanth Kumar M",
    email: "hemanthgowda.0805@gmail.com",
    phone: "9900871928",
    usn: "1MS25DS015-T",
  },
  {
    fullName: "J S Shreyas",
    email: "shreyas12js@gmail.com",
    phone: "9902913819",
    usn: "1MS25DS003-T",
  },
  {
    fullName: "Bhavesh A Jadhav",
    email: "bhaveshjadhav718@gmail.com",
    phone: "9845539876",
    usn: "1MS25DS012-T",
  },
  {
    fullName: "Ashish Pawar",
    email: "imashishgpawar@gmail.com",
    phone: "9113580037",
    usn: "1MS25DS013-T",
  },
  {
    fullName: "Shreyas C R",
    email: "chaluvapathishreyas@gmail.com",
    phone: "8660704307",
    usn: "1MS25DS001-T",
  },
  {
    fullName: "Aadhya A",
    email: "aadhyababu@gmail.com",
    phone: "8147297635",
    usn: "1MS25DS006-T",
  },
  {
    fullName: "Varshini R H",
    email: "varshinirajashekar83@gmail.com",
    phone: "7892017335",
    usn: "1MS25DS016-T",
  },
  {
    fullName: "Nisarga Kalkoor T",
    email: "nisargakalkoor05@gmail.com",
    phone: "9481294477",
    usn: "1MS25DS009-T",
  },
  {
    fullName: "Anand D N",
    email: "ananddn04@gmai.com",
    phone: "9148166544",
    usn: "1MS25DS010-T",
  },
  {
    fullName: "Manish Singh",
    email: "manishsingh16032003@gmail.com",
    phone: "8660920917",
    usn: "1MS25DS008-T",
  },
  {
    fullName: "Sanjay S",
    email: "sanjay.work.1912@gmail.com",
    phone: "9513150139",
    usn: "1MS25DS005-T",
  },
  {
    fullName: "R Chandra Babu",
    email: "Sumithanandak@gmail.com",
    phone: "8073628385",
    usn: "1MS25DS011-T",
  },
  {
    fullName: "Arun Kumar",
    email: "arunkumarr90085@gmail.com",
    phone: "7019232355",
    usn: "1MS25DS007-T",
  },
  {
    fullName: "Bhoomika K Kottary",
    email: "bkottary2005@gmail.com",
    phone: "8147016306",
    usn: "",
  },
  {
    fullName: "Ankitha D",
    email: "1ms24ad010@msrit.edu",
    phone: "7795240619",
    usn: "1MS24AD010",
  },
  {
    fullName: "Chethan Kumar M U",
    email: "chethankumarmu.716@gmail.com",
    phone: "9019075019",
    usn: "1MS24CS052",
  },
  {
    fullName: "Sourav Kumar Sahu",
    email: "Lcs.souravkrsahu@gmail.com",
    phone: "7254856546",
    usn: "1MS24CY063",
  },
  {
    fullName: "Debasmita Kundu",
    email: "debasmitak2020@gmail.com",
    phone: "6291557708",
    usn: "1MS25EE050-T",
  },
  {
    fullName: "Maria Ratna",
    email: "mariaratna183@gmail.com",
    phone: "8792840608",
    usn: "1MS23AD037",
  },
  {
    fullName: "Rekha HN",
    email: "rekhahn25ec@rnsit.ac.in",
    phone: "8880277757",
    usn: "1RN25EC257-T",
  },
  {
    fullName: "Sanchana J",
    email: "sanchanaj25ec@rnsit.ac.in",
    phone: "9902453737",
    usn: "1RN25EC252-T",
  },
  {
    fullName: "Dhanya P",
    email: "dhanyap25ec@rnsit.ac.in",
    phone: "8197538308",
    usn: "1RN25EC193-T",
  }
];

async function addGiveawayRegistrations() {
  const uri = process.env.PROD_MONGODB_URI;
  
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
    const couponCodesCollection = db.collection('couponCodes');

    // First, create the giveaway coupon code if it doesn't exist
    const existingCoupon = await couponCodesCollection.findOne({ couponCode: 'GIVEAWAY' });
    
    if (!existingCoupon) {
      const giveawayCoupon = {
        couponCode: 'GIVEAWAY',
        referralType: [], // Available to everyone
        maxLimit: 100,
        discount: 1.0, // 100% discount
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await couponCodesCollection.insertOne(giveawayCoupon);
      console.log('Created GIVEAWAY coupon code');
    } else {
      console.log('GIVEAWAY coupon code already exists');
    }

    console.log('\nAdding giveaway registrations...');
    console.log('═'.repeat(80));

    let addedCount = 0;
    let skippedCount = 0;

    for (const registration of giveawayRegistrations) {
      // Check if registration already exists
      const existingRegistration = await registrationsCollection.findOne({ 
        email: registration.email.toLowerCase() 
      });

      if (existingRegistration) {
        console.log(`⚠️  Skipped ${registration.fullName} - already registered`);
        skippedCount++;
        continue;
      }

      // Create registration document
      const registrationDoc = {
        fullName: registration.fullName,
        email: registration.email.toLowerCase(),
        phone: registration.phone,
        registrationType: "Giveaway", // Using college_students as base type
        collegeName: registration.collegeName, // Default college
        ieeeMemberId: undefined,
        attendingWorkshop: true,
        isPaymentCompleted: true, // Payment completed for giveaway
        confirmationSent: false,
        howDidYouHearAboutUs: "Giveaway",
        paymentScreenshot: undefined,
        couponCode: "GIVEAWAY",
        finalAmount: 0,
        checkedIn: false,
        takenLunch: false,
        hadTea: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Insert registration
      const registrationResult = await registrationsCollection.insertOne(registrationDoc);

      console.log(`✅ Added ${registration.fullName} (${registration.email})`);
      addedCount++;
    }

    console.log('═'.repeat(80));
    console.log(`\nSummary:`);
    console.log(`✅ Successfully added: ${addedCount} registrations`);
    console.log(`⚠️  Skipped (already exists): ${skippedCount} registrations`);
    console.log(`📊 Total processed: ${giveawayRegistrations.length} registrations`);

    // Display coupon usage info
    const couponUsage = await registrationsCollection.countDocuments({ 
      couponCode: 'GIVEAWAY' 
    });
    console.log(`🎫 GIVEAWAY coupon usage: ${couponUsage}/${existingCoupon?.maxLimit || 100}`);

  } catch (error) {
    console.error('Error adding giveaway registrations:', error);
  } finally {
    await client.close();
    console.log('\nMongoDB connection closed');
  }
}

// Run the function
addGiveawayRegistrations().catch(console.error);