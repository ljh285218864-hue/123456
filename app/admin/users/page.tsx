import AdminUsersTable from '@/components/AdminUsersTable';

export default function UsersPage() {
  return (
    <>
      <h1>用户管理</h1>
      <p className="muted">查看用户、邀请人、会员等级、试用状态、风控状态和钱包余额。</p>
      <div className="grid grid-3" style={{ marginBottom: 20 }}>
        <div className="card stat"><span className="muted">用户总数</span><strong>实时</strong></div>
        <div className="card stat"><span className="muted">试用会员</span><strong>实时</strong></div>
        <div className="card stat"><span className="muted">正式会员</span><strong>实时</strong></div>
      </div>
      <AdminUsersTable />
    </>
  );
}
