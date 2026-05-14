import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { pickDynamicStorefronts } from '@/lib/recommendations';

function dayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId is required for demo API.' }, { status: 400 });

  const existingLocked = await prisma.recommendationSet.findFirst({
    where: { userId, isLocked: true, completed: false },
    include: { slots: true },
    orderBy: { createdAt: 'desc' }
  });
  if (existingLocked) return NextResponse.json({ recommendationSet: existingLocked });

  const user = await prisma.user.findUnique({ where: { id: userId }, include: { invitedBy: { include: { invitedBy: true, storefront: true } } } });
  if (!user) return NextResponse.json({ error: 'User not found.' }, { status: 404 });

  const fixedStorefronts = [];
  if (user.invitedBy?.storefront?.isRecommendable) fixedStorefronts.push({ storefrontId: user.invitedBy.storefront.id, source: 'DIRECT_INVITER' });
  const upperInviter = user.invitedBy?.invitedBy;
  if (upperInviter) {
    const upperStorefront = await prisma.storefront.findUnique({ where: { ownerId: upperInviter.id } });
    if (upperStorefront?.isRecommendable) fixedStorefronts.push({ storefrontId: upperStorefront.id, source: 'UPPER_INVITER' });
  }

  const all = await prisma.storefront.findMany({
    where: { isRecommendable: true, ownerId: { not: userId } },
    include: { owner: true }
  });

  const excluded = fixedStorefronts.map(item => item.storefrontId);
  const high = all.filter(item => ['GOLD', 'PLATINUM', 'DIAMOND', 'BLACK_GOLD'].includes(item.owner.memberLevel));
  const mid = all.filter(item => ['SILVER'].includes(item.owner.memberLevel));
  const low = all.filter(item => ['BRONZE'].includes(item.owner.memberLevel));
  const lowExposure = [...all].sort((a, b) => a.exposureCount - b.exposureCount).slice(0, 50);
  const dynamic = pickDynamicStorefronts({ high, mid, low, lowExposure, fallback: all }, excluded);

  const slots = [
    ...fixedStorefronts,
    ...dynamic.map(item => ({ storefrontId: item.id, source: item.owner.isOfficial ? 'OFFICIAL_FILL' : 'DYNAMIC_WEIGHTED' }))
  ].slice(0, 10);

  const set = await prisma.recommendationSet.create({
    data: {
      userId,
      dayKey: dayKey(),
      slots: {
        create: slots.map((slot, index) => ({ storefrontId: slot.storefrontId, source: slot.source, position: index + 1 }))
      }
    },
    include: { slots: true }
  });

  return NextResponse.json({ recommendationSet: set });
}
