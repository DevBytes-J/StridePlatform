import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { tourId: string } }
) {
  const tourId = params.tourId;
  
  try {
    const body = await request.json();
    const { eventType, stepId } = body;

    // Log the event - replace with your database logic
    console.log('Tour event received:', {
      tourId,
      eventType,
      stepId,
      timestamp: new Date().toISOString()
    });

    // TODO: Save to database
    // await db.tourEvents.create({ tourId, eventType, stepId, timestamp: new Date() });

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST',
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST',
        }
      }
    );
  }
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
