import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const events = await prisma.riskEvent.findMany({
    orderBy: { createdAt: 'desc' },
    take: 300,
    include: { user: { select: { id: true, email: true, nickname: true } } }
  });

  return NextResponse.json({
    events: events.map(event => ({
      id: event.id,
      user: event.user,
      type: event.type,
      decision: event.decision,
      reason: event.reason,
      metadata: event.metadata,
      createdAt: event.createdAt
    }))
  });
}
