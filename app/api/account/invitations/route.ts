import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/session';
import { prisma } from '@/lib/db';

type InvitationRecordItem = {
  id: string;
  inviteeId: string;
  status: string;
  reason: string | null;
  createdAt: Date;
};

type InviteeItem = {
  id: string;
  nickname: string | null;
  email: string;
  memberStatus: string;
  memberLevel: string;
};

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });

  const records = await prisma.invitationRecord.findMany({
    where: { inviterId: session.id },
    orderBy: { createdAt: 'desc' },
    take: 100
  });

  const inviteeIds = records.map((record: InvitationRecordItem) => record.inviteeId);
  const invitees = await prisma.user.findMany({
    where: { id: { in: inviteeIds } },
    select: { id: true, nickname: true, email: true, memberStatus: true, memberLevel: true }
  });
  const inviteeMap = new Map(invitees.map((user: InviteeItem) => [user.id, user]));

  return NextResponse.json({
    invitations: records.map((record: InvitationRecordItem) => ({
      id: record.id,
      invitee: inviteeMap.get(record.inviteeId) || null,
      status: record.status,
      reason: record.reason,
      createdAt: record.createdAt
    }))
  });
}
