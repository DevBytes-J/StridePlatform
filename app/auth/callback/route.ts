import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Redirect to sign-in page after successful email confirmation
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect to landing page if there's an error
  return NextResponse.redirect(new URL('/', request.url));
}
