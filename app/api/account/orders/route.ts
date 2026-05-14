import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/session';
import { prisma } from '@/lib/db';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });

  const orders = await prisma.order.findMany({
    where: { buyerId: session.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
    take: 100
  });

  return NextResponse.json({
    orders: orders.map(order => ({
      id: order.id,
      total: `$${(order.totalCents / 100).toFixed(2)}`,
      status: order.status,
      createdAt: order.createdAt,
      shippedAt: order.shippedAt,
      confirmedAt: order.confirmedAt,
      autoConfirmAt: order.autoConfirmAt,
      items: order.items.map(item => ({
        id: item.id,
        productTitle: item.product.title,
        quantity: item.quantity,
        price: `$${(item.priceCents / 100).toFixed(2)}`
      }))
    }))
  });
}
