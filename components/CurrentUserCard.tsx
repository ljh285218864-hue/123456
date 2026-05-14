'use client';

import { useEffect, useState } from 'react';

type User = {
  email: string;
  nickname: string;
  invitationCode: string;
  memberStatus: string;
  memberLevel: string;
  trialExpiresAt?: string | null;
};

export default function CurrentUserCard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/me').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setUser(data.user);
    });
  }, []);

  if (!user) return <p className="muted">Loading account...</p>;

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <h2>{user.nickname}</h2>
      <p className="muted">{user.email}</p>
      <div className="grid grid-3">
        <div><span className="muted">Level</span><strong style={{ display: 'block' }}>{user.memberLevel}</strong></div>
        <div><span className="muted">Status</span><strong style={{ display: 'block' }}>{user.memberStatus}</strong></div>
        <div><span className="muted">Invitation Code</span><strong style={{ display: 'block' }}>{user.invitationCode}</strong></div>
      </div>
    </div>
  );
}
