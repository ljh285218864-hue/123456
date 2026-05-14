'use client';

import { useState } from 'react';

export default function WithdrawalForm({ userId }: { userId: string }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const form = new FormData(event.currentTarget);
    const method = String(form.get('method') || 'PAYPAL');
    const accountInfo = method === 'PAYPAL'
      ? { paypalEmail: String(form.get('paypalEmail') || ''), name: String(form.get('name') || '') }
      : { name: String(form.get('name') || ''), bankName: String(form.get('bankName') || ''), cardNumber: String(form.get('cardNumber') || ''), country: String(form.get('country') || '') };

    const response = await fetch('/api/withdrawals/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, method, accountInfo })
    });
    const data = await response.json();
    setLoading(false);
    setMessage(response.ok ? 'Withdrawal request submitted.' : data.error || 'Withdrawal request failed.');
  }

  return (
    <form className="form" onSubmit={submit}>
      <select className="select" name="method"><option value="PAYPAL">PayPal</option><option value="BANK_CARD">Bank Card</option></select>
      <input className="input" name="name" placeholder="Full name" required />
      <input className="input" name="paypalEmail" placeholder="PayPal email, if using PayPal" />
      <input className="input" name="bankName" placeholder="Bank name, if using bank card" />
      <input className="input" name="cardNumber" placeholder="Card number, if using bank card" />
      <input className="input" name="country" placeholder="Country / Region" />
      <button className="btn" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Request Withdrawal'}</button>
      {message ? <p className="muted">{message}</p> : null}
    </form>
  );
}
