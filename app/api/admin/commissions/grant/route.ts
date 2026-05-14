import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { buildAdminGrantCommissionInput } from '@/lib/commissions';

export async function POST(request: Request) {
  const body = await request.json();
  const userId = String(body.userId || '');
  const note = String(body.note || '');
  if (!userId) return NextResponse.json({ error: 'userId is required.' }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: 'User not found.' }, { status: 404 });

  const commission = await prisma.commission.create({
    data: buildAdminGrantCommissionInput({ userId, source: 'ADMIN_GRANT', internalNote: note })
  });

  return NextResponse.json({ commission });
}
