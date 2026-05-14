export const adminStats = {
  users: 1280,
  trialMembers: 236,
  activeMembers: 418,
  orders: 964,
  unsettledCommissionCents: 1284000,
  settledCommissionCents: 822000,
  underWithdrawalMinimumCents: 346000,
  pendingWithdrawals: 18,
  riskEvents: 7
};

export const sampleProducts = [
  { title: 'Home Organizer Set', sku: 'HM-001', inventory: 120, price: '$59' },
  { title: 'Kitchen Storage Rack', sku: 'KT-002', inventory: 82, price: '$59' },
  { title: 'Daily Cleaning Kit', sku: 'CL-003', inventory: 64, price: '$59' },
  { title: 'Bathroom Essentials Pack', sku: 'BT-004', inventory: 91, price: '$59' }
];

export const sampleUsers = [
  { id: 'U1001', email: 'mia@gmail.com', nickname: 'Mia Home Picks', level: '青铜', status: '试用生效中', invites: 1 },
  { id: 'U1002', email: 'emma@yahoo.com', nickname: 'Emma Daily Finds', level: '白银', status: '生效中', invites: 3 },
  { id: 'U1003', email: 'noah@outlook.com', nickname: 'Noah Smart Living', level: '黄金', status: '生效中', invites: 5 }
];

export const sampleOrders = [
  { id: 'O-1001', buyer: 'Jane Smith', amount: '$590', status: '已付款未发货', commission: '$200' },
  { id: 'O-1002', buyer: 'Lucas Brown', amount: '$59', status: '已发货', commission: '$20' },
  { id: 'O-1003', buyer: 'Olivia Davis', amount: '$59', status: '确认收货', commission: '$20' }
];
