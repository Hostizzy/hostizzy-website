import { NextResponse } from 'next/server';
import { uploadImage, uploadMultipleImages } from '@/lib/cloudinary';

export async function POST(request) {
  try {
    const body = await request.json();
    const { image, images, folder = 'hostizzy' } = body;

    // Handle single image upload
    if (image) {
      const result = await uploadImage(image, folder);
      return NextResponse.json({
        success: true,
        url: result.url,
        publicId: result.publicId
      });
    }

    // Handle multiple image uploads
    if (images && Array.isArray(images)) {
      const results = await uploadMultipleImages(images, folder);
      return NextResponse.json({
        success: true,
        images: results.map(r => ({ url: r.url, publicId: r.publicId }))
      });
    }

    return NextResponse.json(
      { success: false, error: 'No image data provided' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
