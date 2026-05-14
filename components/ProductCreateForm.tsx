'use client';

import { useState } from 'react';

export default function ProductCreateForm() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const form = new FormData(event.currentTarget);
    const payload = {
      title: String(form.get('title') || ''),
      description: String(form.get('description') || ''),
      sku: String(form.get('sku') || ''),
      inventory: Number(form.get('inventory') || 0)
    };
    const response = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    setLoading(false);
    setMessage(response.ok ? '商品已保存' : data.error || '保存失败');
  }

  return (
    <form className="form" onSubmit={submit}>
      <input name="title" className="input" placeholder="英文商品标题" required />
      <textarea name="description" className="textarea" placeholder="英文商品描述" />
      <input name="sku" className="input" placeholder="SKU" />
      <input name="inventory" className="input" placeholder="库存数量" type="number" min={0} />
      <button className="btn" type="submit" disabled={loading}>{loading ? '保存中...' : '保存商品'}</button>
      {message ? <p className="muted">{message}</p> : null}
    </form>
  );
}
