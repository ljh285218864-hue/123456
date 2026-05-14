import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { signSession, verifyPassword } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });

  const token = signSession({ id: user.id, email: user.email, role: user.role });
  const response = NextResponse.json({ user: { id: user.id, email: user.email, nickname: user.nickname, role: user.role } });
  response.cookies.set('sharemall_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
  return response;
}
