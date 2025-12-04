import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// New registrations data from the user
const newRegistrations = [
  {
    id: "2562504",
    fullName: "Allen Joseph",
    collegeName: "2BTCHE I",
    email: "joseph.allen@btech.christuniversiry.in",
    phone: "8951056405",
    percentage: "96.86",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "",
    attendingWorkshop: "Yes"
  },
  {
    id: "2462374",
    fullName: "Viswakowsik K",
    collegeName: "4 BTCS DS",
    email: "viswakowsik.k@btech.christuniversity.in",
    phone: "9944762559",
    percentage: "81.82",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "",
    attendingWorkshop: "Yes"
  },
  {
    id: "2561049",
    fullName: "Sanjalee Gupta",
    collegeName: "2 BTPHY E",
    email: "sanjalee.gupta@btech.christuniversity.in",
    phone: "8318187737",
    percentage: "84.3",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "",
    attendingWorkshop: "Yes"
  },
  {
    id: "2560132",
    fullName: "Kunal D Nayak",
    collegeName: "2 BTCHE N",
    email: "kunal.d@btech.christuniversity.in",
    phone: "8296754587",
    percentage: "100",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "101458952",
    attendingWorkshop: "Yes"
  },
  {
    id: "2560433",
    fullName: "Rohan Mathews",
    collegeName: "2 BTCHE N",
    email: "rohan.mathews@btech.christuniversity.in",
    phone: "8088490715",
    percentage: "100",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "101540490",
    attendingWorkshop: "Yes"
  },
  {
    id: "2561402",
    fullName: "Aditi Kumari",
    collegeName: "2BTCHE H",
    email: "aditi.kumari@btech.christuniversity.in",
    phone: "8882367764",
    percentage: "84.31",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "",
    attendingWorkshop: "Yes"
  },
  {
    id: "2560410",
    fullName: "Akshobhya Theertha V",
    collegeName: "2 BTCHE N",
    email: "akshobhya.theertha@btech.christuniversity.in",
    phone: "7019707890",
    percentage: "91",
    registrationType: "Non-IEEE Student - 249",
    ieeeMemberId: "",
    attendingWorkshop: "Yes"
  },
  {
    id: "2460321",
    fullName: "Alex Jilson",
    collegeName: "4BTCS B",
    email: "alex.jilson@btech.christuniversity.in",
    phone: "9448263764",
    percentage: "90",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "101070069",
    attendingWorkshop: ""
  },
  {
    id: "2460392",
    fullName: "Kenan Pereira",
    collegeName: "4BTCS A",
    email: "kenan.anil@btech.christuniversity.in",
    phone: "7710849242",
    percentage: "81.45",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "101133155",
    attendingWorkshop: ""
  },
  {
    id: "2362610",
    fullName: "Don Varkey Joshy",
    collegeName: "6BTELCS",
    email: "don.varkey@btech.christuniversity.in",
    phone: "9946440852",
    percentage: "92",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "100878442",
    attendingWorkshop: ""
  },
  {
    id: "2560230",
    fullName: "ELCHURI SHADEER",
    collegeName: "2BTCHE J",
    email: "elchuri.shadeer@btech.christuniversity.in",
    phone: "9502077717",
    percentage: "92",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "101557156",
    attendingWorkshop: "No"
  },
  {
    id: "",
    fullName: "haasini p",
    collegeName: "2BTPHYD",
    email: "haasini.pogaru@btech.christuniversity.in",
    phone: "7483943723",
    percentage: "88.9",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "",
    attendingWorkshop: ""
  },
  {
    id: "2560407",
    fullName: "Adarsh Simon Mammen",
    collegeName: "2 BTCHE N",
    email: "adarshsm4471@gmail.com",
    phone: "9656941794",
    percentage: "84.5",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "101460190",
    attendingWorkshop: "No"
  },
  {
    id: "2560438",
    fullName: "Nathan Philip",
    collegeName: "2 BTCHE N",
    email: "nathanphilip515@gmail.com",
    phone: "8606093339",
    percentage: "83.33",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "101460192",
    attendingWorkshop: "No"
  },
  {
    id: "2560205",
    fullName: "Dhruv V Nair",
    collegeName: "2 BTCHE M",
    email: "dhruvnair3109@gmail.com",
    phone: "9513044702",
    percentage: "",
    registrationType: "Non-IEEE Student - 249",
    ieeeMemberId: "",
    attendingWorkshop: ""
  },
  {
    id: "2560417",
    fullName: "Chhandhass M Kattil",
    collegeName: "2 BTCHE N",
    email: "manjithchandhus@gmail.com",
    phone: "9611370107",
    percentage: "78.43",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "101457392",
    attendingWorkshop: "No"
  },
  {
    id: "2460375",
    fullName: "Jesse Sunil",
    collegeName: "4BTCS A",
    email: "jesse.sunil@btech.christuniversity.in",
    phone: "9074608289",
    percentage: "86",
    registrationType: "IEEE Student - 199",
    ieeeMemberId: "100653538",
    attendingWorkshop: "No"
  },
  {
    id: "2362627",
    fullName: "MOHAMMED RAHOOF",
    collegeName: "6BTELCS",
    email: "mohammed.rahoof@btech.christuniversity.in",
    phone: "8714347275",
    percentage: "97",
    registrationType: "Non-IEEE Student - 249",
    ieeeMemberId: "",
    attendingWorkshop: ""
  }
];

// Helper function to determine registration type and amount
function getRegistrationTypeAndAmount(registrationTypeString) {
  if (registrationTypeString.includes("IEEE Student")) {
    return { type: "ieee_students", amount: 199 };
  } else if (registrationTypeString.includes("Non-IEEE Student")) {
    return { type: "non_ieee_students", amount: 249 };
  } else if (registrationTypeString.includes("IEEE Professional")) {
    return { type: "ieee_professionals", amount: 299 };
  } else if (registrationTypeString.includes("Non-IEEE Professional")) {
    return { type: "non_ieee_professional", amount: 349 };
  } else {
    // Default to IEEE Student if unclear
    return { type: "ieee_students", amount: 199 };
  }
}

async function addNewRegistrations() {
  const uri = process.env.MONGODB_URI || process.env.PROD_MONGODB_URI;
  
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

    console.log('\nAdding new registrations...');
    console.log('═'.repeat(80));

    let addedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const registration of newRegistrations) {
      try {
        // Skip if email is empty
        if (!registration.email || registration.email.trim() === '') {
          console.log(`⚠️  Skipped ${registration.fullName || 'Unknown'} - no email provided`);
          skippedCount++;
          continue;
        }

        // Check if registration already exists
        const existingRegistration = await registrationsCollection.findOne({ 
          email: registration.email.toLowerCase().trim() 
        });

        if (existingRegistration) {
          console.log(`⚠️  Skipped ${registration.fullName} - already registered with email: ${registration.email}`);
          skippedCount++;
          continue;
        }

        // Determine registration type and amount
        const { type: registrationType, amount } = getRegistrationTypeAndAmount(registration.registrationType);

        // Create registration document
        const registrationDoc = {
          fullName: registration.fullName.trim(),
          email: registration.email.toLowerCase().trim(),
          phone: registration.phone.trim(),
          registrationType: registrationType,
          collegeName: registration.collegeName ? registration.collegeName.trim() : undefined,
          organizationName: undefined,
          ieeeMemberId: registration.ieeeMemberId ? registration.ieeeMemberId.trim() : undefined,
          attendingWorkshop: registration.attendingWorkshop === "Yes",
          isPaymentCompleted: true, // Mark as completed since these are confirmed registrations
          confirmationSent: false,
          howDidYouHearAboutUs: "Bulk Registration",
          paymentScreenshot: undefined,
          couponCode: undefined,
          referralOrg: undefined,
          finalAmount: amount,
          checkedIn: false,
          takenLunch: false,
          hadTea: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        // Insert registration
        await registrationsCollection.insertOne(registrationDoc);

        console.log(`✅ Added ${registration.fullName} (${registration.email}) - ${registrationType} - ₹${amount}`);
        addedCount++;

      } catch (error) {
        console.error(`❌ Error adding ${registration.fullName || 'Unknown'}:`, error.message);
        errorCount++;
      }
    }

    console.log('═'.repeat(80));
    console.log(`\nSummary:`);
    console.log(`✅ Successfully added: ${addedCount} registrations`);
    console.log(`⚠️  Skipped (already exists): ${skippedCount} registrations`);
    console.log(`❌ Errors: ${errorCount} registrations`);
    console.log(`📊 Total processed: ${newRegistrations.length} registrations`);

  } catch (error) {
    console.error('Error adding new registrations:', error);
  } finally {
    await client.close();
    console.log('\nMongoDB connection closed');
  }
}

// Run the function
addNewRegistrations().catch(console.error);