import { MongoClient, Db, Collection, ObjectId } from 'mongodb'

type RegistrationDoc = {
  _id?: ObjectId
  fullName: string
  email: string
  phone: string
  registrationType: 'COLLEGE_STUDENT' | 'IEEE_STUDENT' | 'ORGANIZATION'
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
  const reg = await regCol.findOne({ email: email })
  return reg
}

export const createRegistration = async (data: Partial<RegistrationDoc> & { registrationType: RegistrationDoc['registrationType'] }): Promise<RegistrationDoc> => {
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
    isPaymentCompleted: false,
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
  const regCol = await registrationsCollection()
  const obj = new ObjectId(id)
  const reg = await regCol.findOne({ _id: obj })
  return reg
}

export const getRegistrationById = findRegistrationById

export const updatePaymentStatus = async (registrationId: string, razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string) => {
  const payCol = await paymentsCollection()
  const now = new Date()
  const result = await payCol.updateMany(
    {
      registrationId,
      razorpayOrderId
    },
    {
      $set: {
        razorpayPaymentId,
        razorpaySignature,
        status: 'SUCCESS',
        updatedAt: now
      }
    }
  )
  return result
}

export const setRegistrationPaymentCompleted = async (id: string) => {
  const regCol = await registrationsCollection()
  const obj = new ObjectId(id)
  const now = new Date()
  const result = await regCol.updateOne(
    { _id: obj },
    { $set: { isPaymentCompleted: true, updatedAt: now } }
  )
  return result
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
