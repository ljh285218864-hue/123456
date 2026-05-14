import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { MONEY } from '@/lib/constants';

export async function POST(request: Request) {
  const body = await request.json();
  const userId = String(body.userId || '');
  const method = String(body.method || 'PAYPAL');
  const accountInfo = body.accountInfo || {};

  if (!userId) return NextResponse.json({ error: 'userId is required.' }, { status: 400 });

  const settled = await prisma.commission.findMany({
    where: { userId, status: 'SETTLED' }
  });
  const availableCents = settled.reduce((sum, item) => sum + item.amountCents, 0);

  if (availableCents < MONEY.withdrawalMinimumCents) {
    return NextResponse.json({ error: 'Minimum withdrawal amount is $100.', availableCents }, { status: 400 });
  }

  const withdrawal = await prisma.withdrawal.create({
    data: {
      userId,
      amountCents: availableCents,
      method,
      accountInfo,
      status: 'PENDING'
    }
  });

  return NextResponse.json({ withdrawal });
}
