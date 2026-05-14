'use client';

import { useEffect, useState } from 'react';

export default function StorefrontEditForm() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState({ nickname: '', avatarUrl: '', title: '', bio: '' });

  useEffect(() => {
    Promise.all([fetch('/api/me'), fetch('/api/account/storefront')]).then(async ([meResponse, storefrontResponse]) => {
      const me = meResponse.ok ? await meResponse.json() : null;
      const sf = storefrontResponse.ok ? await storefrontResponse.json() : null;
      setInitial({
        nickname: me?.user?.nickname || '',
        avatarUrl: '',
        title: sf?.storefront?.title || '',
        bio: sf?.storefront?.bio || ''
      });
    });
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/account/storefront', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: String(form.get('nickname') || ''),
        avatarUrl: String(form.get('avatarUrl') || ''),
        title: String(form.get('title') || ''),
        bio: String(form.get('bio') || '')
      })
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    setMessage(response.ok ? 'Storefront updated.' : data.error || 'Update failed.');
  }

  return (
    <form className="form" onSubmit={submit}>
      <label>Nickname<input className="input" name="nickname" defaultValue={initial.nickname} placeholder="Your public nickname" /></label>
      <label>Avatar URL<input className="input" name="avatarUrl" defaultValue={initial.avatarUrl} placeholder="Image URL for now; file upload can be connected later" /></label>
      <label>Storefront title<input className="input" name="title" defaultValue={initial.title} placeholder="My Home Picks" /></label>
      <label>Storefront intro<textarea className="textarea" name="bio" defaultValue={initial.bio} placeholder="A short public description for your storefront" /></label>
      <button className="btn" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Storefront'}</button>
      {message ? <p className="muted">{message}</p> : null}
    </form>
  );
}
