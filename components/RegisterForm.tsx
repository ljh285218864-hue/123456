'use client';

import { useState } from 'react';

export default function RegisterForm() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const form = new FormData(event.currentTarget);
    const payload = {
      nickname: String(form.get('nickname') || ''),
      email: String(form.get('email') || ''),
      password: String(form.get('password') || ''),
      invitationCode: String(form.get('invitationCode') || '')
    };
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.error || 'Registration failed.');
      return;
    }
    setMessage('Account created. Please sign in.');
  }

  return (
    <form className="form" onSubmit={submit}>
      <label>Nickname<input name="nickname" className="input" placeholder="Your storefront nickname" required /></label>
      <label>Email<input name="email" className="input" placeholder="name@gmail.com" required /></label>
      <label>Password<input name="password" className="input" type="password" placeholder="Save your password carefully" required minLength={8} /></label>
      <label>Invitation Code<input name="invitationCode" className="input" placeholder="Required invitation code" required /></label>
      <label className="muted"><input type="checkbox" required /> I understand password reset is handled manually through WhatsApp support.</label>
      <button className="btn" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
      {message ? <p className="muted">{message}</p> : null}
    </form>
  );
}
