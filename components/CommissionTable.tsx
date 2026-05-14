'use client';

import { useEffect, useState } from 'react';

type Commission = {
  id: string;
  amount: string;
  label: string;
  status: string;
  settledAt?: string | null;
  createdAt: string;
};

export default function CommissionTable() {
  const [commissions, setCommissions] = useState<Commission[]>([]);

  useEffect(() => {
    fetch('/api/account/commissions').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setCommissions(data.commissions || []);
    });
  }, []);

  if (!commissions.length) return <p className="muted">No commission records yet.</p>;

  return (
    <table className="table">
      <thead><tr><th>ID</th><th>Amount</th><th>Status</th><th>Estimated Settlement</th></tr></thead>
      <tbody>{commissions.map(item => <tr key={item.id}><td>{item.id}</td><td>{item.label} +{item.amount}</td><td>{item.status}</td><td>{item.settledAt ? new Date(item.settledAt).toLocaleDateString() : '-'}</td></tr>)}</tbody>
    </table>
  );
}
