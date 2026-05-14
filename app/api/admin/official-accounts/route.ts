import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const accounts = await prisma.user.findMany({
    where: { isOfficial: true },
    orderBy: { createdAt: 'desc' },
    take: 500,
    include: { storefront: { include: { products: true } } }
  });

  return NextResponse.json({
    accounts: accounts.map(user => ({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      invitationCode: user.invitationCode,
      memberStatus: user.memberStatus,
      memberLevel: user.memberLevel,
      storefrontTitle: user.storefront?.title || '',
      productCount: user.storefront?.products.length || 0,
      exposureCount: user.storefront?.exposureCount || 0,
      orderCount: user.storefront?.orderCount || 0,
      isRecommendable: user.storefront?.isRecommendable || false,
      createdAt: user.createdAt
    }))
  });
}
