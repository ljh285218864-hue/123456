import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createPayPalOrder, buildActivationPayPalOrderPayload } from '@/lib/paypal';
import { activationOrderTotalCents, validateActivationCheckoutItems } from '@/lib/orders';

export async function POST(request: Request) {
  const body = await request.json();
  const userId = String(body.userId || '');
  const recommendationSetId = String(body.recommendationSetId || '');
  const items = Array.isArray(body.items) ? body.items : [];
  const shipping = body.shipping || {};

  if (!userId || !recommendationSetId) return NextResponse.json({ error: 'Missing userId or recommendationSetId.' }, { status: 400 });
  const itemCheck = validateActivationCheckoutItems(items);
  if (!itemCheck.ok) return NextResponse.json({ error: itemCheck.reason }, { status: 400 });

  const recommendationSet = await prisma.recommendationSet.findUnique({ where: { id: recommendationSetId }, include: { slots: true } });
  if (!recommendationSet || recommendationSet.userId !== userId) return NextResponse.json({ error: 'Recommendation set not found.' }, { status: 404 });

  const allowedStorefrontIds = new Set(recommendationSet.slots.map(slot => slot.storefrontId));
  const hasInvalidStore = items.some((item: { storefrontId: string }) => !allowedStorefrontIds.has(item.storefrontId));
  if (hasInvalidStore) return NextResponse.json({ error: 'All products must come from the current recommended stores.' }, { status: 400 });

  const order = await prisma.order.create({
    data: {
      buyerId: userId,
      status: 'PENDING_PAYMENT',
      totalCents: activationOrderTotalCents(),
      shippingName: String(shipping.name || ''),
      shippingPhone: String(shipping.phone || ''),
      shippingAddress: String(shipping.address || ''),
      shippingCity: String(shipping.city || ''),
      shippingState: String(shipping.state || ''),
      shippingZip: String(shipping.zip || ''),
      shippingCountry: String(shipping.country || 'US'),
      items: {
        create: items.map((item: { productId: string; storefrontId: string }) => ({
          productId: item.productId,
          storefrontId: item.storefrontId,
          priceCents: 5900,
          quantity: 1
        }))
      }
    }
  });

  await prisma.recommendationSet.update({ where: { id: recommendationSetId }, data: { isLocked: true } });

  const paypalPayload = buildActivationPayPalOrderPayload({ recommendationSetId, userId });
  const paypalOrder = await createPayPalOrder(paypalPayload);
  await prisma.order.update({ where: { id: order.id }, data: { paypalOrderId: paypalOrder.id } });

  return NextResponse.json({ orderId: order.id, paypalOrder });
}
