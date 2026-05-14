import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/session';
import { prisma } from '@/lib/db';

type CommissionListItem = {
  id: string;
  amountCents: number;
  status: string;
  confirmedAt: Date | null;
  settledAt: Date | null;
  createdAt: Date;
};

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    UNSETTLED: 'Unsettled',
    AWAITING_CONFIRMATION: 'Awaiting Confirmation',
    SETTLEMENT_PENDING: 'Settlement Pending',
    SETTLED: 'Settled',
    WITHDRAWN: 'Withdrawn',
    CANCELLED: 'Cancelled'
  };
  return labels[status] || status;
}

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });

  const commissions = await prisma.commission.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: 'desc' },
    take: 100,
    select: { id: true, amountCents: true, status: true, confirmedAt: true, settledAt: true, createdAt: true }
  });

  return NextResponse.json({
    commissions: commissions.map((item: CommissionListItem) => ({
      id: item.id,
      amount: `$${(item.amountCents / 100).toFixed(2)}`,
      label: 'Commission',
      status: statusLabel(item.status),
      confirmedAt: item.confirmedAt,
      settledAt: item.settledAt,
      createdAt: item.createdAt
    }))
  });
}
