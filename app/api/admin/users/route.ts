import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
    select: {
      id: true,
      email: true,
      nickname: true,
      role: true,
      isOfficial: true,
      memberStatus: true,
      memberLevel: true,
      invitationCode: true,
      invitedById: true,
      createdAt: true,
      _count: { select: { directInvites: true, commissions: true, orders: true } }
    }
  });

  return NextResponse.json({ users });
}
