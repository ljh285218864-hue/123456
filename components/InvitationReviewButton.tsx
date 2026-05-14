'use client';

import { useState } from 'react';

export default function InvitationReviewButton({ invitationId, decision }: { invitationId: string; decision: 'VALID' | 'INVALID' }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setMessage('');
    const response = await fetch('/api/admin/invitations/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invitationId, decision, adminId: 'admin-demo', reason: decision === 'VALID' ? '人工审核有效' : '人工审核无效' })
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    setMessage(response.ok ? '审核完成' : data.error || '审核失败');
  }

  return <span style={{ display: 'inline-block', marginRight: 8 }}><button className="btn ghost" onClick={run} disabled={loading}>{loading ? '处理中' : decision === 'VALID' ? '设为有效' : '设为无效'}</button>{message ? <p className="muted">{message}</p> : null}</span>;
}
