import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Test coupon codes to seed with organization-based and email-based restrictions
const testCouponCodes = [
  {
    couponCode: 'EARLY2025',
    referralType: [], // Empty array means applicable to everyone
    maxLimit: 100,
    discount: 0.1 // 10% discount
  },
  {
    couponCode: 'UNLIMITED25',
    referralType: [], // Applicable to everyone
    // No maxLimit - unlimited usage
    discount: 0.25 // 25% discount
  },
  {
    couponCode: 'IISC2025',
    referralType: ['iisc'], // Only for IISC organization
    maxLimit: 50,
    discount: 0.25 // 25% discount
  },
  {
    couponCode: 'MSRIT2025',
    referralType: ['msrit'], // Only for MSRIT organization
    maxLimit: 100,
    discount: 0.5 // 50% discount
  },
  {
    couponCode: 'IEEEBANGALORE',
    referralType: ['ieee_bangalore'], // Only for IEEE Bangalore chapter
    maxLimit: 30,
    discount: 0.15 // 15% discount
  },
  {
    couponCode: 'CORPORATE20',
    referralType: ['corporate_partner'], // Only for corporate partners
    maxLimit: 25,
    discount: 0.2 // 20% discount
  },
  {
    couponCode: 'FLASH30',
    referralType: [], // Applicable to everyone
    maxLimit: 10,
    discount: 0.3 // 30% discount
  },
  {
    couponCode: 'STUDENT15',
    referralType: ['student_org'], // Only for student organizations
    maxLimit: 75,
    discount: 0.15 // 15% discount
  },
  {
    couponCode: 'FACULTY25',
    referralType: ['faculty'], // Only for faculty members
    maxLimit: 40,
    discount: 0.25 // 25% discount
  },
  {
    couponCode: 'ALUMNI20',
    referralType: ['alumni'], // Only for alumni
    maxLimit: 60,
    discount: 0.2 // 20% discount
  },
  {
    couponCode: 'SPECIAL50',
    referralType: [], // Applicable to everyone
    validFor: ['john.doe@example.com', 'jane.smith@example.com', 'admin@conclave.com'], // Only for specific emails
    maxLimit: 5,
    discount: 0.5 // 50% discount
  },
  {
    couponCode: 'VIP40',
    referralType: [], // Applicable to everyone
    validFor: ['vip@conclave.com', 'speaker@conclave.com', 'sponsor@conclave.com'], // Only for VIP emails
    // No maxLimit - unlimited for these specific emails
    discount: 0.4 // 40% discount
  },
  {
    couponCode: 'TEST35',
    referralType: ['test_org'], // Only for test organization
    validFor: ['test@conclave.com', 'demo@conclave.com'], // Only for specific test emails
    maxLimit: 20,
    discount: 0.35 // 35% discount
  },
  {
    couponCode: 'NOLIMIT10',
    referralType: [], // Applicable to everyone
    // No maxLimit - unlimited usage
    discount: 0.1 // 10% discount
  }
];

async function seedCouponCodes() {
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
    const couponCodesCollection = db.collection('couponCodes');

    // Clear existing coupon codes
    await couponCodesCollection.deleteMany({});
    console.log('Cleared existing coupon codes');

    // Insert test coupon codes
    const result = await couponCodesCollection.insertMany(testCouponCodes);
    console.log(`Successfully inserted ${result.insertedCount} coupon codes`);

    // Display inserted coupon codes
    console.log('\nInserted coupon codes:');
    console.log('═'.repeat(80));
    
    for (const coupon of testCouponCodes) {
      let restrictions = [];
      
      if (coupon.referralType && coupon.referralType.length > 0) {
        restrictions.push(`Organization(s): ${coupon.referralType.join(', ')}`);
      }
      
      if (coupon.validFor && coupon.validFor.length > 0) {
        restrictions.push(`Email(s): ${coupon.validFor.join(', ')}`);
      }
      
      if (restrictions.length === 0) {
        restrictions.push('Available to everyone');
      }
      
      const maxUsesText = coupon.maxLimit !== undefined ? coupon.maxLimit : 'Unlimited';
      
      console.log(`🎫 ${coupon.couponCode}`);
      console.log(`   Discount: ${coupon.discount * 100}% off`);
      console.log(`   Max Uses: ${maxUsesText}`);
      console.log(`   Restrictions: ${restrictions.join(' | ')}`);
      console.log('─'.repeat(50));
    }
    
    console.log('\nUsage Examples:');
    console.log('General coupon: http://localhost:3000/register/college_students?coupon=EARLY2025');
    console.log('Unlimited coupon: http://localhost:3000/register/college_students?coupon=UNLIMITED25');
    console.log('Org-specific: http://localhost:3000/register/college_students?coupon=IISC2025&referral=iisc');
    console.log('Email-specific: http://localhost:3000/register/college_students?coupon=SPECIAL50 (only for john.doe@example.com, jane.smith@example.com, admin@conclave.com)');
    console.log('Combined restrictions: http://localhost:3000/register/college_students?coupon=TEST35&referral=test_org (only for test@conclave.com, demo@conclave.com)');
    console.log('═'.repeat(80));

  } catch (error) {
    console.error('Error seeding coupon codes:', error);
  } finally {
    await client.close();
    console.log('\nMongoDB connection closed');
  }
}

// Run the seeding function
seedCouponCodes().catch(console.error);