'use client';

import { useState } from 'react';

export default function LoginForm({ admin = false }: { admin?: boolean }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: String(form.get('email') || ''), password: String(form.get('password') || '') })
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.error || 'Login failed.');
      return;
    }
    window.location.href = admin ? '/admin' : '/account';
  }

  return (
    <form className="form" onSubmit={submit}>
      <label>{admin ? '管理员邮箱' : 'Email'}<input name="email" className="input" placeholder={admin ? 'admin@example.com' : 'name@gmail.com'} required /></label>
      <label>{admin ? '密码' : 'Password'}<input name="password" className="input" type="password" required /></label>
      <button className="btn" type="submit" disabled={loading}>{loading ? 'Loading...' : admin ? '登录后台' : 'Sign in'}</button>
      {message ? <p className="muted">{message}</p> : null}
    </form>
  );
}
