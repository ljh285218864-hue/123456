import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { generateOfficialAccountSeeds } from '@/lib/official-accounts';

export async function POST(request: Request) {
  const body = await request.json();
  const count = Math.min(Math.max(Number(body.count || 10), 1), 500);
  const seeds = generateOfficialAccountSeeds(count);
  const passwordHash = await hashPassword('OfficialAccount!2026');

  const created = [];
  for (const seed of seeds) {
    const existing = await prisma.user.findUnique({ where: { email: seed.email } });
    if (existing) continue;
    const user = await prisma.user.create({
      data: {
        email: seed.email,
        passwordHash,
        nickname: seed.nickname,
        invitationCode: seed.invitationCode,
        isOfficial: true,
        memberStatus: 'BRONZE_ACTIVE',
        memberLevel: 'BRONZE',
        storefront: {
          create: {
            title: seed.title,
            bio: seed.bio,
            isActive: true,
            isRecommendable: true,
            exposureWeight: 1
          }
        }
      },
      select: { id: true, email: true, nickname: true, invitationCode: true }
    });
    created.push(user);
  }

  return NextResponse.json({ createdCount: created.length, created });
}
