import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const rows = Array.isArray(body.rows) ? body.rows : [];
  const adminId = String(body.adminId || 'system');
  const updated: string[] = [];

  for (const row of rows) {
    const orderId = String(row.orderId || '');
    if (!orderId) continue;
    const shippedAt = new Date();
    const autoConfirmAt = new Date(shippedAt);
    autoConfirmAt.setDate(autoConfirmAt.getDate() + 7);
    await prisma.order.update({ where: { id: orderId }, data: { status: 'SHIPPED', shippedAt, autoConfirmAt } });
    await prisma.adminLog.create({
      data: {
        adminId,
        action: 'ORDER_TRACKING_IMPORTED',
        target: orderId,
        metadata: { carrier: row.carrier, trackingNumber: row.trackingNumber, autoConfirmAt }
      }
    });
    updated.push(orderId);
  }

  return NextResponse.json({ updatedCount: updated.length, orderIds: updated });
}
