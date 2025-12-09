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
  const { event, time, rating } = await request.json();

  const { data: tour } = await supabase
    .from('tours')
    .select('views, completions, avg_time')
    .eq('id', id)
    .single();

  if (!tour) {
    return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
  }

  let updates: any = {};

  if (event === 'view') {
    updates.views = tour.views + 1;
  }

  if (event === 'complete') {
    updates.completions = tour.completions + 1;
    if (time) {
      const totalTime = tour.avg_time * tour.completions + time;
      updates.avg_time = Math.round(totalTime / (tour.completions + 1));
    }
  }

  if (event === 'rate' && rating) {
    updates.rating = rating;
  }

  const { error } = await supabase
    .from('tours')
    .update(updates)
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
