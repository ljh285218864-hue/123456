import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentSession } from '@/lib/session';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });

  let set = await prisma.recommendationSet.findFirst({
    where: { userId: session.id, completed: false },
    orderBy: [{ isLocked: 'desc' }, { createdAt: 'desc' }],
    include: { slots: true }
  });

  if (!set) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/recommendations/current?userId=${session.id}`, { cache: 'no-store' }).catch(() => null);
    if (response?.ok) {
      const data = await response.json();
      set = data.recommendationSet;
    }
  }

  if (!set) return NextResponse.json({ recommendationSet: null, stores: [] });

  const storefrontIds = set.slots.map(slot => slot.storefrontId);
  const storefronts = await prisma.storefront.findMany({
    where: { id: { in: storefrontIds } },
    include: {
      owner: { select: { id: true, nickname: true, avatarUrl: true, memberLevel: true, isOfficial: true } },
      products: { include: { product: true }, take: 6 }
    }
  });
  const storefrontMap = new Map(storefronts.map(item => [item.id, item]));

  const stores = set.slots
    .sort((a, b) => a.position - b.position)
    .map(slot => {
      const storefront = storefrontMap.get(slot.storefrontId);
      return storefront ? {
        slotId: slot.id,
        position: slot.position,
        source: slot.source,
        isCompleted: slot.isCompleted,
        storefront: {
          id: storefront.id,
          title: storefront.title,
          bio: storefront.bio,
          owner: storefront.owner,
          products: storefront.products.map(entry => ({
            id: entry.product.id,
            title: entry.product.title,
            description: entry.product.description,
            priceCents: entry.product.priceCents,
            imageUrl: entry.product.imageUrl,
            inventory: entry.product.inventory
          }))
        }
      } : null;
    })
    .filter(Boolean);

  return NextResponse.json({ recommendationSet: set, stores });
}
