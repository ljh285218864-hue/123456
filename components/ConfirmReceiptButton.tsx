'use client';

import { useState } from 'react';

export default function ConfirmReceiptButton({ orderId }: { orderId: string }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function confirm() {
    setLoading(true);
    setMessage('');
    const response = await fetch('/api/orders/confirm-receipt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId })
    });
    const data = await response.json();
    setLoading(false);
    setMessage(response.ok ? 'Receipt confirmed. Commission settlement countdown started.' : data.error || 'Unable to confirm receipt.');
  }

  return <><button className="btn ghost" onClick={confirm} disabled={loading}>{loading ? 'Confirming...' : 'Confirm Receipt'}</button>{message ? <p className="muted">{message}</p> : null}</>;
}
