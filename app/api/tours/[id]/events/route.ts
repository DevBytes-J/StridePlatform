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
    
    console.log('Tour event:', { tourId: id, eventType, stepId });

    // Update tour analytics based on event type
    if (eventType === 'tour_started') {
      // Get current views and increment
      const { data: tour } = await supabase
        .from('tours')
        .select('views')
        .eq('id', id)
        .single();
      
      if (tour) {
        await supabase
          .from('tours')
          .update({ views: (tour.views || 0) + 1 })
          .eq('id', id);
      }
    } else if (eventType === 'tour_completed') {
      // Get current completions and increment
      const { data: tour } = await supabase
        .from('tours')
        .select('completions')
        .eq('id', id)
        .single();
      
      if (tour) {
        await supabase
          .from('tours')
          .update({ completions: (tour.completions || 0) + 1 })
          .eq('id', id);
      }
    }

    return NextResponse.json({ success: true }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Failed to track event:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
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
