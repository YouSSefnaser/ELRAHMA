import { NextRequest, NextResponse } from 'next/server';
import { getImagesByCategory } from '@/lib/local-media';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'general';
  const count = searchParams.get('count') ? parseInt(searchParams.get('count')!) : undefined;

  try {
    // الحصول على الصور المحلية
    const images = getImagesByCategory(category, count);

    return NextResponse.json(images);

  } catch (error) {
    console.error('Error getting local images:', error);

    return NextResponse.json(
      { error: 'Failed to get images' },
      { status: 500 }
    );
  }
}
