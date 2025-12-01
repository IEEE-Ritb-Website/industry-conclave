import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function updatePaymentStatus() {
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
    
    // First, let's find documents that match our criteria
    const matchingDocs = await registrationsCollection.find({
      paymentScreenshot: { $exists: true, $ne: null, $ne: "" },
      // isPaymentCompleted: false
    }).toArray();
    
    console.log(`Found ${matchingDocs.length} documents with paymentScreenshot`);
    
    // Show all matching documents
    if (matchingDocs.length > 0) {
      console.log('All documents with paymentScreenshot:');
      matchingDocs.forEach((doc, index) => {
        console.log(`${index + 1}. Email: ${doc.email}, isPaymentCompleted: ${doc.isPaymentCompleted}, Created: ${doc.createdAt}`);
      });
    }
    
    // Update all documents with paymentScreenshot defined but isPaymentCompleted is false
    // const result = await registrationsCollection.updateMany(
    //   {
    //     paymentScreenshot: { $exists: true, $ne: null, $ne: "" },
    //     isPaymentCompleted: false
    //   },
    //   {
    //     $set: { isPaymentCompleted: true }
    //   }
    // );
    
    // console.log(`Updated ${result.modifiedCount} documents`);
    
  } catch (error) {
    console.error('Error updating payment status:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

updatePaymentStatus().catch(console.error);