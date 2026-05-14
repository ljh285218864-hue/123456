'use client';

import { useState } from 'react';

export default function WithdrawalReviewButton({ withdrawalId, action }: { withdrawalId: string; action: 'APPROVE' | 'REJECT' | 'PAID' }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setMessage('');
    const response = await fetch('/api/admin/withdrawals/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ withdrawalId, action, adminId: 'admin-demo', adminNote: '后台审核操作' })
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    setMessage(response.ok ? '操作成功' : data.error || '操作失败');
  }

  const label = action === 'APPROVE' ? '通过' : action === 'REJECT' ? '拒绝' : '标记已打款';
  return <span style={{ display: 'inline-block', marginRight: 8 }}><button className="btn ghost" onClick={run} disabled={loading}>{loading ? '处理中' : label}</button>{message ? <p className="muted">{message}</p> : null}</span>;
}
