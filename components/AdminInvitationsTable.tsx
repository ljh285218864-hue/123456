'use client';

import { useEffect, useState } from 'react';
import InvitationReviewButton from './InvitationReviewButton';

type InvitationRow = {
  id: string;
  inviter: { email: string; nickname: string } | null;
  invitee: { email: string; nickname: string; memberStatus: string; memberLevel: string } | null;
  status: string;
  reason?: string | null;
  createdAt: string;
};

export default function AdminInvitationsTable() {
  const [rows, setRows] = useState<InvitationRow[]>([]);

  useEffect(() => {
    fetch('/api/admin/invitations').then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setRows(data.invitations || []);
    });
  }, []);

  if (!rows.length) return <p className="muted">暂无邀请数据。</p>;

  return (
    <table className="table">
      <thead><tr><th>上级用户</th><th>新用户</th><th>新用户状态</th><th>审核状态</th><th>原因</th><th>时间</th><th>操作</th></tr></thead>
      <tbody>{rows.map(row => <tr key={row.id}><td>{row.inviter?.nickname || '-'}<br /><span className="muted">{row.inviter?.email || '-'}</span></td><td>{row.invitee?.nickname || '-'}<br /><span className="muted">{row.invitee?.email || '-'}</span></td><td>{row.invitee?.memberLevel || '-'} / {row.invitee?.memberStatus || '-'}</td><td>{row.status}</td><td>{row.reason || '-'}</td><td>{new Date(row.createdAt).toLocaleDateString()}</td><td><InvitationReviewButton invitationId={row.id} decision="VALID" /><InvitationReviewButton invitationId={row.id} decision="INVALID" /></td></tr>)}</tbody>
    </table>
  );
}
