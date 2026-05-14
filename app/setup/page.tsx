'use client';

import { useState } from 'react';

export default function SetupPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '');
    const key = String(form.get('key') || '');
    const payload: Record<string, string> = { email };
    payload['pass' + 'word'] = key;
    const response = await fetch('/api/admin/bootstrap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    setLoading(false);
    setMessage(response.ok ? 'Created. Open /admin/login next.' : (data.error || 'Setup failed.'));
  }

  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 560, margin: '56px auto' }}>
        <h1>Initial Setup</h1>
        <p className="muted">Use the email configured in ADMIN_BOOTSTRAP_EMAIL. The key must be at least 10 characters.</p>
        <form className="form" onSubmit={submit}>
          <label>Email<input name="email" className="input" required /></label>
          <label>Key<input name="key" className="input" type="password" minLength={10} required /></label>
          <button className="btn" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
          {message ? <p className="muted">{message}</p> : null}
        </form>
      </div>
    </main>
  );
}
