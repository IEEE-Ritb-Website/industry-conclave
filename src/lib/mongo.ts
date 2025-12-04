import { MongoClient, Db, Collection, ObjectId } from 'mongodb'
import { RegistrationTypes, CouponCode, CouponCodeUsage } from '@/types'

type RegistrationDoc = {
  _id?: ObjectId
  fullName: string
  email: string
  phone: string
  registrationType: RegistrationTypes
  collegeName?: string
  organizationName?: string
  ieeeMemberId?: string
  attendingWorkshop: boolean
  isPaymentCompleted: boolean
  confirmationSent?: boolean
  howDidYouHearAboutUs?: string
  paymentScreenshot?: string
  couponCode?: string
  referralOrg?: string
  finalAmount?: number
  checkedIn?: boolean
  takenLunch?: boolean
  hadTea?: boolean
  createdAt?: Date
  updatedAt?: Date
}

type PaymentDoc = {
  _id?: ObjectId
  registrationId: string
  amount: number
  currency: string
  razorpayOrderId?: string
  razorpayPaymentId?: string
  razorpaySignature?: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'
  createdAt?: Date
  updatedAt?: Date
}

type CouponCodeDoc = CouponCode & {
  _id?: ObjectId
  createdAt?: Date
  updatedAt?: Date
}

type CouponCodeUsageDoc = CouponCodeUsage & {
  _id?: ObjectId
}

let client: MongoClient | null = null
let db: Db | null = null

const getUri = (): string => {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is not configured')
  }
  return uri
}

const getDb = async (): Promise<Db> => {
  if (db) return db
  const uri = getUri()
  client = new MongoClient(uri)
  await client.connect()
  db = client.db('conclave')
  return db
}

export const registrationsCollection = async (): Promise<Collection<RegistrationDoc>> => {
  const database = await getDb()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return database.collection<RegistrationDoc>('registrations')
}

export const paymentsCollection = async (): Promise<Collection<PaymentDoc>> => {
  const database = await getDb()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return database.collection<PaymentDoc>('payments')
}

export const couponCodesCollection = async (): Promise<Collection<CouponCodeDoc>> => {
  const database = await getDb()
  return database.collection<CouponCodeDoc>('couponCodes')
}

export const couponCodeUsageCollection = async (): Promise<Collection<CouponCodeUsageDoc>> => {
  const database = await getDb()
  return database.collection<CouponCodeUsageDoc>('couponCodeUsage')
}

export const findRegistrationByEmail = async (email: string) => {
  const regCol = await registrationsCollection()
  const reg = await regCol.findOne({ email: email, isPaymentCompleted: true })
  return reg
}

export const createRegistration = async (data: Omit<RegistrationDoc, '_id' | 'createdAt' | 'updatedAt'>): Promise<RegistrationDoc> => {
  const regCol = await registrationsCollection()
  const now = new Date()
const doc: RegistrationDoc = {
    fullName: data.fullName as string,
    email: data.email as string,
    phone: data.phone as string,
    registrationType: data.registrationType,
    collegeName: data.collegeName,
    organizationName: data.organizationName,
    ieeeMemberId: data.ieeeMemberId,
    attendingWorkshop: data.attendingWorkshop ?? false,
    isPaymentCompleted: data.isPaymentCompleted ?? false, // Use provided value or default to false
    howDidYouHearAboutUs: data.howDidYouHearAboutUs,
    paymentScreenshot: data.paymentScreenshot,
    couponCode: data.couponCode,
    referralOrg: data.referralOrg,
    finalAmount: data.finalAmount,
    createdAt: now,
    updatedAt: now
  }
  const result = await regCol.insertOne(doc)
  return { ...doc, _id: result.insertedId }
}

export const createPayment = async (registrationId: string, amount: number, currency: string, razorpayOrderId: string): Promise<PaymentDoc> => {
  const payCol = await paymentsCollection()
  const now = new Date()
  const doc: PaymentDoc = {
    registrationId,
    amount,
    currency,
    razorpayOrderId,
    status: 'PENDING',
    createdAt: now,
    updatedAt: now
  }
  const result = await payCol.insertOne(doc)
  return { ...doc, _id: result.insertedId }
}

export const getRegistrations = async (): Promise<Array<any>> => {
  const regCol = await registrationsCollection()
  // Join payments by registrationId
  const regs = await regCol.aggregate([
    {
      $lookup: {
        from: 'payments',
        localField: '_id',
        foreignField: 'registrationId',
        as: 'payments'
      }
    },
    { $sort: { createdAt: -1 } }
  ]).toArray()
  return regs
}

export const findRegistrationById = async (id: string) => {
  // console.log('Finding registration with id:', id)
  try {
    const regCol = await registrationsCollection()
    const obj = new ObjectId(id)
    // console.log('ObjectId for find:', obj)
    const reg = await regCol.findOne({ _id: obj })
    console.log('Found registration:', reg ? 'yes' : 'no')
    if (reg) {
      console.log('Registration payment status:', reg.isPaymentCompleted)
    }
    return reg
  } catch (error) {
    console.error('Error in findRegistrationById:', error)
    throw error
  }
}

export const getRegistrationById = findRegistrationById

export const setRegistrationPaymentCompleted = async (id: string) => {
  console.log('Attempting to update registration with id:', id)
  try {
    const regCol = await registrationsCollection()
    const obj = new ObjectId(id)
    console.log('ObjectId created:', obj)
    const now = new Date()
    const result = await regCol.updateOne(
      { _id: obj },
      { $set: { isPaymentCompleted: true, updatedAt: now } }
    )
    // console.log('Update operation completed:', result)
    return result
  } catch (error) {
    console.error('Error in setRegistrationPaymentCompleted:', error)
    throw error
  }
}

export const setConfirmationSent = async (id: string): Promise<boolean> => {
  try {
    const regCol = await registrationsCollection()
    const obj = new ObjectId(id)
    const now = new Date()
    const result = await regCol.updateOne(
      { _id: obj },
      { $set: { confirmationSent: true, updatedAt: now } }
    )
    return result.modifiedCount > 0
  } catch (error) {
    console.error('Error in setConfirmationSent:', error)
    throw error
  }
}

export const setRegistrationCheckInStatus = async (id: string, action: string): Promise<{ modifiedCount: number }> => {
  try {
    const regCol = await registrationsCollection()
    const obj = new ObjectId(id)
    const now = new Date()
    
    // Validate action
    const validActions = ['checkedIn', 'takenLunch', 'hadTea']
    if (!validActions.includes(action)) {
      throw new Error('Invalid action')
    }

    const result = await regCol.updateOne(
      { _id: obj },
      { $set: { [action]: true, updatedAt: now } }
    )
    return result
  } catch (error) {
    console.error('Error in setRegistrationCheckInStatus:', error)
    throw error
  }
}

export const getRegistrationForEmail = async (id: string) => {
  const regCol = await registrationsCollection()
  const reg = await regCol.findOne({ _id: new ObjectId(id) })
  return reg
}

export const validateCouponCode = async (couponCode: string, registrationType: RegistrationTypes, referralOrg?: string, email?: string): Promise<{ valid: boolean; discount?: number; error?: string }> => {
  try {
    const couponCol = await couponCodesCollection()
    const usageCol = await couponCodeUsageCollection()
    const regCol = await registrationsCollection()
    
    // Find the coupon code
    const coupon = await couponCol.findOne({ couponCode: couponCode.toUpperCase() })
    
    if (!coupon) {
      return { valid: false, error: 'Invalid coupon code' }
    }
    
    // Check if coupon is valid for specific emails
    if (coupon.validFor && coupon.validFor.length > 0) {
      if (!email) {
        return { valid: false, error: 'This coupon code requires a valid email address' }
      }
      
      if (!coupon.validFor.includes(email.toLowerCase())) {
        return { valid: false, error: 'This coupon code is not valid for you' }
      }
    }
    
    // Check if coupon is organization-specific and if referral org matches
    if (coupon.referralType && coupon.referralType.length > 0) {
      if (!referralOrg) {
        return { valid: false, error: 'This coupon code requires a valid organization referral' }
      }
      
      if (!coupon.referralType.includes(referralOrg.toLowerCase())) {
        return { valid: false, error: `This coupon code is only valid for: ${coupon.referralType.join(', ')}. Current referral: ${referralOrg}` }
      }
    }
    
    // Check usage limit if maxLimit is specified
    if (coupon.maxLimit !== undefined) {
      const usageCount = await usageCol.countDocuments({ couponCode: couponCode.toUpperCase() })
      if (usageCount >= coupon.maxLimit) {
        return { valid: false, error: 'Coupon usage limit exceeded' }
      }
    }
    
    return { valid: true, discount: coupon.discount }
  } catch (error) {
    console.error('Error validating coupon code:', error)
    return { valid: false, error: 'Failed to validate coupon code' }
  }
}

export const useCouponCode = async (couponCode: string, registrationId: string): Promise<boolean> => {
  try {
    const usageCol = await couponCodeUsageCollection()
    const now = new Date()
    
    const result = await usageCol.insertOne({
      couponCode: couponCode.toUpperCase(),
      registrationId,
      usedAt: now
    })
    
    return result.acknowledged
  } catch (error) {
    console.error('Error using coupon code:', error)
    return false
  }
}

export const createCouponCode = async (couponData: CouponCode): Promise<CouponCodeDoc> => {
  try {
    const couponCol = await couponCodesCollection()
    const now = new Date()
    
    const doc: CouponCodeDoc = {
      ...couponData,
      couponCode: couponData.couponCode.toUpperCase(),
      createdAt: now,
      updatedAt: now
    }
    
    const result = await couponCol.insertOne(doc)
    return { ...doc, _id: result.insertedId }
  } catch (error) {
    console.error('Error creating coupon code:', error)
    throw error
  }
}

export const getRegistrationTypeNames = (): Record<RegistrationTypes, string> => {
  return {
    [RegistrationTypes.NON_IEEE_PROFESSIONALS]: "Non-IEEE Professional",
    [RegistrationTypes.NON_IEEE_STUDENTS]: "Non-IEEE Student", 
    [RegistrationTypes.IEEE_PROFESSIONALS]: "IEEE Professional",
    [RegistrationTypes.IEEE_STUDENTS]: "IEEE Student",
    [RegistrationTypes.COLLEGE_STUDENTS]: "MSRIT Student",
    [RegistrationTypes.COLLEGE_EXECOM]: "MSRIT Execom",
  }
}

export const closeMongoConnection = async () => {
  if (client) {
    await client.close()
  }
}
