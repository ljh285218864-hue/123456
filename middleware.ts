import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from './lib/auth';

const ADMIN_PUBLIC_PATHS = ['/admin/login'];
const CUSTOMER_PUBLIC_PATHS = ['/', '/login', '/register', '/recommendations'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('sharemall_session')?.value;
  const session = token ? verifySession(token) : null;

  if (pathname.startsWith('/admin') && !ADMIN_PUBLIC_PATHS.includes(pathname)) {
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes(session.role)) {
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
