import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const records = await prisma.invitationRecord.findMany({
    orderBy: { createdAt: 'desc' },
    take: 300
  });
  const userIds = Array.from(new Set(records.flatMap(item => [item.inviterId, item.inviteeId])));
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, email: true, nickname: true, memberStatus: true, memberLevel: true }
  });
  const userMap = new Map(users.map(user => [user.id, user]));

  return NextResponse.json({
    invitations: records.map(item => ({
      id: item.id,
      inviter: userMap.get(item.inviterId) || null,
      invitee: userMap.get(item.inviteeId) || null,
      status: item.status,
      reason: item.reason,
      createdAt: item.createdAt,
      reviewedAt: item.reviewedAt
    }))
  });
}
