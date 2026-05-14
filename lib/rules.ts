import { ALLOWED_EMAIL_DOMAINS, MEMBER_LEVELS, TEMP_EMAIL_BLACKLIST } from './constants';

export function getEmailDomain(email: string) {
  return email.trim().toLowerCase().split('@').pop() || '';
}

export function validateRegistrationEmail(email: string) {
  const domain = getEmailDomain(email);
  if (!domain || TEMP_EMAIL_BLACKLIST.includes(domain)) {
    return { ok: false, reason: 'Temporary email domains are not allowed.' };
  }
  if (!ALLOWED_EMAIL_DOMAINS.includes(domain)) {
    return { ok: false, reason: 'Please use a supported major email provider.' };
  }
  return { ok: true, reason: null };
}

export function getMemberLevel(validInviteCount: number) {
  return [...MEMBER_LEVELS].reverse().find(level => validInviteCount >= level.validInvites) || MEMBER_LEVELS[0];
}

export function calculateFinalExposureWeight(levelWeight: number, recentExposureCount: number) {
  return Math.max(0.1, levelWeight / (1 + recentExposureCount * 0.1));
}

export function getAdminGrantSettlementDates(grantedAt: Date) {
  const confirmedAt = new Date(grantedAt);
  confirmedAt.setDate(confirmedAt.getDate() + 7);
  const settledAt = new Date(grantedAt);
  settledAt.setDate(settledAt.getDate() + 22);
  return { confirmedAt, settledAt };
}

export function getOrderCommissionSettlementDate(confirmedAt: Date) {
  const settledAt = new Date(confirmedAt);
  settledAt.setDate(settledAt.getDate() + 15);
  return settledAt;
}

export function formatMoney(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}
