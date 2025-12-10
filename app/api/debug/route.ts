import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Test basic connection
    const { data: connection, error: connError } = await supabase
      .from('tours')
      .select('count', { count: 'exact', head: true });

    // Try to get all tours (ignoring RLS)
    const { data: tours, error } = await supabase
      .from('tours')
      .select('id, title, status')
      .limit(10);

    return NextResponse.json({
      connection: connError ? `Error: ${connError.message}` : `Connected (${connection?.length || 0} records)`,
      tours: tours || [],
      error: error?.message || null,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
