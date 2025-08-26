import { NextRequest, NextResponse } from 'next/server';
import { getVideosByCategory } from '@/lib/local-media';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'general';
  const count = searchParams.get('count') ? parseInt(searchParams.get('count')!) : undefined;

  try {
    // الحصول على الفيديوهات المحلية
    const videos = getVideosByCategory(category, count);

    return NextResponse.json(videos);

  } catch (error) {
    console.error('Error getting local videos:', error);

    return NextResponse.json(
      { error: 'Failed to get videos' },
      { status: 500 }
    );
  }
}
