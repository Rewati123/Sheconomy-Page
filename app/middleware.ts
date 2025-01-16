import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url)) // लॉगिन पर रीडायरेक्ट करें
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/profile'],
};
