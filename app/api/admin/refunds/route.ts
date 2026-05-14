import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const orders = await prisma.order.findMany({
    where: { status: { in: ['REFUND_REQUESTED', 'REFUNDED'] } },
    orderBy: { createdAt: 'desc' },
    take: 300,
    include: {
      buyer: { select: { id: true, email: true, nickname: true, memberStatus: true } },
      commissions: true
    }
  });

  return NextResponse.json({
    refunds: orders.map(order => ({
      id: order.id,
      buyer: order.buyer,
      status: order.status,
      total: `$${(order.totalCents / 100).toFixed(2)}`,
      affectedCommission: `$${(order.commissions.reduce((sum, item) => sum + item.amountCents, 0) / 100).toFixed(2)}`,
      createdAt: order.createdAt,
      confirmedAt: order.confirmedAt
    }))
  });
}
