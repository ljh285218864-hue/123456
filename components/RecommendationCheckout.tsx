'use client';

import { useState } from 'react';

const demoStores = [
  { storefrontId: 'sf-1', productId: 'p-1', name: 'Mia Home Picks' },
  { storefrontId: 'sf-2', productId: 'p-2', name: 'Emma Daily Finds' },
  { storefrontId: 'sf-3', productId: 'p-3', name: 'Olivia Essentials' },
  { storefrontId: 'sf-4', productId: 'p-4', name: 'Noah Smart Living' },
  { storefrontId: 'sf-5', productId: 'p-5', name: 'Sophia Home Store' },
  { storefrontId: 'sf-6', productId: 'p-6', name: 'Ava Kitchen Finds' },
  { storefrontId: 'sf-7', productId: 'p-7', name: 'Liam Daily Goods' },
  { storefrontId: 'sf-8', productId: 'p-8', name: 'Ella Home Choice' },
  { storefrontId: 'sf-9', productId: 'p-9', name: 'Daniel Essentials' },
  { storefrontId: 'sf-10', productId: 'p-10', name: 'Grace Living Co.' }
];

export default function RecommendationCheckout() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function createCheckout() {
    setLoading(true);
    setMessage('');
    const response = await fetch('/api/checkout/activation/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'demo-user-id',
        recommendationSetId: 'demo-recommendation-set-id',
        items: demoStores.map(({ storefrontId, productId }) => ({ storefrontId, productId })),
        shipping: {
          name: 'Demo Customer',
          address: '123 Demo Street',
          city: 'Los Angeles',
          state: 'CA',
          zip: '90001',
          country: 'US'
        }
      })
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.error || 'Unable to create checkout. Connect database and real recommendation set first.');
      return;
    }
    setMessage(`PayPal order created: ${data.paypalOrder?.id || data.orderId}`);
  }

  return (
    <div className="card">
      <h3>Checkout summary</h3>
      <p className="muted">Required total: 10 products × $59 = $590. PayPal is the first payment entry and supports PayPal account or card payment.</p>
      <button className="btn" type="button" onClick={createCheckout} disabled={loading}>{loading ? 'Creating PayPal Order...' : 'Pay with PayPal / Card'}</button>
      {message ? <p className="muted">{message}</p> : null}
    </div>
  );
}
