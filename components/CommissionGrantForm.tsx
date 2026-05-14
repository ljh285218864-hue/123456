'use client';

import { useState } from 'react';

export default function CommissionGrantForm() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/commissions/grant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: String(form.get('userId') || ''),
        note: String(form.get('note') || '')
      })
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    setMessage(response.ok ? '已发放一笔 $20 佣金，用户端显示与普通佣金一致' : data.error || '发放失败');
  }

  return (
    <form className="form" onSubmit={submit}>
      <input name="userId" className="input" placeholder="用户ID" required />
      <textarea name="note" className="textarea" placeholder="后台备注，用户不可见" />
      <button className="btn" type="submit" disabled={loading}>{loading ? '发放中...' : '立即发放 $20'}</button>
      {message ? <p className="muted">{message}</p> : null}
    </form>
  );
}
