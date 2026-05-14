'use client';

import { useEffect, useState } from 'react';
import RefundProcessButton from './RefundProcessButton';

type RefundRow = {
  id: string;
  buyer: { email: string; nickname: string; memberStatus: string };
  status: string;
  total: string;
  affectedCommission: string;
  createdAt: string;
};

export default function AdminRefundsTable() {
  const [rows, setRows] = useState<RefundRow[]>([]);

  useEffect(() => {
    fetch('/api/admin/refunds').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setRows(data.refunds || []);
    });
  }, []);

  if (!rows.length) return <p className="muted">暂无退款数据。</p>;

  return (
    <table className="table">
      <thead><tr><th>订单号</th><th>买家</th><th>金额</th><th>影响佣金</th><th>状态</th><th>时间</th><th>操作</th></tr></thead>
      <tbody>{rows.map(row => <tr key={row.id}><td>{row.id}</td><td>{row.buyer.nickname}<br /><span className="muted">{row.buyer.email}</span></td><td>{row.total}</td><td>{row.affectedCommission}</td><td>{row.status}</td><td>{new Date(row.createdAt).toLocaleDateString()}</td><td><RefundProcessButton orderId={row.id} /></td></tr>)}</tbody>
    </table>
  );
}
