'use client';

import { useEffect, useState } from 'react';

type OfficialAccount = {
  id: string;
  email: string;
  nickname: string;
  invitationCode: string;
  memberStatus: string;
  memberLevel: string;
  storefrontTitle: string;
  productCount: number;
  exposureCount: number;
  orderCount: number;
  isRecommendable: boolean;
};

export default function AdminOfficialAccountsTable() {
  const [accounts, setAccounts] = useState<OfficialAccount[]>([]);

  useEffect(() => {
    fetch('/api/admin/official-accounts').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setAccounts(data.accounts || []);
    });
  }, []);

  if (!accounts.length) return <p className="muted">暂无官方账号。</p>;

  return (
    <table className="table">
      <thead><tr><th>昵称</th><th>邮箱</th><th>邀请码</th><th>橱窗</th><th>商品数</th><th>曝光</th><th>成交</th><th>状态</th></tr></thead>
      <tbody>{accounts.map(account => <tr key={account.id}><td>{account.nickname}</td><td>{account.email}</td><td>{account.invitationCode}</td><td>{account.storefrontTitle}</td><td>{account.productCount}</td><td>{account.exposureCount}</td><td>{account.orderCount}</td><td>{account.isRecommendable ? <span className="pill">推荐中</span> : <span className="pill muted">暂停</span>}</td></tr>)}</tbody>
    </table>
  );
}
