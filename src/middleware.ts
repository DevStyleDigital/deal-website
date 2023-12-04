import { cookies } from 'next/headers';
import { remove as removeCookie } from 'js-cookie';
import { notFound, redirect } from 'next/navigation';
import { supabase } from 'services/supabase';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin/dash')) {
    const cookieStore = cookies();
    const token = cookieStore.get('__AUTH')?.value;
    if (!token || token === 'null')
      return NextResponse.redirect(new URL('/admin', request.url));

    const isInvalid = await supabase.auth
      .getUser(token)
      .then((res) => (res.error ? true : false))
      .catch(() => true);
    if (isInvalid) {
      cookieStore.delete('__AUTH');
      return NextResponse.rewrite(new URL('/admin', request.url));
    }
  }
}
