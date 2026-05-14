'use client';

import { useState } from 'react';

export default function JobRunButton({ label, endpoint }: { label: string; endpoint: string }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setMessage('');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    setMessage(response.ok ? `执行完成：${JSON.stringify(data)}` : data.error || '执行失败');
  }

  return <><button className="btn ghost" type="button" onClick={run} disabled={loading}>{loading ? '执行中...' : label}</button>{message ? <p className="muted">{message}</p> : null}</>;
}
