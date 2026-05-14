import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const orderId = String(body.orderId || '');
  const carrier = String(body.carrier || '');
  const trackingNumber = String(body.trackingNumber || '');

  if (!orderId) return NextResponse.json({ error: 'orderId is required.' }, { status: 400 });

  const shippedAt = new Date();
  const autoConfirmAt = new Date(shippedAt);
  autoConfirmAt.setDate(autoConfirmAt.getDate() + 7);

  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'SHIPPED',
      shippedAt,
      autoConfirmAt
    }
  });

  await prisma.adminLog.create({
    data: {
      adminId: String(body.adminId || 'system'),
      action: 'ORDER_SHIPPED',
      target: orderId,
      metadata: { carrier, trackingNumber, autoConfirmAt }
    }
  });

  return NextResponse.json({ order, shipment: { carrier, trackingNumber, autoConfirmAt } });
}
