'use client';

import { useState } from 'react';

export default function AdminActionButton({ label, endpoint, payload }: { label: string; endpoint: string; payload: Record<string, unknown> }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setMessage('');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    setMessage(response.ok ? '操作成功' : data.error || '操作失败');
  }

  return <><button className="btn ghost" type="button" onClick={run} disabled={loading}>{loading ? '处理中...' : label}</button>{message ? <p className="muted">{message}</p> : null}</>;
}
