import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const bootstrapEmail = process.env.ADMIN_BOOTSTRAP_EMAIL;
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  if (!bootstrapEmail || email !== bootstrapEmail.toLowerCase()) {
    return NextResponse.json({ error: 'Bootstrap email is not allowed.' }, { status: 403 });
  }

  if (password.length < 10) {
    return NextResponse.json({ error: 'Admin password must be at least 10 characters.' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Bootstrap admin already exists.' }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const admin = await prisma.user.create({
    data: {
      email,
      passwordHash,
      nickname: '超级管理员',
      invitationCode: 'ADMIN' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      role: 'SUPER_ADMIN',
      memberStatus: 'BRONZE_ACTIVE'
    },
    select: { id: true, email: true, role: true }
  });

  return NextResponse.json({ admin });
}
