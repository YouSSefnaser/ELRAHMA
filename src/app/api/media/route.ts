import { NextRequest, NextResponse } from 'next/server';
import { getLocalMedia } from '@/lib/local-media';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pathname = searchParams.get('pathname') || '/api/media';

    const manifest = getLocalMedia(pathname);

    // Cache: public for 1 minute on server and client
    return new NextResponse(JSON.stringify(manifest), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error getting local media:', error);
    return NextResponse.json({ images: [], videos: [], error: 'Failed to get media' }, { status: 500 });
  }
}
