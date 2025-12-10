import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: tours, error } = await supabase
      .from('tours')
      .select('*')
      .eq('id', params.id);

    if (error) {
      return NextResponse.json({ 
        error: 'Database error',
        details: error.message
      }, { status: 500 });
    }

    if (!tours || tours.length === 0) {
      return NextResponse.json({ 
        error: 'Tour not found',
        tourId: params.id
      }, { status: 404 });
    }

    const tour = tours[0];

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
