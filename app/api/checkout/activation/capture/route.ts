import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { capturePayPalOrder } from '@/lib/paypal';
import { getTrialExpirationDate } from '@/lib/orders';
import { buildOrderCommissionInput } from '@/lib/commissions';

export async function POST(request: Request) {
  const body = await request.json();
  const orderId = String(body.orderId || '');
  if (!orderId) return NextResponse.json({ error: 'orderId is required.' }, { status: 400 });

  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { items: true } });
  if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
  if (!order.paypalOrderId) return NextResponse.json({ error: 'PayPal order id missing.' }, { status: 400 });

  const capture = await capturePayPalOrder(order.paypalOrderId);
  const now = new Date();

  const updated = await prisma.order.update({
    where: { id: order.id },
    data: { status: 'PAID' }
  });

  await prisma.user.update({
    where: { id: order.buyerId },
    data: {
      memberStatus: 'BRONZE_TRIAL',
      memberLevel: 'BRONZE',
      trialStartedAt: now,
      trialExpiresAt: getTrialExpirationDate(now)
    }
  });

  const recommendationSet = await prisma.recommendationSet.findFirst({ where: { userId: order.buyerId, isLocked: true, completed: false }, orderBy: { createdAt: 'desc' } });
  if (recommendationSet) {
    await prisma.recommendationSet.update({ where: { id: recommendationSet.id }, data: { completed: true } });
  }

  for (const item of order.items) {
    const storefront = await prisma.storefront.findUnique({ where: { id: item.storefrontId }, include: { owner: true } });
    if (!storefront) continue;
    if (storefront.owner.isOfficial) continue;
    await prisma.commission.create({ data: buildOrderCommissionInput({ userId: storefront.ownerId, orderId: order.id }) });
  }

  return NextResponse.json({ order: updated, capture });
}
