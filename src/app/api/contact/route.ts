import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const data = await request.json();
    
    // Log the received data (for demonstration purposes)
    console.log('Contact form submission:', data);
    
    // Here you would typically:
    // 1. Validate the data
    // 2. Store in database or send email
    // 3. Handle any errors
    
    // For now, we'll just return a success response
    return NextResponse.json({ ok: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to submit form' },
      { status: 500 }
    );
  }
}