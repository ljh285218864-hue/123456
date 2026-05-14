import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/session';
import { prisma } from '@/lib/db';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });

  const storefront = await prisma.storefront.findUnique({
    where: { ownerId: session.id },
    include: { products: { include: { product: true } } }
  });

  return NextResponse.json({ storefront });
}

export async function PUT(request: Request) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  const body = await request.json();
  const title = String(body.title || '').trim();
  const bio = String(body.bio || '').trim();
  const avatarUrl = String(body.avatarUrl || '').trim();
  const nickname = String(body.nickname || '').trim();

  if (nickname) {
    await prisma.user.update({ where: { id: session.id }, data: { nickname, avatarUrl: avatarUrl || undefined } });
  }

  const storefront = await prisma.storefront.upsert({
    where: { ownerId: session.id },
    update: { title, bio },
    create: { ownerId: session.id, title: title || `${nickname || 'My'} Storefront`, bio, isActive: false, isRecommendable: false }
  });

  return NextResponse.json({ storefront });
}
