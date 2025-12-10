import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { eventType } = await request.json();

  const { data: tour } = await supabase
    .from('tours')
    .select('views, completions')
    .eq('id', id)
    .single();

  if (!tour) {
    return NextResponse.json({ error: 'Tour not found' }, { 
      status: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  let updates: any = {};

  if (eventType === 'tour_started') {
    updates.views = tour.views + 1;
  }

  if (eventType === 'tour_completed') {
    updates.completions = tour.completions + 1;
  }

  if (Object.keys(updates).length > 0) {
    await supabase
      .from('tours')
      .update(updates)
      .eq('id', id);
  }

  return NextResponse.json({ success: true }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
