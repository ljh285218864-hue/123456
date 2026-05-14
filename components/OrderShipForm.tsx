'use client';

import { useState } from 'react';

export default function OrderShipForm({ orderId }: { orderId: string }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/orders/ship', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        carrier: String(form.get('carrier') || ''),
        trackingNumber: String(form.get('trackingNumber') || ''),
        adminId: 'admin-demo'
      })
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    setMessage(response.ok ? '已标记发货，系统将设置7天自动确认' : data.error || '发货失败');
  }

  return (
    <form className="form" onSubmit={submit}>
      <input className="input" name="carrier" placeholder="物流公司" />
      <input className="input" name="trackingNumber" placeholder="物流单号" />
      <button className="btn ghost" type="submit" disabled={loading}>{loading ? '处理中...' : '标记发货'}</button>
      {message ? <p className="muted">{message}</p> : null}
    </form>
  );
}
