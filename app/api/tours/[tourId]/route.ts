import { NextRequest, NextResponse } from 'next/server';

// Mock data - replace with your database
const tours = {
  'abc123': {
    id: 'abc123',
    title: 'My Awesome Tour',
    steps: [
      {
        id: 'step_1',
        title: 'Welcome!',
        content: 'Click here to start.',
        target_selector: '#start-btn',
        position: 'bottom'
      }
    ]
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { tourId: string } }
) {
  const tourId = params.tourId;
  const tour = tours[tourId as keyof typeof tours];

  if (!tour) {
    return NextResponse.json(
      { error: 'Tour not found' },
      { 
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST',
        }
      }
    );
  }

  return NextResponse.json(tour, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
    }
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
