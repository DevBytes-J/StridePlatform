import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { eventType, stepId } = body;
    
    console.log('=== ANALYTICS EVENT ===');
    console.log('Tour ID:', id);
    console.log('Event Type:', eventType);
    console.log('Step ID:', stepId);
    console.log('======================');

    // Simple test - just return success for now
    return NextResponse.json({ 
      success: true, 
      received: { tourId: id, eventType, stepId },
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Failed to track event:', error);
    return NextResponse.json({ 
      error: 'Failed to track event',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
