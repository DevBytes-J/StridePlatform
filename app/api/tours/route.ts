import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tourId = searchParams.get('id');
  
  if (!tourId) {
    return NextResponse.json({ error: 'Tour ID required' }, { status: 400 });
  }

  try {
    // First, let's see what tours exist
    const { data: allTours, error: allError } = await supabase
      .from('tours')
      .select('id, title, status')
      .limit(5);

    // Then try to find the specific tour
    const { data: tours, error } = await supabase
      .from('tours')
      .select('*')
      .eq('id', tourId);

    if (error) {
      return NextResponse.json({ 
        error: 'Database error',
        details: error.message,
        allTours: allTours || []
      }, { status: 500 });
    }

    if (!tours || tours.length === 0) {
      return NextResponse.json({ 
        error: 'Tour not found',
        tourId: tourId,
        availableTours: allTours || [],
        message: 'No tour exists with this ID'
      }, { status: 404 });
    }

    const tour = tours[0];

    if (tour.status !== 'active') {
      return NextResponse.json({ 
        error: 'Tour not active',
        status: tour.status,
        availableTours: allTours || []
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
