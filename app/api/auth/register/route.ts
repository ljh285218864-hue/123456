import { NextResponse } from 'next/server';
import { hashPassword, validateRegistrationInput } from '@/lib/auth';
import { prisma } from '@/lib/db';

function makeInvitationCode(seed: string) {
  return seed.replace(/[^a-z0-9]/gi, '').slice(0, 5).toUpperCase() + Math.random().toString(36).slice(2, 7).toUpperCase();
}

export async function POST(request: Request) {
  const body = await request.json();
  const input = {
    email: String(body.email || '').trim().toLowerCase(),
    password: String(body.password || ''),
    nickname: String(body.nickname || '').trim(),
    invitationCode: String(body.invitationCode || '').trim().toUpperCase()
  };

  const validation = validateRegistrationInput(input);
  if (!validation.ok) return NextResponse.json({ error: validation.reason }, { status: 400 });

  const inviter = await prisma.user.findUnique({ where: { invitationCode: input.invitationCode } });
  if (!inviter) return NextResponse.json({ error: 'Invitation code does not exist.' }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) return NextResponse.json({ error: 'Email is already registered.' }, { status: 409 });

  const passwordHash = await hashPassword(input.password);
  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash,
      nickname: input.nickname,
      invitationCode: makeInvitationCode(input.nickname),
      invitedById: inviter.id,
      storefront: {
        create: {
          title: `${input.nickname}'s Storefront`,
          isActive: false,
          isRecommendable: false
        }
      }
    },
    select: { id: true, email: true, nickname: true, invitationCode: true }
  });

  await prisma.invitationRecord.create({
    data: {
      inviterId: inviter.id,
      inviteeId: user.id,
      status: 'REGISTERED'
    }
  });

  return NextResponse.json({ user });
}
