'use client';

import { useEffect, useState } from 'react';

type CommissionRow = {
  id: string;
  user: { email: string; nickname: string; isOfficial: boolean };
  amount: string;
  status: string;
  source: string;
  visibleLabel: string;
  settledAt?: string | null;
  createdAt: string;
};

export default function AdminCommissionsTable() {
  const [rows, setRows] = useState<CommissionRow[]>([]);

  useEffect(() => {
    fetch('/api/admin/commissions').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setRows(data.commissions || []);
    });
  }, []);

  if (!rows.length) return <p className="muted">暂无佣金数据。</p>;

  return (
    <table className="table">
      <thead><tr><th>用户</th><th>金额</th><th>状态</th><th>后台来源</th><th>前台显示</th><th>预计结算</th><th>创建时间</th></tr></thead>
      <tbody>{rows.map(row => <tr key={row.id}><td>{row.user.nickname}<br /><span className="muted">{row.user.email}</span></td><td>{row.amount}</td><td>{row.status}</td><td>{row.source}</td><td>{row.visibleLabel} +{row.amount}</td><td>{row.settledAt ? new Date(row.settledAt).toLocaleDateString() : '-'}</td><td>{new Date(row.createdAt).toLocaleDateString()}</td></tr>)}</tbody>
    </table>
  );
}
