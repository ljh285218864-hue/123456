'use client';

import { useState } from 'react';

export default function RefundProcessButton({ orderId }: { orderId: string }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function run() {
    if (!confirm('确认处理退款？这会冻结会员、取消推荐资格和相关佣金。')) return;
    setLoading(true);
    setMessage('');
    const response = await fetch('/api/admin/refunds/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, adminId: 'admin-demo', reason: '后台退款处理' })
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    setMessage(response.ok ? '退款已处理' : data.error || '处理失败');
  }

  return <><button className="btn ghost" onClick={run} disabled={loading}>{loading ? '处理中...' : '处理退款'}</button>{message ? <p className="muted">{message}</p> : null}</>;
}
