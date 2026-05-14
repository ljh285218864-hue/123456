import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getOrderCommissionSettlementDate } from '@/lib/rules';

export async function POST(request: Request) {
  const body = await request.json();
  const orderId = String(body.orderId || '');
  if (!orderId) return NextResponse.json({ error: 'orderId is required.' }, { status: 400 });

  const confirmedAt = new Date();
  const settledAt = getOrderCommissionSettlementDate(confirmedAt);
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: 'CONFIRMED', confirmedAt }
  });

  await prisma.commission.updateMany({
    where: { orderId, status: { in: ['UNSETTLED', 'AWAITING_CONFIRMATION'] } },
    data: { status: 'SETTLEMENT_PENDING', confirmedAt, settledAt }
  });

  return NextResponse.json({ order, settledAt });
}
