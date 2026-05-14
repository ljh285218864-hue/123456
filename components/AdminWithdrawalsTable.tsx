'use client';

import { useEffect, useState } from 'react';
import WithdrawalReviewButton from './WithdrawalReviewButton';

type WithdrawalRow = {
  id: string;
  user: { email: string; nickname: string };
  amount: string;
  method: string;
  accountInfo: Record<string, unknown>;
  status: string;
  createdAt: string;
};

export default function AdminWithdrawalsTable() {
  const [rows, setRows] = useState<WithdrawalRow[]>([]);

  useEffect(() => {
    fetch('/api/admin/withdrawals').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setRows(data.withdrawals || []);
    });
  }, []);

  if (!rows.length) return <p className="muted">暂无提现申请。</p>;

  return (
    <table className="table">
      <thead><tr><th>用户</th><th>金额</th><th>方式</th><th>账户资料</th><th>状态</th><th>时间</th><th>操作</th></tr></thead>
      <tbody>{rows.map(row => <tr key={row.id}><td>{row.user.nickname}<br /><span className="muted">{row.user.email}</span></td><td>{row.amount}</td><td>{row.method}</td><td><code>{JSON.stringify(row.accountInfo)}</code></td><td>{row.status}</td><td>{new Date(row.createdAt).toLocaleDateString()}</td><td><WithdrawalReviewButton withdrawalId={row.id} action="APPROVE" /><WithdrawalReviewButton withdrawalId={row.id} action="REJECT" /><WithdrawalReviewButton withdrawalId={row.id} action="PAID" /></td></tr>)}</tbody>
    </table>
  );
}
