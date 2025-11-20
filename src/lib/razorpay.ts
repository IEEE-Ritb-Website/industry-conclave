import Razorpay from 'razorpay'

const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials are not configured')
  }
  
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
}

export const createOrder = async (amount: number, currency: string = 'INR') => {
  try {
    const razorpay = getRazorpayInstance()
    
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: true,
    })
    // console.log('Razorpay order created:', order)
    return order
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    throw error
  }
}

export const verifyPayment = (razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string) => {
  const crypto = require('crypto')
  const secret = process.env.RAZORPAY_KEY_SECRET!
  
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex')

  return generatedSignature === razorpaySignature
}