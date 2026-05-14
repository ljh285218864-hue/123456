import { ACTIVATION, MONEY } from './constants';

export type ActivationCheckoutItem = {
  storefrontId: string;
  productId: string;
};

export function validateActivationCheckoutItems(items: ActivationCheckoutItem[]) {
  if (items.length !== ACTIVATION.requiredStores) {
    return { ok: false, reason: `Exactly ${ACTIVATION.requiredStores} storefront products are required.` };
  }
  const uniqueStorefronts = new Set(items.map(item => item.storefrontId));
  if (uniqueStorefronts.size !== ACTIVATION.requiredStores) {
    return { ok: false, reason: 'One product must be selected from each unique recommended storefront.' };
  }
  return { ok: true, reason: null };
}

export function activationOrderTotalCents() {
  return MONEY.productPriceCents * ACTIVATION.requiredStores;
}

export function getTrialExpirationDate(start = new Date()) {
  const expiresAt = new Date(start);
  expiresAt.setDate(expiresAt.getDate() + ACTIVATION.trialDays);
  return expiresAt;
}
