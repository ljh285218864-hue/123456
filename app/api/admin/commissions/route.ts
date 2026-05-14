import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const commissions = await prisma.commission.findMany({
    orderBy: { createdAt: 'desc' },
    take: 300,
    include: {
      user: { select: { id: true, email: true, nickname: true, isOfficial: true } },
      order: { select: { id: true, status: true, totalCents: true } }
    }
  });

  return NextResponse.json({
    commissions: commissions.map(item => ({
      id: item.id,
      user: item.user,
      order: item.order,
      amount: `$${(item.amountCents / 100).toFixed(2)}`,
      status: item.status,
      source: item.source,
      visibleLabel: item.visibleLabel,
      confirmedAt: item.confirmedAt,
      settledAt: item.settledAt,
      withdrawnAt: item.withdrawnAt,
      internalNote: item.internalNote,
      createdAt: item.createdAt
    }))
  });
}
