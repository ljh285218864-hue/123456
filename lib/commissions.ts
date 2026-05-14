import { MONEY } from './constants';
import { getAdminGrantSettlementDates, getOrderCommissionSettlementDate } from './rules';

export function buildOrderCommissionInput(params: {
  userId: string;
  orderId: string;
  confirmedAt?: Date | null;
}) {
  const settledAt = params.confirmedAt ? getOrderCommissionSettlementDate(params.confirmedAt) : null;
  return {
    userId: params.userId,
    orderId: params.orderId,
    amountCents: MONEY.commissionCents,
    source: 'ORDER' as const,
    visibleLabel: 'Commission',
    status: params.confirmedAt ? ('SETTLEMENT_PENDING' as const) : ('UNSETTLED' as const),
    confirmedAt: params.confirmedAt || null,
    settledAt
  };
}

export function buildAdminGrantCommissionInput(params: {
  userId: string;
  source: 'ADMIN_GRANT' | 'RANDOM_GRANT' | 'PLATFORM_BONUS';
  grantedAt?: Date;
  internalNote?: string;
  taskId?: string;
}) {
  const grantedAt = params.grantedAt || new Date();
  const { confirmedAt, settledAt } = getAdminGrantSettlementDates(grantedAt);
  return {
    userId: params.userId,
    amountCents: MONEY.commissionCents,
    source: params.source,
    visibleLabel: 'Commission',
    status: 'UNSETTLED' as const,
    confirmedAt,
    settledAt,
    internalNote: params.internalNote,
    taskId: params.taskId
  };
}
