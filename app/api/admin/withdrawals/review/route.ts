import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const withdrawalId = String(body.withdrawalId || '');
  const action = String(body.action || '').toUpperCase();
  const adminId = String(body.adminId || 'system');
  const adminNote = String(body.adminNote || '');

  if (!withdrawalId || !['APPROVE', 'REJECT', 'PAID'].includes(action)) {
    return NextResponse.json({ error: 'Invalid withdrawal review request.' }, { status: 400 });
  }

  const status = action === 'APPROVE' ? 'APPROVED' : action === 'REJECT' ? 'REJECTED' : 'PAID';
  const withdrawal = await prisma.withdrawal.update({
    where: { id: withdrawalId },
    data: {
      status,
      adminNote,
      paidAt: status === 'PAID' ? new Date() : undefined
    }
  });

  if (status === 'PAID') {
    await prisma.commission.updateMany({
      where: { userId: withdrawal.userId, status: 'SETTLED' },
      data: { status: 'WITHDRAWN', withdrawnAt: new Date() }
    });
  }

  await prisma.adminLog.create({
    data: {
      adminId,
      action: `WITHDRAWAL_${status}`,
      target: withdrawalId,
      metadata: { adminNote }
    }
  });

  return NextResponse.json({ withdrawal });
}
