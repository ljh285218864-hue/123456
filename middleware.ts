import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PUBLIC_PATHS = ['/admin/login'];

function decodeJwtPayload(token: string): { role?: string } | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(normalized);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('sharemall_session')?.value;
  const session = token ? decodeJwtPayload(token) : null;

  if (pathname.startsWith('/admin') && !ADMIN_PUBLIC_PATHS.includes(pathname)) {
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes(String(session.role))) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  const protectedCustomerPaths = ['/account', '/orders', '/withdrawals'];
  if (protectedCustomerPaths.some(path => pathname.startsWith(path))) {
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*', '/orders/:path*', '/withdrawals/:path*']
};
