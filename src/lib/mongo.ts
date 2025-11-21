import { MongoClient, Db, Collection, ObjectId } from 'mongodb'
import { RegistrationTypes } from '@/types'

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
    isPaymentCompleted: false, // Initially false, will be set to true after payment verification
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

export const getRegistrationForEmail = async (id: string) => {
  const regCol = await registrationsCollection()
  const reg = await regCol.findOne({ _id: new ObjectId(id) })
  return reg
}

export const closeMongoConnection = async () => {
  if (client) {
    await client.close()
  }
}
