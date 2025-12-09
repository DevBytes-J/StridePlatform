import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const { data: tour, error } = await supabase
    .from('tours')
    .select('id, title, description, steps, status')
    .eq('id', id)
    .eq('status', 'active')
    .single();

  if (error || !tour) {
    return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
  }

  return NextResponse.json(tour);
}
