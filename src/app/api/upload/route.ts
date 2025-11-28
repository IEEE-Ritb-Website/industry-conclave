import { NextRequest, NextResponse } from 'next/server'
import { uploadImageToFilebase } from '@/lib/filebase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Upload to Filebase
    const uploadResult = await uploadImageToFilebase(file, 'payment-screenshots')

    if (!uploadResult.success) {
      return NextResponse.json(
        { error: uploadResult.error || 'Failed to upload file' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      filename: uploadResult.key,
      url: uploadResult.url
    })

  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}