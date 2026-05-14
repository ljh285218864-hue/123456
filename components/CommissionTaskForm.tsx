'use client';

import { useState } from 'react';

export default function CommissionTaskForm() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const form = new FormData(event.currentTarget);
    const totalRuns = Number(form.get('totalRuns') || 1);
    const response = await fetch('/api/admin/commission-tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: String(form.get('userId') || ''),
        totalRuns,
        windowHours: Number(form.get('windowHours') || 24),
        internalNote: String(form.get('internalNote') || ''),
        createdById: 'admin-demo'
      })
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    setMessage(response.ok ? `任务已创建：共 ${totalRuns} 笔，每笔 $20` : data.error || '创建失败');
  }

  return (
    <form className="form" onSubmit={submit}>
      <input name="userId" className="input" placeholder="用户ID" required />
      <input name="totalRuns" className="input" type="number" min={1} placeholder="发放次数" required />
      <input name="windowHours" className="input" type="number" min={1} placeholder="时间范围：小时，例如24/48/240" required />
      <textarea name="internalNote" className="textarea" placeholder="后台备注，用户不可见" />
      <button className="btn" type="submit" disabled={loading}>{loading ? '创建中...' : '创建随机发放任务'}</button>
      {message ? <p className="muted">{message}</p> : null}
    </form>
  );
}
