import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const withdrawals = await prisma.withdrawal.findMany({
    orderBy: { createdAt: 'desc' },
    take: 300,
    include: { user: { select: { id: true, email: true, nickname: true } } }
  });

  return NextResponse.json({
    withdrawals: withdrawals.map(item => ({
      id: item.id,
      user: item.user,
      amount: `$${(item.amountCents / 100).toFixed(2)}`,
      amountCents: item.amountCents,
      method: item.method,
      accountInfo: item.accountInfo,
      status: item.status,
      adminNote: item.adminNote,
      createdAt: item.createdAt,
      paidAt: item.paidAt
    }))
  });
}
