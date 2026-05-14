import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/session';
import { prisma } from '@/lib/db';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ user: null }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      email: true,
      nickname: true,
      role: true,
      invitationCode: true,
      memberStatus: true,
      memberLevel: true,
      trialExpiresAt: true,
      isOfficial: true
    }
  });

  return NextResponse.json({ user });
}
