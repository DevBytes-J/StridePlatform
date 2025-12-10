import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tourId = searchParams.get('id');
  
  if (!tourId) {
    return NextResponse.json({ error: 'Tour ID required' }, { status: 400 });
  }

  try {
    const { data: tour, error } = await supabase
      .from('tours')
      .select('*')
      .eq('id', tourId)
      .single();

    if (error || !tour) {
      return NextResponse.json({ 
        error: 'Tour not found',
        tourId: tourId,
        details: error?.message 
      }, { status: 404 });
    }

    if (tour.status !== 'active') {
      return NextResponse.json({ 
        error: 'Tour not active',
        status: tour.status 
      }, { status: 404 });
    }

    return NextResponse.json({
      id: tour.id,
      title: tour.title,
      steps: tour.steps
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
