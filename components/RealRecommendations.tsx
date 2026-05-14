'use client';

import { useEffect, useMemo, useState } from 'react';
import PayPalActivationButton from './PayPalActivationButton';

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

type CurrentUser = { id: string } | null;

export default function RealRecommendations() {
  const [stores, setStores] = useState<Store[]>([]);
  const [recommendationSetId, setRecommendationSetId] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<CurrentUser>(null);
  const [shipping, setShipping] = useState({ name: '', address: '', city: '', state: '', zip: '', country: 'US' });

  useEffect(() => {
    fetch('/api/me').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setUser(data.user);
    });
    fetch('/api/recommendations/current/details').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setStores(data.stores || []);
      setRecommendationSetId(data.recommendationSet?.id || '');
    });
  }, []);

  const selectedCount = useMemo(() => Object.keys(selectedProducts).length, [selectedProducts]);
  const checkoutItems = useMemo(() => Object.entries(selectedProducts).map(([storefrontId, productId]) => ({ storefrontId, productId })), [selectedProducts]);
  const shippingReady = Boolean(shipping.name && shipping.address && shipping.city && shipping.state && shipping.zip && shipping.country);
  const checkoutReady = Boolean(user?.id && recommendationSetId && selectedCount === 10 && shippingReady);

  function selectProduct(storefrontId: string, productId: string) {
    setSelectedProducts(prev => ({ ...prev, [storefrontId]: productId }));
  }

  function updateShipping(field: keyof typeof shipping, value: string) {
    setShipping(prev => ({ ...prev, [field]: value }));
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
        <h3>Shipping address</h3>
        <div className="grid grid-3">
          <input className="input" placeholder="Full name" value={shipping.name} onChange={event => updateShipping('name', event.target.value)} />
          <input className="input" placeholder="Street address" value={shipping.address} onChange={event => updateShipping('address', event.target.value)} />
          <input className="input" placeholder="City" value={shipping.city} onChange={event => updateShipping('city', event.target.value)} />
          <input className="input" placeholder="State" value={shipping.state} onChange={event => updateShipping('state', event.target.value)} />
          <input className="input" placeholder="ZIP code" value={shipping.zip} onChange={event => updateShipping('zip', event.target.value)} />
          <input className="input" placeholder="Country" value={shipping.country} onChange={event => updateShipping('country', event.target.value)} />
        </div>
      </div>
      <div className="card" style={{ marginTop: 22 }}>
        <h3>Checkout summary</h3>
        <p className="muted">Required total: 10 products × $59 = $590. PayPal supports PayPal account or card payment.</p>
        {user?.id ? <PayPalActivationButton userId={user.id} recommendationSetId={recommendationSetId} items={checkoutItems} shipping={shipping} disabled={!checkoutReady} onMessage={setMessage} /> : <p className="muted">Please sign in to continue.</p>}
        {message ? <p className="muted">{message}</p> : null}
      </div>
    </>
  );
}
