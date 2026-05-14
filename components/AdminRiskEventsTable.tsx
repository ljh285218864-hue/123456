'use client';

import { useEffect, useState } from 'react';

type RiskRow = {
  id: string;
  user: { email: string; nickname: string };
  type: string;
  decision: string;
  reason: string;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
};

export default function AdminRiskEventsTable() {
  const [rows, setRows] = useState<RiskRow[]>([]);

  useEffect(() => {
    fetch('/api/admin/risk-events').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setRows(data.events || []);
    });
  }, []);

  if (!rows.length) return <p className="muted">暂无风控记录。</p>;

  return (
    <table className="table">
      <thead><tr><th>用户</th><th>类型</th><th>处理</th><th>原因</th><th>时间</th><th>详情</th></tr></thead>
      <tbody>{rows.map(row => <tr key={row.id}><td>{row.user.nickname}<br /><span className="muted">{row.user.email}</span></td><td>{row.type}</td><td>{row.decision}</td><td>{row.reason}</td><td>{new Date(row.createdAt).toLocaleDateString()}</td><td><code>{JSON.stringify(row.metadata || {})}</code></td></tr>)}</tbody>
    </table>
  );
}
