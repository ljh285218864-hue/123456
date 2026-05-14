'use client';

import { useEffect, useMemo, useState } from 'react';

type Store = {
  slotId: string;
  position: number;
  source: string;
  isCompleted: boolean;
  storefront: {
    id: string;
    title: string;
    bio?: string | null;
    owner: { nickname: string; memberLevel: string; avatarUrl?: string | null };
    products: { id: string; title: string; description?: string | null; priceCents: number; imageUrl?: string | null; inventory: number }[];
  };
};

export default function RealRecommendations() {
  const [stores, setStores] = useState<Store[]>([]);
  const [recommendationSetId, setRecommendationSetId] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/recommendations/current/details').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setStores(data.stores || []);
      setRecommendationSetId(data.recommendationSet?.id || '');
    });
  }, []);

  const selectedCount = useMemo(() => Object.keys(selectedProducts).length, [selectedProducts]);

  function selectProduct(storefrontId: string, productId: string) {
    setSelectedProducts(prev => ({ ...prev, [storefrontId]: productId }));
  }

  async function checkout() {
    setLoading(true);
    setMessage('');
    if (!recommendationSetId) {
      setMessage('Recommendation set is not ready.');
      setLoading(false);
      return;
    }
    if (selectedCount !== 10) {
      setMessage('Please choose one product from each of the 10 recommended stores.');
      setLoading(false);
      return;
    }
    const meResponse = await fetch('/api/me');
    const me = await meResponse.json();
    const response = await fetch('/api/checkout/activation/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: me.user.id,
        recommendationSetId,
        items: Object.entries(selectedProducts).map(([storefrontId, productId]) => ({ storefrontId, productId })),
        shipping: {
          name: 'Customer Name Required',
          address: 'Shipping Address Required',
          city: 'City',
          state: 'State',
          zip: 'Zip',
          country: 'US'
        }
      })
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    setMessage(response.ok ? `PayPal order created: ${data.paypalOrder?.id || data.orderId}` : data.error || 'Checkout failed.');
  }

  if (!stores.length) return <p className="muted">No recommendation stores available yet. Please ask the admin to generate official accounts and products.</p>;

  return (
    <>
      <div className="card" style={{ marginBottom: 20 }}>
        <span className="pill">Bronze Trial Activation</span>
        <h1>Recommended Stores for You</h1>
        <p className="muted">Choose one $59 product from each recommended storefront. Selected {selectedCount} / 10.</p>
        <div className="progress"><div style={{ width: `${Math.min(100, selectedCount * 10)}%` }} /></div>
      </div>
      <div className="grid grid-4">
        {stores.map(store => {
          const selected = selectedProducts[store.storefront.id];
          return (
            <div className="card store-card" key={store.slotId}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div className="avatar">{store.storefront.owner.nickname.slice(0, 1)}</div>
                <div><strong>{store.storefront.title}</strong><p className="muted" style={{ margin: 0 }}>{store.position <= 2 ? 'Invitation chain priority' : 'Dynamic recommendation'}</p></div>
              </div>
              <span className={selected ? 'pill' : 'pill muted'}>{selected ? 'Selected' : 'Pending'}</span>
              <p className="muted">{store.storefront.bio || 'Curated daily essentials and home lifestyle products.'}</p>
              <div className="grid">
                {store.storefront.products.slice(0, 3).map(product => (
                  <button key={product.id} className={selected === product.id ? 'btn' : 'btn ghost'} type="button" onClick={() => selectProduct(store.storefront.id, product.id)}>
                    {product.title} · ${(product.priceCents / 100).toFixed(0)}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="card" style={{ marginTop: 22 }}>
        <h3>Checkout summary</h3>
        <p className="muted">Required total: 10 products × $59 = $590. PayPal supports PayPal account or card payment.</p>
        <button className="btn" type="button" onClick={checkout} disabled={loading}>{loading ? 'Creating PayPal Order...' : 'Pay with PayPal / Card'}</button>
        {message ? <p className="muted">{message}</p> : null}
      </div>
    </>
  );
}
