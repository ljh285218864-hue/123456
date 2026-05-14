import { ACTIVATION, MEMBER_LEVELS } from './constants';

export function shouldBecomeFormalBronze(validInviteCount: number) {
  return validInviteCount >= ACTIVATION.requiredValidInvitesForFormalBronze;
}

export function resolveMemberLevel(validInviteCount: number) {
  return [...MEMBER_LEVELS].reverse().find(level => validInviteCount >= level.validInvites) || MEMBER_LEVELS[0];
}

export function directInvalidReason(flags: {
  sameIp?: boolean;
  sameDevice?: boolean;
  sameShippingAddress?: boolean;
  samePaymentAccount?: boolean;
  sameWithdrawalAccount?: boolean;
  refunded?: boolean;
  chargeback?: boolean;
}) {
  if (flags.sameIp) return '同IP，直接无效';
  if (flags.sameDevice) return '同设备，直接无效';
  if (flags.sameShippingAddress) return '同收货地址，直接无效';
  if (flags.samePaymentAccount) return '同支付账户，直接无效';
  if (flags.sameWithdrawalAccount) return '同提现账户，直接无效';
  if (flags.refunded) return '发生退款，直接无效';
  if (flags.chargeback) return '发生拒付，直接无效';
  return null;
}
