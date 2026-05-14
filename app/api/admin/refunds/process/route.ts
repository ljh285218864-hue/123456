import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const orderId = String(body.orderId || '');
  const adminId = String(body.adminId || 'system');
  const reason = String(body.reason || '退款处理');

  if (!orderId) return NextResponse.json({ error: 'orderId is required.' }, { status: 400 });

  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { items: true } });
  if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status: 'REFUNDED' }
  });

  await prisma.commission.updateMany({
    where: { orderId },
    data: { status: 'CANCELLED', internalNote: reason }
  });

  await prisma.user.update({
    where: { id: order.buyerId },
    data: {
      memberStatus: 'FROZEN',
      frozenAt: new Date()
    }
  });

  await prisma.storefront.updateMany({
    where: { ownerId: order.buyerId },
    data: { isActive: false, isRecommendable: false }
  });

  await prisma.invitationRecord.updateMany({
    where: { inviteeId: order.buyerId },
    data: { status: 'INVALID', reason: '被邀请人退款，邀请无效', reviewedAt: new Date() }
  });

  await prisma.riskEvent.create({
    data: {
      userId: order.buyerId,
      type: 'REFUND_MEMBERSHIP_CANCELLED',
      decision: 'INVALID',
      reason,
      metadata: { orderId }
    }
  });

  await prisma.adminLog.create({
    data: {
      adminId,
      action: 'REFUND_PROCESSED',
      target: orderId,
      metadata: { reason }
    }
  });

  return NextResponse.json({ order: updatedOrder });
}
