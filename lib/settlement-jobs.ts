import { prisma } from './db';
import { getOrderCommissionSettlementDate } from './rules';

export async function autoConfirmDeliveredOrders(now = new Date()) {
  const orders = await prisma.order.findMany({
    where: {
      status: 'SHIPPED',
      autoConfirmAt: { lte: now }
    }
  });

  const results = [];
  for (const order of orders) {
    const confirmedAt = now;
    const settledAt = getOrderCommissionSettlementDate(confirmedAt);
    const updated = await prisma.order.update({
      where: { id: order.id },
      data: { status: 'CONFIRMED', confirmedAt }
    });
    await prisma.commission.updateMany({
      where: { orderId: order.id, status: { in: ['UNSETTLED', 'AWAITING_CONFIRMATION'] } },
      data: { status: 'SETTLEMENT_PENDING', confirmedAt, settledAt }
    });
    results.push(updated.id);
  }

  return { confirmedCount: results.length, orderIds: results };
}

export async function settleDueCommissions(now = new Date()) {
  const result = await prisma.commission.updateMany({
    where: {
      status: { in: ['UNSETTLED', 'SETTLEMENT_PENDING'] },
      settledAt: { lte: now }
    },
    data: { status: 'SETTLED' }
  });
  return { settledCount: result.count };
}
