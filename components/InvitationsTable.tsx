'use client';

import { useEffect, useState } from 'react';

type Invitation = {
  id: string;
  invitee: { nickname: string; email: string; memberStatus: string; memberLevel: string } | null;
  status: string;
  reason?: string | null;
  createdAt: string;
};

export default function InvitationsTable() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  useEffect(() => {
    fetch('/api/account/invitations').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setInvitations(data.invitations || []);
    });
  }, []);

  if (!invitations.length) return <p className="muted">No direct invitations yet.</p>;

  return (
    <table className="table">
      <thead><tr><th>Invitee</th><th>Email</th><th>Level</th><th>Status</th><th>Reason</th><th>Date</th></tr></thead>
      <tbody>{invitations.map(item => <tr key={item.id}><td>{item.invitee?.nickname || '-'}</td><td>{item.invitee?.email || '-'}</td><td>{item.invitee?.memberLevel || '-'}</td><td>{item.status}</td><td>{item.reason || '-'}</td><td>{new Date(item.createdAt).toLocaleDateString()}</td></tr>)}</tbody>
    </table>
  );
}
