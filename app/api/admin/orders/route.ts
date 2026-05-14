import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
    include: {
      buyer: { select: { id: true, email: true, nickname: true } },
      items: { include: { product: true } },
      commissions: true
    }
  });

  return NextResponse.json({
    orders: orders.map(order => ({
      id: order.id,
      buyer: order.buyer,
      status: order.status,
      total: `$${(order.totalCents / 100).toFixed(2)}`,
      paypalOrderId: order.paypalOrderId,
      shippedAt: order.shippedAt,
      confirmedAt: order.confirmedAt,
      autoConfirmAt: order.autoConfirmAt,
      createdAt: order.createdAt,
      items: order.items.map(item => ({ id: item.id, productTitle: item.product.title, quantity: item.quantity })),
      commissionTotal: `$${(order.commissions.reduce((sum, item) => sum + item.amountCents, 0) / 100).toFixed(2)}`
    }))
  });
}
