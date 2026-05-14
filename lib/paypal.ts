import { MONEY } from './constants';

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || 'https://api-m.sandbox.paypal.com';

export type PayPalPurchaseUnit = {
  reference_id: string;
  amount: {
    currency_code: 'USD';
    value: string;
  };
  description?: string;
};

export function centsToPayPalValue(cents: number) {
  return (cents / 100).toFixed(2);
}

export function buildActivationPayPalOrderPayload(params: {
  recommendationSetId: string;
  userId: string;
}) {
  return {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: params.recommendationSetId,
        custom_id: params.userId,
        description: 'ShareMall Bronze trial activation - 10 recommended storefront products',
        amount: {
          currency_code: 'USD',
          value: centsToPayPalValue(MONEY.productPriceCents * 10)
        }
      }
    ],
    application_context: {
      brand_name: 'ShareMall',
      shipping_preference: 'SET_PROVIDED_ADDRESS',
      user_action: 'PAY_NOW'
    }
  };
}

export async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error('PayPal credentials are missing.');

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) throw new Error('Unable to request PayPal access token.');
  const data = await response.json();
  return data.access_token as string;
}

export async function createPayPalOrder(payload: unknown) {
  const token = await getPayPalAccessToken();
  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error('Unable to create PayPal order.');
  return response.json();
}

export async function capturePayPalOrder(paypalOrderId: string) {
  const token = await getPayPalAccessToken();
  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw new Error('Unable to capture PayPal order.');
  return response.json();
}
