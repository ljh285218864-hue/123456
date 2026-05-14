'use client';

import { useState } from 'react';

export default function OfficialAccountGenerateForm() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const form = new FormData(event.currentTarget);
    const count = Number(form.get('count') || 10);
    const response = await fetch('/api/admin/official-accounts/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count })
    });
    const data = await response.json();
    setLoading(false);
    setMessage(response.ok ? `已生成 ${data.createdCount} 个官方账号` : data.error || '生成失败');
  }

  return (
    <form className="form" onSubmit={submit}>
      <input name="count" className="input" placeholder="生成数量，例如 10 / 50 / 100" type="number" min={1} max={500} required />
      <button className="btn" type="submit" disabled={loading}>{loading ? '生成中...' : '生成官方账号'}</button>
      {message ? <p className="muted">{message}</p> : null}
    </form>
  );
}
