export const SITE = {
  name: 'ShareMall',
  tagline: 'A Curated Storefront Marketplace',
  supportWhatsApp: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || ''
};

export const MONEY = {
  currency: 'USD',
  productPriceCents: 5900,
  commissionCents: 2000,
  platformFeeCents: 2000,
  withdrawalMinimumCents: 10000
};

export const ACTIVATION = {
  requiredStores: 10,
  trialDays: 10,
  requiredValidInvitesForFormalBronze: 3
};

export const SETTLEMENT = {
  adminGrantAutoConfirmDays: 7,
  afterConfirmationDays: 15
};

export const ALLOWED_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'aol.com',
  'msn.com',
  'live.com',
  'me.com',
  'comcast.net',
  'att.net',
  'verizon.net',
  'proton.me',
  'protonmail.com'
];

export const TEMP_EMAIL_BLACKLIST = [
  'mailinator.com',
  '10minutemail.com',
  'tempmail.com',
  'guerrillamail.com',
  'yopmail.com',
  'trashmail.com',
  'getnada.com',
  'sharklasers.com'
];

export const MEMBER_LEVELS = [
  { key: 'BRONZE', zh: '青铜', en: 'Bronze', validInvites: 0, exposureWeight: 1, pool: 'LOW' },
  { key: 'SILVER', zh: '白银', en: 'Silver', validInvites: 3, exposureWeight: 2, pool: 'MID' },
  { key: 'GOLD', zh: '黄金', en: 'Gold', validInvites: 5, exposureWeight: 4, pool: 'HIGH' },
  { key: 'PLATINUM', zh: '铂金', en: 'Platinum', validInvites: 10, exposureWeight: 7, pool: 'HIGH' },
  { key: 'DIAMOND', zh: '钻石', en: 'Diamond', validInvites: 20, exposureWeight: 12, pool: 'HIGH' },
  { key: 'BLACK_GOLD', zh: '黑金', en: 'Black Gold', validInvites: 50, exposureWeight: 20, pool: 'HIGH', bonusEligible: true }
] as const;

export const RECOMMENDATION_SLOTS = {
  total: 10,
  fixedInviteChain: 2,
  dynamic: 8,
  highPool: 3,
  midPool: 2,
  lowPool: 2,
  lowExposurePool: 1
};
