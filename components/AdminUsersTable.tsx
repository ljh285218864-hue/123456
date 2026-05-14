'use client';

import { useEffect, useState } from 'react';

type UserRow = {
  id: string;
  email: string;
  nickname: string;
  role: string;
  isOfficial: boolean;
  memberStatus: string;
  memberLevel: string;
  invitationCode: string;
  createdAt: string;
  _count: { directInvites: number; commissions: number; orders: number };
};

export default function AdminUsersTable() {
  const [users, setUsers] = useState<UserRow[]>([]);

  useEffect(() => {
    fetch('/api/admin/users').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setUsers(data.users || []);
    });
  }, []);

  if (!users.length) return <p className="muted">暂无用户数据。</p>;

  return (
    <table className="table">
      <thead><tr><th>用户ID</th><th>邮箱</th><th>昵称</th><th>等级</th><th>状态</th><th>官方</th><th>直属邀请</th><th>邀请码</th></tr></thead>
      <tbody>{users.map(user => <tr key={user.id}><td>{user.id}</td><td>{user.email}</td><td>{user.nickname}</td><td>{user.memberLevel}</td><td>{user.memberStatus}</td><td>{user.isOfficial ? '是' : '否'}</td><td>{user._count.directInvites}</td><td>{user.invitationCode}</td></tr>)}</tbody>
    </table>
  );
}
