import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { directInvalidReason, resolveMemberLevel, shouldBecomeFormalBronze } from '@/lib/invitations';

export async function POST(request: Request) {
  const body = await request.json();
  const invitationId = String(body.invitationId || '');
  const adminId = String(body.adminId || 'system');
  const flags = body.flags || {};
  const manualDecision = String(body.decision || '').toUpperCase();

  if (!invitationId) return NextResponse.json({ error: 'invitationId is required.' }, { status: 400 });

  const invitation = await prisma.invitationRecord.findUnique({ where: { id: invitationId } });
  if (!invitation) return NextResponse.json({ error: 'Invitation record not found.' }, { status: 404 });

  const invalidReason = directInvalidReason(flags);
  const status = invalidReason || manualDecision === 'INVALID' ? 'INVALID' : manualDecision === 'VALID' ? 'VALID' : 'PENDING_RISK_REVIEW';
  const reason = invalidReason || String(body.reason || '管理员审核');

  const updated = await prisma.invitationRecord.update({
    where: { id: invitationId },
    data: { status, reason, reviewedAt: new Date() }
  });

  if (status === 'VALID') {
    const validCount = await prisma.invitationRecord.count({ where: { inviterId: invitation.inviterId, status: 'VALID' } });
    const level = resolveMemberLevel(validCount);
    await prisma.user.update({
      where: { id: invitation.inviterId },
      data: {
        memberStatus: shouldBecomeFormalBronze(validCount) ? 'BRONZE_ACTIVE' : undefined,
        memberLevel: level.key
      }
    });

    const storefront = await prisma.storefront.findUnique({ where: { ownerId: invitation.inviterId } });
    if (storefront) {
      await prisma.storefront.update({
        where: { id: storefront.id },
        data: {
          isActive: true,
          isRecommendable: true,
          exposureWeight: level.exposureWeight
        }
      });
    }
  }

  await prisma.adminLog.create({
    data: {
      adminId,
      action: 'INVITATION_REVIEW',
      target: invitationId,
      metadata: { status, reason, flags }
    }
  });

  return NextResponse.json({ invitation: updated });
}
