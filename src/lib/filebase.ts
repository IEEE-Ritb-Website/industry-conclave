import { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'

// Initialize Filebase S3 client
const getFilebaseClient = () => {
  const accessKeyId = process.env.FILEBASE_ACCESS_KEY_ID
  const secretAccessKey = process.env.FILEBASE_SECRET_ACCESS_KEY
  const bucketName = process.env.FILEBASE_BUCKET_NAME
  const endpoint = process.env.FILEBASE_ENDPOINT || 'https://s3.filebase.com'

  if (!accessKeyId || !secretAccessKey || !bucketName) {
    console.error('Filebase credentials not configured')
    return null
  }

  return new S3Client({
    region: 'us-east-1',
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: true, // Required for Filebase
  })
}

// Storage configuration
const STORAGE_CONFIG = {
  bucket_name: process.env.FILEBASE_BUCKET_NAME || '',
  gateway_subdomain: process.env.FILEBASE_GATEWAY_SUBDOMAIN || 'poised-violet-narwhal.myfilebase.com'
}

export interface UploadResult {
  success: boolean
  url?: string
  key?: string
  error?: string
}

export const uploadImageToFilebase = async (
  file: File,
  folder: string = 'payment-screenshots'
): Promise<UploadResult> => {
  try {
    const client = getFilebaseClient()
    if (!client) {
      return {
        success: false,
        error: 'Filebase client not configured'
      }
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        error: 'Only image files are allowed'
      }
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'File size must be less than 5MB'
      }
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const fileExtension = file.name.split('.').pop()
    const filename = `${timestamp}-${randomString}.${fileExtension}`
    const key = `${folder}/${filename}`

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Filebase
    const command = new PutObjectCommand({
      Bucket: STORAGE_CONFIG.bucket_name,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })

    await client.send(command)

    // Get the CID from the object metadata
    const cidResult = await getIpfsCid(key)
    if (!cidResult.success) {
      return {
        success: false,
        error: 'Failed to get IPFS CID after upload'
      }
    }

    const publicUrl = `https://${STORAGE_CONFIG.gateway_subdomain}/ipfs/${cidResult.cid}`

    return {
      success: true,
      url: publicUrl,
      key: key
    }

  } catch (error) {
    console.error('Filebase upload error:', error)
    return {
      success: false,
      error: 'Failed to upload file to Filebase'
    }
  }
}

// Helper function to get IPFS CID from object metadata
const getIpfsCid = async (key: string): Promise<{ success: boolean; cid?: string; error?: string }> => {
  try {
    const client = getFilebaseClient()
    if (!client) {
      return { success: false, error: 'Filebase client not configured' }
    }

    const headCommand = new HeadObjectCommand({
      Bucket: STORAGE_CONFIG.bucket_name,
      Key: key,
    })

    const head = await client.send(headCommand)
    
    if (!head.Metadata || !head.Metadata.cid) {
      throw new Error("CID metadata not found in object head")
    }

    return { success: true, cid: head.Metadata.cid }
  } catch (error) {
    console.error('Error getting IPFS CID:', error)
    return { success: false, error: 'Error getting IPFS CID' }
  }
}

export const deleteImageFromFilebase = async (key: string): Promise<boolean> => {
  try {
    const client = getFilebaseClient()
    if (!client) {
      return false
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.FILEBASE_BUCKET_NAME,
      Key: key,
    })

    await client.send(command)
    return true
  } catch (error) {
    console.error('Filebase delete error:', error)
    return false
  }
}